import React from 'react';

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high': return 'bg-accent';
    case 'medium': return 'bg-warning';
    case 'low': return 'bg-success';
    default: return 'bg-gray-300';
  }
};

const PriorityBadge = ({ priority, className = '' }) => {
  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <div
        className={`w-2 h-2 rounded-full ${getPriorityColor(priority)}`}
        title={`${priority} priority`}
      ></div>
      <span className="text-xs text-gray-500 capitalize">{priority}</span>
    </div>
  );
};

export default PriorityBadge;