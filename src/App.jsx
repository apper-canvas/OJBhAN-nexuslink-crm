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
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for desktop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="hidden md:flex flex-col w-64 bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700"
          >
            <div className="p-4 border-b border-surface-200 dark:border-surface-700">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  NexusLink
                </h1>
              </div>
            </div>
            
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-hide">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 group transition-all duration-200"
                >
                  <span className="text-surface-500 dark:text-surface-400 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-200">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.name}</span>
                </a>
              ))}
            </nav>
            
            <div className="p-4 border-t border-surface-200 dark:border-surface-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-9 w-9 rounded-full bg-surface-200 dark:bg-surface-700 flex items-center justify-center">
                    <User size={18} className="text-surface-500 dark:text-surface-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Alex Morgan</p>
                    <p className="text-xs text-surface-500 dark:text-surface-400">Sales Manager</p>
                  </div>
                </div>
                <button className="p-1.5 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-500 dark:text-surface-400">
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
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-white dark:bg-surface-800 z-50 md:hidden"
            >
              <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <span className="text-white font-bold text-lg">N</span>
                  </div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    NexusLink
                  </h1>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-700"
                >
                  <X size={20} className="text-surface-500 dark:text-surface-400" />
                </button>
              </div>
              
              <nav className="p-4 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.path}
                    className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 group transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-surface-500 dark:text-surface-400 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-200">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.name}</span>
                  </a>
                ))}
              </nav>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-surface-200 dark:border-surface-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-9 w-9 rounded-full bg-surface-200 dark:bg-surface-700 flex items-center justify-center">
                      <User size={18} className="text-surface-500 dark:text-surface-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Alex Morgan</p>
                      <p className="text-xs text-surface-500 dark:text-surface-400">Sales Manager</p>
                    </div>
                  </div>
                  <button className="p-1.5 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-500 dark:text-surface-400">
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
        <header className="h-16 bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 flex items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-700 hidden md:block"
            >
              <Menu size={20} className="text-surface-500 dark:text-surface-400" />
            </button>
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-700 md:hidden"
            >
              <Menu size={20} className="text-surface-500 dark:text-surface-400" />
            </button>
            <h2 className="text-lg font-semibold md:hidden">NexusLink</h2>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleDarkMode}
              className="p-1.5 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-500 dark:text-surface-400"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
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