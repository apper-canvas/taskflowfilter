import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import CategoryFilter from '../components/CategoryFilter';
import ProgressFooter from '../components/ProgressFooter';
import KeyboardShortcuts from '../components/KeyboardShortcuts';
import EmptyState from '../components/EmptyState';
import { taskService } from '../services';
import ApperIcon from '../components/ApperIcon';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShortcuts, setShowShortcuts] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        taskService.getCategories()
      ]);
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message || 'Failed to load tasks');
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [newTask, ...prev]);
      
      // Update category count
      setCategories(prev => prev.map(cat => 
        cat.id === newTask.category 
          ? { ...cat, count: cat.count + 1 }
          : cat
      ));
      
      toast.success('Task created successfully!');
    } catch (err) {
      toast.error('Failed to create task');
    }
  };

  const handleUpdateTask = async (id, updates) => {
    try {
      const updatedTask = await taskService.update(id, updates);
      setTasks(prev => prev.map(task => 
        task.id === id ? updatedTask : task
      ));
      
      if (updates.completed !== undefined) {
        if (updates.completed) {
          toast.success('Task completed! 🎉');
        } else {
          toast.info('Task marked as incomplete');
        }
      }
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const taskToDelete = tasks.find(task => task.id === id);
      await taskService.delete(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      
      // Update category count
      if (taskToDelete) {
        setCategories(prev => prev.map(cat => 
          cat.id === taskToDelete.category 
            ? { ...cat, count: Math.max(0, cat.count - 1) }
            : cat
        ));
      }
      
      toast.success('Task deleted successfully');
    } catch (err) {
      toast.error('Failed to delete task');
    }
  };

  const filteredTasks = activeCategory === 'all' 
    ? tasks 
    : tasks.filter(task => task.category === activeCategory);

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '?':
            e.preventDefault();
            setShowShortcuts(true);
            break;
          case 'a':
            e.preventDefault();
            setActiveCategory('all');
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-16 bg-white rounded-lg shadow-sm"></div>
            <div className="h-12 bg-white rounded-lg shadow-sm"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-white rounded-lg shadow-sm"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadTasks}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold font-heading text-gray-900">
              TaskFlow
            </h1>
            <button
              onClick={() => setShowShortcuts(true)}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              title="Keyboard shortcuts (Ctrl+?)"
            >
              <ApperIcon name="Keyboard" size={20} />
            </button>
          </div>
          
          <TaskInput 
            onCreateTask={handleCreateTask}
            categories={categories}
          />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            taskCounts={tasks.reduce((acc, task) => {
              acc[task.category] = (acc[task.category] || 0) + 1;
              return acc;
            }, {})}
          />
        </motion.div>

        {/* Task List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          {filteredTasks.length === 0 ? (
            <EmptyState
              activeCategory={activeCategory}
              onShowAll={() => setActiveCategory('all')}
              hasAnyTasks={tasks.length > 0}
            />
          ) : (
            <TaskList
              tasks={filteredTasks}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
          )}
        </motion.div>

        {/* Progress Footer */}
        {totalCount > 0 && (
          <ProgressFooter
            completed={completedCount}
            total={totalCount}
          />
        )}

        {/* Keyboard Shortcuts Modal */}
        <AnimatePresence>
          {showShortcuts && (
            <KeyboardShortcuts onClose={() => setShowShortcuts(false)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;