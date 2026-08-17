import React from 'react';
import { Award, AlertTriangle, TrendingUp } from 'lucide-react';
import type { PerformanceInsights } from '../data/analytics';

interface InsightCardProps {
  insights: PerformanceInsights;
}

export const InsightCard: React.FC<InsightCardProps> = ({ insights }) => {
  return (
    <div className="performance-insights-container">
      <h3 className="section-title font-display mb-3">PERFORMANCE INSIGHTS</h3>

      <div className="insights-grid">
        {/* Strongest Area */}
        <div className="insight-card-item strongest font-sans">
          <div className="insight-header">
            <div className="insight-icon-bg green-bg">
              <Award size={18} className="text-success" />
            </div>
            <div>
              <span className="insight-type-label font-mono">Strongest Area</span>
              <h4 className="insight-subject">{insights.strongestArea.subject}</h4>
            </div>
          </div>
          <div className="insight-metric font-mono text-success">
            {insights.strongestArea.score}% avg
          </div>
          <p className="insight-details">{insights.strongestArea.details}</p>
        </div>

        {/* Needs Attention */}
        <div className="insight-card-item attention font-sans">
          <div className="insight-header">
            <div className="insight-icon-bg red-bg">
              <AlertTriangle size={18} className="text-error" />
            </div>
            <div>
              <span className="insight-type-label font-mono">Needs Attention</span>
              <h4 className="insight-subject">{insights.needsAttention.subject}</h4>
            </div>
          </div>
          <div className="insight-metric font-mono text-error">
            {insights.needsAttention.score}% avg
          </div>
          <p className="insight-details">{insights.needsAttention.details}</p>
        </div>

        {/* Improving */}
        <div className="insight-card-item improving font-sans">
          <div className="insight-header">
            <div className="insight-icon-bg orange-bg">
              <TrendingUp size={18} className="text-orange" />
            </div>
            <div>
              <span className="insight-type-label font-mono">Improving</span>
              <h4 className="insight-subject">{insights.improving.subject}</h4>
            </div>
          </div>
          <div className="insight-metric font-mono text-orange">
            {insights.improving.score}% score
          </div>
          <p className="insight-details">{insights.improving.details}</p>
        </div>
      </div>
    </div>
  );
};
