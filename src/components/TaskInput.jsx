import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';
import { format, addDays, isToday, isTomorrow } from 'date-fns';

const TaskInput = ({ onCreateTask, categories }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('personal');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // Auto-focus on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const taskData = {
      title: title.trim(),
      category,
      priority,
      dueDate: dueDate || null,
      completed: false
    };

    onCreateTask(taskData);
    
    // Reset form
    setTitle('');
    setDueDate('');
    setPriority('medium');
    setShowAdvanced(false);
    
    // Refocus input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const parseNaturalLanguage = (text) => {
    const lowercaseText = text.toLowerCase();
    
    // Check for priority keywords
    if (lowercaseText.includes('urgent') || lowercaseText.includes('important') || lowercaseText.includes('!')) {
      setPriority('high');
    } else if (lowercaseText.includes('low priority') || lowercaseText.includes('later')) {
      setPriority('low');
    }
    
    // Check for date keywords
    if (lowercaseText.includes('today')) {
      setDueDate(format(new Date(), 'yyyy-MM-dd'));
    } else if (lowercaseText.includes('tomorrow')) {
      setDueDate(format(addDays(new Date(), 1), 'yyyy-MM-dd'));
    } else if (lowercaseText.includes('next week')) {
      setDueDate(format(addDays(new Date(), 7), 'yyyy-MM-dd'));
    }
    
    // Check for category keywords
    if (lowercaseText.includes('work') || lowercaseText.includes('meeting') || lowercaseText.includes('project')) {
      setCategory('work');
    } else if (lowercaseText.includes('personal') || lowercaseText.includes('home')) {
      setCategory('personal');
    } else if (lowercaseText.includes('shop') || lowercaseText.includes('buy')) {
      setCategory('shopping');
    } else if (lowercaseText.includes('health') || lowercaseText.includes('exercise')) {
      setCategory('health');
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    
    // Parse natural language after a short delay
    clearTimeout(window.parseTimeout);
    window.parseTimeout = setTimeout(() => {
      if (value.trim()) {
        parseNaturalLanguage(value);
      }
    }, 500);
  };

  const getQuickDateOptions = () => [
    { label: 'Today', value: format(new Date(), 'yyyy-MM-dd') },
    { label: 'Tomorrow', value: format(addDays(new Date(), 1), 'yyyy-MM-dd') },
    { label: 'Next Week', value: format(addDays(new Date(), 7), 'yyyy-MM-dd') }
  ];

  const formatDueDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'MMM d');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main Input */}
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={title}
            onChange={handleInputChange}
            placeholder="What needs to be done? (try: 'urgent meeting tomorrow' or 'buy groceries today')"
            className="w-full text-lg px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 placeholder-gray-400"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {(category !== 'personal' || priority !== 'medium' || dueDate) && (
              <div className="flex items-center space-x-1">
                {priority === 'high' && (
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                )}
                {dueDate && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {formatDueDate(dueDate)}
                  </span>
                )}
              </div>
            )}
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ApperIcon name="Settings" size={16} />
            </button>
          </div>
        </div>

        {/* Advanced Options */}
        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 border-t border-gray-100 pt-4"
            >
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                        category === cat.id
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span 
                        className="w-2 h-2 rounded-full inline-block mr-2"
                        style={{ backgroundColor: cat.color }}
                      ></span>
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <div className="flex gap-2">
                  {[
                    { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
                    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
                    { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setPriority(option.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                        priority === option.value
                          ? option.color
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date
                </label>
                <div className="flex gap-2 mb-2">
                  {getQuickDateOptions().map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => setDueDate(option.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                        dueDate === option.value
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                  {dueDate && (
                    <button
                      type="button"
                      onClick={() => setDueDate('')}
                      className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={!title.trim()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-primary text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all duration-200 flex items-center justify-center"
        >
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          Add Task
        </motion.button>
      </form>
    </motion.div>
  );
};

export default TaskInput;