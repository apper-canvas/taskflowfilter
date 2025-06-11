import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import CategoryPill from '@/components/molecules/CategoryPill';
import Button from '@/components/atoms/Button';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange, taskCounts }) => {
  const allCount = Object.values(taskCounts).reduce((sum, count) => sum + count, 0);

  return (
    <div className="flex flex-wrap gap-2">
      {/* All Categories */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={() => onCategoryChange('all')}
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
        </Button>
      </motion.div>

      {/* Category Filters */}
      {categories.map((category) => {
        const count = taskCounts[category.id] || 0;
        return (
          <CategoryPill
            key={category.id}
            category={category}
            isActive={activeCategory === category.id}
            onClick={() => onCategoryChange(category.id)}
            count={count}
            showCount={count > 0}
            includeIcon={false} // Use small colored dot for categories here
          />
        );
      })}
    </div>
  );
};

export default CategoryFilter;