import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertCircle } from 'lucide-react';

const NotFound = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4"
    >
      <motion.div 
        className="w-24 h-24 rounded-2xl bg-surface-100/70 dark:bg-surface-800/70 glass-card flex items-center justify-center mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
      >
        <AlertCircle size={48} className="text-surface-400" />
      </motion.div>
      
      <motion.h1 
        className="text-6xl font-bold mb-2 text-gradient"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        404
      </motion.h1>
      <motion.h2 
        className="text-2xl font-semibold mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Page Not Found
      </motion.h2>
      <motion.p 
        className="text-surface-600 dark:text-surface-400 max-w-md mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        The page you are looking for doesn't exist or has been moved. Please check the URL or navigate back to the dashboard.
      </motion.p>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Link 
          to="/" 
          className="btn btn-primary flex items-center space-x-2 hover-glow"
        >
          <ArrowLeft size={18} />
          <span>Back to Dashboard</span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;