import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const EmptyState = ({ activeCategory, onShowAll, hasAnyTasks }) => {
  const getEmptyStateContent = () => {
    if (!hasAnyTasks) {
      return {
        icon: 'CheckSquare',
        title: 'Welcome to TaskFlow!',
        description: 'Start organizing your life by adding your first task. Type in the input above and press Enter to get started.',
        actionLabel: null,
        onAction: null
      };
    }

    if (activeCategory === 'all') {
      return {
        icon: 'CheckCircle',
        title: 'All tasks completed!',
        description: 'Congratulations! You\'ve finished all your tasks. Time to add some new ones or take a well-deserved break.',
        actionLabel: null,
        onAction: null
      };
    }

    return {
      icon: 'Filter',
      title: `No ${activeCategory} tasks`,
      description: `You don't have any tasks in the ${activeCategory} category yet. Try adding a new task or view all tasks.`,
      actionLabel: 'View All Tasks',
      onAction: onShowAll
    };
  };

  const { icon, title, description, actionLabel, onAction } = getEmptyStateContent();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12 px-4"
    >
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          y: { repeat: Infinity, duration: 3 },
          rotate: { repeat: Infinity, duration: 4 }
        }}
        className="mb-6"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
          <ApperIcon name={icon} className="w-10 h-10 text-primary" />
        </div>
      </motion.div>
      
      <h3 className="text-xl font-semibold font-heading text-gray-900 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
        {description}
      </p>
      
      {actionLabel && onAction && (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={onAction}
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm"
          >
            <ApperIcon name="Eye" className="w-4 h-4 mr-2" />
            {actionLabel}
          </Button>
        </motion.div>
      )}

      {/* Helpful tips for new users */}
      {!hasAnyTasks && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100"
        >
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            💡 Pro Tips:
          </h4>
          <ul className="text-sm text-blue-800 space-y-1 text-left">
            <li>• Try typing "urgent meeting tomorrow" to auto-set priority and date</li>
            <li>• Use keywords like "work", "personal", "shopping" for auto-categorization</li>
            <li>• Press Ctrl+? to see all keyboard shortcuts</li>
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EmptyState;