import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

const ProgressFooter = ({ completed, total }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const remaining = total - completed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-30"
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12">
              {/* Progress ring */}
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                />
                <motion.path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#5B4FE5"
                  strokeWidth="2"
                  strokeDasharray="100"
                  initial={{ strokeDashoffset: 100 }}
                  animate={{ strokeDashoffset: 100 - percentage }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">
                  {percentage}%
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {completed} of {total} tasks completed
              </p>
              <p className="text-xs text-gray-500">
                {remaining > 0 ? `${remaining} remaining` : 'All done! 🎉'}
              </p>
            </div>
          </div>

          {/* Achievement badges */}
          <div className="flex items-center space-x-2">
            {percentage === 100 && total > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="flex items-center space-x-1 bg-success text-white px-3 py-1 rounded-full text-xs font-medium"
              >
                <ApperIcon name="Trophy" size={12} />
                <span>Perfect!</span>
              </motion.div>
            )}
            {percentage >= 50 && percentage < 100 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="flex items-center space-x-1 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium"
              >
                <ApperIcon name="Zap" size={12} />
                <span>Great progress!</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressFooter;