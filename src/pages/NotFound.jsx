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
      <div className="w-20 h-20 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-6">
        <AlertCircle size={40} className="text-surface-400" />
      </div>
      
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-surface-600 dark:text-surface-400 max-w-md mb-8">
        The page you are looking for doesn't exist or has been moved. Please check the URL or navigate back to the dashboard.
      </p>
      
      <Link 
        to="/" 
        className="btn btn-primary flex items-center space-x-2"
      >
        <ArrowLeft size={18} />
        <span>Back to Dashboard</span>
      </Link>
    </motion.div>
  );
};

export default NotFound;