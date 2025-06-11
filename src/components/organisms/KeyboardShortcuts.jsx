import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Modal from '@/components/molecules/Modal';

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
    <Modal onClose={onClose} title="Keyboard Shortcuts" iconName="Keyboard">
      <div className="space-y-6">
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
    </Modal>
  );
};

export default KeyboardShortcuts;