import React from 'react';
import type { SemesterTrendItem } from '../data/analytics';

interface PerformanceChartProps {
  trends: SemesterTrendItem[];
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ trends }) => {
  const maxVal = 10.0;

  return (
    <div className="performance-chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Academic GPA Progress Trend</h3>
          <p className="chart-subtitle">Semester GPA vs Target Performance Benchmark (Out of 10.0)</p>
        </div>

        <div className="chart-legend font-mono">
          <span className="legend-item">
            <span className="legend-dot orange-dot" /> Actual GPA
          </span>
          <span className="legend-item">
            <span className="legend-dot blue-dot" /> Target (8.5)
          </span>
        </div>
      </div>

      <div className="chart-bars-container">
        {trends.map((item, idx) => {
          const heightPercent = (item.gpa / maxVal) * 100;
          const isCurrent = item.semester.includes('Current');

          return (
            <div key={idx} className="chart-bar-group">
              <span className="bar-value-label font-mono">{item.gpa.toFixed(2)}</span>
              
              <div className="bar-track">
                <div 
                  className={`bar-fill ${isCurrent ? 'bar-current' : ''}`} 
                  style={{ height: `${heightPercent}%` }}
                />
                <div 
                  className="target-line" 
                  style={{ bottom: `${(item.target / maxVal) * 100}%` }}
                  title={`Target: ${item.target}`}
                />
              </div>

              <span className={`bar-axis-label ${isCurrent ? 'font-bold' : ''}`}>
                {item.semester}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
