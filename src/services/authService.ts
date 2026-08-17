import { supabase } from '../lib/supabase';
import type { Profile, UserRole } from '../types/database.types';
import type { Session, User as SupabaseUser, AuthChangeEvent } from '@supabase/supabase-js';

export interface SignUpData {
  fullName: string;
  usn: string;
  email: string;
  password: string;
}

export const authService = {
  /**
   * Sign in with email/USN/employee ID and password
   */
  async signIn(identifier: string, password: string): Promise<{ session: Session | null; profile: Profile | null }> {
    let email = identifier.trim();

    // If identifier is not an email format, lookup email by usn_or_employee_id via RPC
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      let resolvedEmail: string | null = null;

      // 1. Primary: SECURITY DEFINER RPC function (bypasses pre-auth anon RLS safely)
      const { data: rpcData, error: rpcError } = await (supabase.rpc as any)('get_email_by_identifier', {
        identifier_input: email,
      });

      if (!rpcError && rpcData && rpcData.length > 0 && rpcData[0].email) {
        resolvedEmail = rpcData[0].email;
      } else {
        // 2. Fallback: Direct profiles query (case-insensitive)
        const { data: matchedProfiles, error: lookupError } = await (supabase.from('profiles') as any)
          .select('email')
          .ilike('usn_or_employee_id', email)
          .limit(1);

        if (!lookupError && matchedProfiles && matchedProfiles.length > 0) {
          resolvedEmail = matchedProfiles[0].email;
        }
      }

      if (!resolvedEmail) {
        throw new Error('No user found matching the provided USN or Employee ID.');
      }
      email = resolvedEmail;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message || 'Invalid credentials.');
    }

    if (!data.user) {
      throw new Error('Authentication failed.');
    }

    // Fetch user profile STRICTLY using the authenticated Supabase user's UUID (data.user.id)
    const profile = await this.getCurrentProfile(data.user.id);

    if (profile) {
      if (profile.account_status === 'INACTIVE' || profile.account_status === 'LOCKED') {
        await this.signOut();
        throw new Error(`Your account status is ${profile.account_status.toLowerCase()}. Please contact the administrator.`);
      }
    }

    return { session: data.session, profile };
  },

  /**
   * Public Student Sign Up (Safely defaults to STUDENT role)
   */
  async signUp(data: SignUpData): Promise<{ user: SupabaseUser | null; session: Session | null }> {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          usn_or_employee_id: data.usn,
          role: 'STUDENT', // Public signup strictly restricted to STUDENT
        },
      },
    });

    if (error) {
      throw new Error(error.message || 'Sign up failed.');
    }

    return { user: authData.user, session: authData.session };
  },

  /**
   * Sign out current user
   */
  async signOut(): Promise<void> {
    await supabase.auth.signOut();
  },

  /**
   * Get active Supabase session
   */
  async getCurrentSession(): Promise<Session | null> {
    const { data, error } = await supabase.auth.getSession();
    if (error) return null;
    return data.session;
  },

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<SupabaseUser | null> {
    const { data, error } = await supabase.auth.getUser();
    if (error) return null;
    return data.user;
  },

  /**
   * Fetch current user's profile strictly by user UUID from public.profiles
   */
  async getCurrentProfile(userId?: string): Promise<Profile | null> {
    let targetUid = userId;
    if (!targetUid) {
      const user = await this.getCurrentUser();
      if (!user) return null;
      targetUid = user.id;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        department:departments (
          id,
          name,
          code
        )
      `)
      .eq('id', targetUid)
      .single();

    if (error || !data) {
      // Fallback query if FK relationship cache is refreshing
      const { data: rawProfile, error: rawError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', targetUid)
        .single();
      
      if (rawError || !rawProfile) return null;
      return rawProfile as Profile;
    }

    return data as unknown as Profile;
  },

  /**
   * Send password reset email
   */
  async resetPassword(email: string): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login/student`,
    });
    if (error) {
      throw new Error(error.message || 'Password reset request failed.');
    }
  },

  /**
   * Listen to auth state changes (SIGNED_IN, SIGNED_OUT, etc.)
   */
  onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });
    return data.subscription;
  },
};
