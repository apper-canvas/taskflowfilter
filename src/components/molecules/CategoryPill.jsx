import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const CategoryPill = ({ category, isActive, onClick, count, showCount, includeIcon }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        onClick={onClick}
        className={`px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center space-x-2 ${
          isActive
            ? 'text-white shadow-lg'
            : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200'
        }`}
        style={{
          backgroundColor: isActive ? category.color : undefined
        }}
      >
        {includeIcon ? (
          <ApperIcon name={category.icon || 'List'} size={14} /> // Fallback icon
        ) : (
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: category.color }}
          ></span>
        )}
        <span className="capitalize">{category.name}</span>
        {showCount && count > 0 && (
          <span className={`text-xs px-2 py-1 rounded-full ${
            isActive ? 'bg-white/20' : 'bg-gray-100'
          }`}>
            {count}
          </span>
        )}
      </Button>
    </motion.div>
  );
};

export default CategoryPill;