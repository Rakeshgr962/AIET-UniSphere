import { supabase } from '../lib/supabase';
import type { NotificationItem } from '../data/notifications';
export type { NotificationItem };

export const getNotifications = async (): Promise<NotificationItem[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await (supabase as any)
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error || !data) return [];

    return data.map((n: any) => {
      const formattedTime = new Date(n.created_at).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
      return {
        id: n.id,
        title: n.title,
        shortMessage: n.short_message,
        fullMessage: n.full_message || n.short_message,
        time: formattedTime,
        timestamp: formattedTime,
        isRead: Boolean(n.is_read),
        source: n.source || 'System',
        category: (n.category as any) || 'Academic',
        type: (n.type as any) || 'Notification',
        relatedLink: n.related_link || undefined
      };
    });
  } catch (err) {
    console.error('Failed to get notifications:', err);
    return [];
  }
};

export const getUnreadNotificationsCount = async (): Promise<number> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return 0;

    const { count, error } = await (supabase as any)
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('is_read', false);

    if (error) return 0;
    return count || 0;
  } catch (err) {
    return 0;
  }
};

export const markNotificationAsRead = async (id: string): Promise<NotificationItem[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    await (supabase as any)
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id)
      .eq('user_id', user.id);

    return getNotifications();
  } catch (err) {
    return getNotifications();
  }
};

export const markAllNotificationsAsRead = async (): Promise<NotificationItem[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    await (supabase as any)
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', user.id)
      .eq('is_read', false);

    return getNotifications();
  } catch (err) {
    return getNotifications();
  }
};

export const deleteNotification = async (id: string): Promise<NotificationItem[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    await (supabase as any)
      .from('notifications')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    return getNotifications();
  } catch (err) {
    return getNotifications();
  }
};

export const addNotification = async (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'time' | 'isRead'> & { userId?: string }): Promise<NotificationItem> => {
  const { data: { user } } = await supabase.auth.getUser();
  const targetUserId = notif.userId || user?.id;

  if (!targetUserId) throw new Error("No target user for notification.");

  const { data, error } = await (supabase as any)
    .from('notifications')
    .insert({
      user_id: targetUserId,
      title: notif.title,
      short_message: notif.shortMessage,
      full_message: notif.fullMessage,
      source: notif.source || 'System',
      category: notif.category || 'Academic',
      type: notif.type || 'Notification',
      related_link: notif.relatedLink || null,
      is_read: false
    })
    .select()
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Failed to create notification.");
  }

  return {
    id: data.id,
    title: data.title,
    shortMessage: data.short_message,
    fullMessage: data.full_message || data.short_message,
    time: 'Just now',
    timestamp: 'Just now',
    isRead: false,
    source: data.source,
    category: data.category,
    type: data.type,
    relatedLink: data.related_link
  };
};
