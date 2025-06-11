import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange, taskCounts }) => {
  const allCount = Object.values(taskCounts).reduce((sum, count) => sum + count, 0);

  return (
    <div className="flex flex-wrap gap-2">
      {/* All Categories */}
      <motion.button
        onClick={() => onCategoryChange('all')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center space-x-2 ${
          activeCategory === 'all'
            ? 'bg-primary text-white shadow-lg'
            : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200'
        }`}
      >
        <ApperIcon name="List" size={14} />
        <span>All</span>
        {allCount > 0 && (
          <span className={`text-xs px-2 py-1 rounded-full ${
            activeCategory === 'all' ? 'bg-white/20' : 'bg-gray-100'
          }`}>
            {allCount}
          </span>
        )}
      </motion.button>

      {/* Category Filters */}
      {categories.map((category) => {
        const count = taskCounts[category.id] || 0;
        return (
          <motion.button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center space-x-2 ${
              activeCategory === category.id
                ? 'text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200'
            }`}
            style={{
              backgroundColor: activeCategory === category.id ? category.color : undefined
            }}
          >
            <span 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: category.color }}
            ></span>
            <span className="capitalize">{category.name}</span>
            {count > 0 && (
              <span className={`text-xs px-2 py-1 rounded-full ${
                activeCategory === category.id ? 'bg-white/20' : 'bg-gray-100'
              }`}>
                {count}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;