import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskItem from '@/components/organisms/TaskItem';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const [editingId, setEditingId] = useState(null);

  const sortedTasks = [...tasks].sort((a, b) => {
    // Completed tasks go to bottom
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Sort by priority (high -> medium -> low)
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (a.priority !== b.priority) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    
    // Sort by due date (closest first)
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;
    
    // Sort by creation date (newest first)
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {sortedTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ delay: index * 0.1 }}
            layout
          >
            <TaskItem
              task={task}
              onUpdate={onUpdateTask}
              onDelete={onDeleteTask}
              isEditing={editingId === task.id}
              onEdit={() => setEditingId(task.id)}
              onCancelEdit={() => setEditingId(null)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;