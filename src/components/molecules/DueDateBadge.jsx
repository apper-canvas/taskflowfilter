import React from 'react';
import { format, isToday, isTomorrow, isPast, isValid } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';

const DueDateBadge = ({ dueDate, completed, className = '' }) => {
  if (!dueDate) return null;

  const date = new Date(dueDate);
  if (!isValid(date)) return null;

  let displayDate = '';
  if (isToday(date)) displayDate = 'Today';
  else if (isTomorrow(date)) displayDate = 'Tomorrow';
  else displayDate = format(date, 'MMM d');

  const isOverdue = isValid(date) && isPast(date) && !isToday(date);

  return (
    <div className={`text-xs px-2 py-1 rounded-full flex items-center space-x-1 ${
      isOverdue && !completed
        ? 'bg-red-100 text-red-800'
        : 'bg-gray-100 text-gray-600'
    } ${className}`}>
      {isOverdue && !completed && (
        <ApperIcon name="AlertCircle" size={10} className="inline" />
      )}
      <span>{displayDate}</span>
    </div>
  );
};

export default DueDateBadge;