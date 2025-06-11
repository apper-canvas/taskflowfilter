import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const TaskCheckbox = ({ checked, onClick, checkboxRef }) => {
  return (
    <motion.button
      ref={checkboxRef}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`relative w-5 h-5 rounded-full border-2 transition-all duration-300 flex-shrink-0 pt-1 ${
        checked
          ? 'bg-primary border-primary'
          : 'border-gray-300 hover:border-primary'
      }`}
    >
      {checked && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <ApperIcon
            name="Check"
            size={12}
            className="text-white"
          />
        </motion.div>
      )}
    </motion.button>
  );
};

export default TaskCheckbox;