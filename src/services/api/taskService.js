import tasksData from '../mockData/tasks.json';
import categoriesData from '../mockData/categories.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Local storage keys
const TASKS_KEY = 'taskflow_tasks';
const CATEGORIES_KEY = 'taskflow_categories';

// Initialize local storage with mock data if empty
const initializeStorage = () => {
  if (!localStorage.getItem(TASKS_KEY)) {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasksData));
  }
  if (!localStorage.getItem(CATEGORIES_KEY)) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categoriesData));
  }
};

// Initialize on first load
initializeStorage();

const taskService = {
  async getAll() {
    await delay(200);
    const tasks = JSON.parse(localStorage.getItem(TASKS_KEY) || '[]');
    return [...tasks];
  },

  async getById(id) {
    await delay(200);
    const tasks = JSON.parse(localStorage.getItem(TASKS_KEY) || '[]');
    const task = tasks.find(t => t.id === id);
    return task ? { ...task } : null;
  },

  async create(taskData) {
    await delay(300);
    const tasks = JSON.parse(localStorage.getItem(TASKS_KEY) || '[]');
    
    const newTask = {
      id: Date.now().toString(),
      title: taskData.title,
      category: taskData.category || 'personal',
      priority: taskData.priority || 'medium',
      dueDate: taskData.dueDate || null,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    const updatedTasks = [newTask, ...tasks];
    localStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
    
    return { ...newTask };
  },

  async update(id, updates) {
    await delay(200);
    const tasks = JSON.parse(localStorage.getItem(TASKS_KEY) || '[]');
    
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    
    const updatedTask = {
      ...tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    tasks[taskIndex] = updatedTask;
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    
    return { ...updatedTask };
  },

  async delete(id) {
    await delay(200);
    const tasks = JSON.parse(localStorage.getItem(TASKS_KEY) || '[]');
    
    const filteredTasks = tasks.filter(t => t.id !== id);
    localStorage.setItem(TASKS_KEY, JSON.stringify(filteredTasks));
    
    return true;
  },

  async getCategories() {
    await delay(200);
    const categories = JSON.parse(localStorage.getItem(CATEGORIES_KEY) || '[]');
    return [...categories];
  },

  async bulkDelete(ids) {
    await delay(300);
    const tasks = JSON.parse(localStorage.getItem(TASKS_KEY) || '[]');
    
    const filteredTasks = tasks.filter(t => !ids.includes(t.id));
    localStorage.setItem(TASKS_KEY, JSON.stringify(filteredTasks));
    
    return true;
  },

  async getTasksByCategory(category) {
    await delay(200);
    const tasks = JSON.parse(localStorage.getItem(TASKS_KEY) || '[]');
    const filtered = tasks.filter(t => t.category === category);
    return [...filtered];
  },

  async getTasksByPriority(priority) {
    await delay(200);
    const tasks = JSON.parse(localStorage.getItem(TASKS_KEY) || '[]');
    const filtered = tasks.filter(t => t.priority === priority);
    return [...filtered];
  },

  async getCompletedTasks() {
    await delay(200);
    const tasks = JSON.parse(localStorage.getItem(TASKS_KEY) || '[]');
    const completed = tasks.filter(t => t.completed);
    return [...completed];
  },

  async getPendingTasks() {
    await delay(200);
    const tasks = JSON.parse(localStorage.getItem(TASKS_KEY) || '[]');
    const pending = tasks.filter(t => !t.completed);
    return [...pending];
  },

  async getOverdueTasks() {
    await delay(200);
    const tasks = JSON.parse(localStorage.getItem(TASKS_KEY) || '[]');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const overdue = tasks.filter(t => {
      if (!t.dueDate || t.completed) return false;
      const dueDate = new Date(t.dueDate);
      return dueDate < today;
    });
    
    return [...overdue];
  }
};

export default taskService;