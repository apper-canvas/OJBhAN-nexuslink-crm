import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sun, Moon, Menu, X, User, BarChart3, Users, Briefcase, Settings, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check user preference
    if (localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && 
         window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
  };

  const navItems = [
    { name: "Dashboard", icon: <BarChart3 size={20} />, path: "/" },
    { name: "Contacts", icon: <Users size={20} />, path: "/contacts" },
    { name: "Deals", icon: <Briefcase size={20} />, path: "/deals" },
    { name: "Profile", icon: <User size={20} />, path: "/profile" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-surface-50 dark:bg-surface-900">
      {/* Sidebar for desktop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="hidden md:flex flex-col w-64 bg-white/80 dark:bg-surface-800/80 backdrop-blur-md border-r border-surface-200/30 dark:border-surface-700/30 shadow-elegant dark:shadow-none"
          >
            <div className="p-5 border-b border-surface-200/40 dark:border-surface-700/40">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary via-primary-dark to-secondary flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <h1 className="text-xl font-bold text-gradient">
                  NexusLink
                </h1>
              </div>
            </div>
            
            <nav className="flex-1 p-4 pt-6 space-y-1.5 overflow-y-auto scrollbar-hide">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.3,
                    delay: index * 0.05,
                    ease: "easeOut"
                  }}
                  className="menu-item hover-glow"
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-surface-500 dark:text-surface-400 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-200">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.name}</span>
                </motion.a>
              ))}
            </nav>
            
            <div className="p-4 mx-3 mb-4 rounded-xl glass-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-surface-100 to-surface-300 dark:from-surface-700 dark:to-surface-600 flex items-center justify-center shadow-sm">
                    <User size={18} className="text-surface-600 dark:text-surface-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Alex Morgan</p>
                    <p className="text-xs text-surface-500 dark:text-surface-400">Sales Manager</p>
                  </div>
                </div>
                <button 
                  className="p-2 rounded-lg hover:bg-surface-200/60 dark:hover:bg-surface-700/60 text-surface-500 dark:text-surface-400 transition-all duration-200 hover:shadow-sm"
                  aria-label="Log out"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-white/90 dark:bg-surface-800/90 backdrop-blur-md z-50 md:hidden shadow-elegant"
            >
              <div className="p-5 border-b border-surface-200/40 dark:border-surface-700/40 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary via-primary-dark to-secondary flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-lg">N</span>
                  </div>
                  <h1 className="text-xl font-bold text-gradient">
                    NexusLink
                  </h1>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-surface-200/60 dark:hover:bg-surface-700/60 transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <X size={20} className="text-surface-500 dark:text-surface-400" />
                </button>
              </div>
              
              <nav className="p-4 pt-6 space-y-1.5">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: "easeOut"
                    }}
                    className="menu-item"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-surface-500 dark:text-surface-400 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-200">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.name}</span>
                  </motion.a>
                ))}
              </nav>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 m-4 rounded-xl glass-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-surface-100 to-surface-300 dark:from-surface-700 dark:to-surface-600 flex items-center justify-center shadow-sm">
                      <User size={18} className="text-surface-600 dark:text-surface-300" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Alex Morgan</p>
                      <p className="text-xs text-surface-500 dark:text-surface-400">Sales Manager</p>
                    </div>
                  </div>
                  <button 
                    className="p-2 rounded-lg hover:bg-surface-200/60 dark:hover:bg-surface-700/60 text-surface-500 dark:text-surface-400 transition-colors duration-200"
                    aria-label="Log out"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white/80 dark:bg-surface-800/80 backdrop-blur-md border-b border-surface-200/30 dark:border-surface-700/30 flex items-center justify-between px-4 shadow-sm dark:shadow-none">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-surface-100/80 dark:hover:bg-surface-700/60 hidden md:block transition-colors duration-200"
              aria-label="Toggle sidebar"
            >
              <Menu size={20} className="text-surface-500 dark:text-surface-400" />
            </button>
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg hover:bg-surface-100/80 dark:hover:bg-surface-700/60 md:hidden transition-colors duration-200"
              aria-label="Open menu"
            >
              <Menu size={20} className="text-surface-500 dark:text-surface-400" />
            </button>
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-lg font-semibold md:hidden text-gradient"
            >
              NexusLink
            </motion.h2>
          </div>
          
          <div className="flex items-center space-x-3">
            <motion.button 
              onClick={toggleDarkMode}
              className="p-2 rounded-lg glass-input text-surface-600 dark:text-surface-300 transition-all duration-300 hover:shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={darkMode ? 'dark' : 'light'}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-surface-50 dark:bg-surface-900 p-4 md:p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;