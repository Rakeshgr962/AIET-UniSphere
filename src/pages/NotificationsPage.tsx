import React, { useState, useEffect } from 'react';
import { AppShell } from '../components/AppShell';
import { LoadingState } from '../components/LoadingState';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import type { NotificationItem } from '../data/notifications';
import type { FilterCategory } from '../components/NotificationFilter';
import { NotificationCard } from '../components/NotificationCard';
import { NotificationFilter } from '../components/NotificationFilter';
import { NotificationDetailModal } from '../components/NotificationDetailModal';
import { 
  getNotifications, 
  markNotificationAsRead, 
  markAllNotificationsAsRead 
} from '../services/notificationService';
import { CheckCheck } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('All');
  const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);

  const fetchNotifications = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      setError("Unable to load notifications. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkRead = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = await markNotificationAsRead(id);
    setNotifications(updated);
  };

  const handleMarkAllRead = async () => {
    const updated = await markAllNotificationsAsRead();
    setNotifications(updated);
  };

  const handleNotificationClick = async (notif: NotificationItem) => {
    if (!notif.isRead) {
      await markNotificationAsRead(notif.id);
      setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, isRead: true } : n));
    }
    setSelectedNotification(notif);
  };

  // Filtering notifications
  const filteredNotifications = notifications.filter(n => {
    if (selectedFilter === 'Unread') return !n.isRead;
    if (selectedFilter === 'Academic') return n.category === 'Academic';
    if (selectedFilter === 'Projects') return n.category === 'Projects';
    if (selectedFilter === 'System') return n.category === 'System';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (isLoading) {
    return (
      <AppShell>
        <LoadingState message="Loading your notifications..." />
      </AppShell>
    );
  }

  if (error) {
    return (
      <AppShell>
        <ErrorState message={error} onRetry={fetchNotifications} />
      </AppShell>
    );
  }

  return (
    <AppShell>
      {/* Header */}
      <div className="page-header-container">
        <div>
          <div className="breadcrumbs">
            <span>Communication</span>
            <span className="breadcrumbs-separator">/</span>
            <span style={{ fontWeight: 600, color: 'var(--brand-black)' }}>Notifications</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Notification Center</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--brand-dark-grey)', marginTop: '0.125rem' }}>
            Real-time updates across assignments, assessments, attendance, leaves, and project milestones
          </p>
        </div>

        {unreadCount > 0 && (
          <button 
            className="btn btn-secondary" 
            style={{ width: 'auto' }}
            onClick={handleMarkAllRead}
          >
            <CheckCheck size={16} />
            Mark all as read
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <NotificationFilter 
        selectedFilter={selectedFilter}
        onSelectFilter={setSelectedFilter}
        unreadCount={unreadCount}
        totalCount={notifications.length}
      />

      {/* Notification List or Empty State */}
      {filteredNotifications.length === 0 ? (
        <EmptyState 
          title="No notifications yet."
          message={
            selectedFilter === 'Unread' 
              ? "You've read all your notifications!" 
              : `No notifications found in the ${selectedFilter} category.`
          }
          actionLabel={selectedFilter !== 'All' ? 'View All Notifications' : undefined}
          onAction={() => setSelectedFilter('All')}
        />
      ) : (
        <div className="notifications-list-wrapper">
          {filteredNotifications.map((notif) => (
            <NotificationCard
              key={notif.id}
              notification={notif}
              onClick={handleNotificationClick}
              onMarkRead={handleMarkRead}
            />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <NotificationDetailModal
        notification={selectedNotification}
        onClose={() => setSelectedNotification(null)}
      />
    </AppShell>
  );
};

export default NotificationsPage;
