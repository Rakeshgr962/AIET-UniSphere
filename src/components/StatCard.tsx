import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="stat-card">
      <div className="stat-label-row">
        <span className="stat-card-title">{title}</span>
        <span className="stat-card-icon">{icon}</span>
      </div>
      <span className="stat-card-value">{value}</span>
    </div>
  );
};
