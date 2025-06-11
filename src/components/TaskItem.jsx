import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, isToday, isTomorrow, isPast, isValid } from 'date-fns';
import ApperIcon from './ApperIcon';
import ConfettiExplosion from './ConfettiExplosion';

const TaskItem = ({ task, onUpdate, onDelete, isEditing, onEdit, onCancelEdit }) => {
  const [title, setTitle] = useState(task.title);
  const [showConfetti, setShowConfetti] = useState(false);
  const inputRef = useRef(null);
  const checkboxRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleToggleComplete = () => {
    if (!task.completed) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    onUpdate(task.id, { completed: !task.completed });
  };

  const handleSaveEdit = () => {
    if (title.trim() && title !== task.title) {
      onUpdate(task.id, { title: title.trim() });
    }
    onCancelEdit();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      setTitle(task.title);
      onCancelEdit();
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-accent';
      case 'medium': return 'bg-warning';
      case 'low': return 'bg-success';
      default: return 'bg-gray-300';
    }
  };

  const formatDueDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    if (!isValid(date)) return null;
    
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'MMM d');
  };

  const isDueDateOverdue = (dateStr) => {
    if (!dateStr) return false;
    const date = new Date(dateStr);
    return isValid(date) && isPast(date) && !isToday(date);
  };

  const dueDateText = formatDueDate(task.dueDate);
  const isOverdue = isDueDateOverdue(task.dueDate);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 transition-all duration-200 ${
        task.completed ? 'opacity-75' : 'hover:shadow-md'
      }`}
    >
      <div className="flex items-start space-x-3">
        {/* Checkbox */}
        <div className="flex-shrink-0 pt-1">
          <motion.button
            ref={checkboxRef}
            onClick={handleToggleComplete}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`relative w-5 h-5 rounded-full border-2 transition-all duration-300 ${
              task.completed
                ? 'bg-primary border-primary'
                : 'border-gray-300 hover:border-primary'
            }`}
          >
            {task.completed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <ApperIcon 
                  name="Check" 
                  size={12} 
                  className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
                />
              </motion.div>
            )}
          </motion.button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={handleSaveEdit}
                  onKeyDown={handleKeyDown}
                  className="w-full text-base font-medium text-gray-900 bg-transparent border-none outline-none focus:ring-0 p-0"
                />
              ) : (
                <h3
                  onClick={onEdit}
                  className={`text-base font-medium cursor-pointer transition-all duration-200 break-words ${
                    task.completed
                      ? 'text-gray-500 line-through'
                      : 'text-gray-900 hover:text-primary'
                  }`}
                >
                  {task.title}
                </h3>
              )}
              
              {/* Meta information */}
              <div className="flex items-center space-x-3 mt-2">
                {/* Priority indicator */}
                <div className="flex items-center space-x-1">
                  <div 
                    className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}
                    title={`${task.priority} priority`}
                  ></div>
                  <span className="text-xs text-gray-500 capitalize">{task.priority}</span>
                </div>
                
                {/* Due date */}
                {dueDateText && (
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    isOverdue && !task.completed
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {isOverdue && !task.completed && (
                      <ApperIcon name="AlertCircle" size={10} className="inline mr-1" />
                    )}
                    {dueDateText}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-1 ml-3">
              {!isEditing && (
                <>
                  <button
                    onClick={onEdit}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Edit task"
                  >
                    <ApperIcon name="Edit2" size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(task.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete task"
                  >
                    <ApperIcon name="Trash2" size={14} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confetti explosion */}
      {showConfetti && (
        <ConfettiExplosion
          position={{
            x: checkboxRef.current?.getBoundingClientRect().left + 10,
            y: checkboxRef.current?.getBoundingClientRect().top + 10
          }}
        />
      )}
    </motion.div>
  );
};

export default TaskItem;