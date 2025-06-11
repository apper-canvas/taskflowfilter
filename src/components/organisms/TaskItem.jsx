import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import ConfettiExplosion from '@/components/organisms/ConfettiExplosion';
import TaskCheckbox from '@/components/molecules/TaskCheckbox';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import PriorityBadge from '@/components/molecules/PriorityBadge';
import DueDateBadge from '@/components/molecules/DueDateBadge';

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

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 transition-all duration-200 ${
        task.completed ? 'opacity-75' : 'hover:shadow-md'
      }`}
    >
      <div className="flex items-start space-x-3">
        {/* Checkbox */}
        <TaskCheckbox
          checked={task.completed}
          onClick={handleToggleComplete}
          checkboxRef={checkboxRef}
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <Input
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
                <PriorityBadge priority={task.priority} />
                <DueDateBadge dueDate={task.dueDate} completed={task.completed} />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-1 ml-3">
              {!isEditing && (
                <>
                  <Button
                    onClick={onEdit}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Edit task"
                  >
                    <ApperIcon name="Edit2" size={14} />
                  </Button>
                  <Button
                    onClick={() => onDelete(task.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete task"
                  >
                    <ApperIcon name="Trash2" size={14} />
                  </Button>
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