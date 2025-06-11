import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

const KeyboardShortcuts = ({ onClose }) => {
  const shortcuts = [
    {
      category: 'General',
      items: [
        { key: 'Ctrl + ?', description: 'Show keyboard shortcuts' },
        { key: 'Ctrl + A', description: 'Show all tasks' },
        { key: 'Enter', description: 'Add task (when typing)' },
        { key: 'Escape', description: 'Cancel current action' }
      ]
    },
    {
      category: 'Task Management',
      items: [
        { key: 'Click', description: 'Toggle task completion' },
        { key: 'Double-click', description: 'Edit task title' },
        { key: 'Enter', description: 'Save changes (when editing)' },
        { key: 'Escape', description: 'Cancel editing' }
      ]
    },
    {
      category: 'Smart Input',
      items: [
        { key: '"urgent"', description: 'Set high priority' },
        { key: '"today"', description: 'Set due date to today' },
        { key: '"tomorrow"', description: 'Set due date to tomorrow' },
        { key: '"work"', description: 'Set work category' }
      ]
    }
  ];

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <ApperIcon name="Keyboard" className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold font-heading text-gray-900">
                Keyboard Shortcuts
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ApperIcon name="X" size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {shortcuts.map((section, index) => (
              <motion.div
                key={section.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  {section.category}
                </h3>
                <div className="space-y-2">
                  {section.items.map((shortcut, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-gray-700">{shortcut.description}</span>
                      <kbd className="px-2 py-1 bg-white border border-gray-200 rounded text-sm font-mono text-gray-800 shadow-sm">
                        {shortcut.key}
                      </kbd>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-blue-50 border border-blue-200 rounded-lg p-4"
            >
              <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                <ApperIcon name="Lightbulb" className="w-4 h-4 mr-2" />
                Smart Input Tips
              </h4>
              <p className="text-sm text-blue-800">
                TaskFlow understands natural language! Try typing phrases like "urgent meeting tomorrow" 
                or "buy groceries today" and watch as the app automatically sets priority, category, and due dates.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default KeyboardShortcuts;