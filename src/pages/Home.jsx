import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, Calendar, ArrowUpRight, Search, Plus, Filter, ChevronDown, MoreHorizontal } from 'lucide-react';
import MainFeature from '../components/MainFeature';

const Home = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Sample data for stats
  const stats = [
    { 
      title: "Total Contacts", 
      value: "1,284", 
      change: "+12%", 
      icon: <Users size={20} />,
      color: "from-blue-500 to-indigo-600"
    },
    { 
      title: "Active Deals", 
      value: "64", 
      change: "+5%", 
      icon: <Briefcase size={20} />,
      color: "from-purple-500 to-pink-600"
    },
    { 
      title: "Tasks Due", 
      value: "28", 
      change: "-3%", 
      icon: <Calendar size={20} />,
      color: "from-amber-500 to-orange-600"
    }
  ];
  
  // Sample data for recent contacts
  const recentContacts = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "Acme Corp",
      email: "sarah@acmecorp.com",
      status: "Customer",
      lastContact: "2 days ago"
    },
    {
      id: 2,
      name: "Michael Chen",
      company: "TechGrowth Inc",
      email: "mchen@techgrowth.com",
      status: "Lead",
      lastContact: "5 days ago"
    },
    {
      id: 3,
      name: "Jessica Williams",
      company: "Bright Solutions",
      email: "jwilliams@brightsolutions.com",
      status: "Prospect",
      lastContact: "Today"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, Alex</h1>
          <p className="text-surface-600 dark:text-surface-400 mt-1">Here's what's happening with your customers today</p>
        </div>
        
        <div className="flex space-x-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="input pl-10 pr-4 py-2 w-full md:w-64"
            />
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
          </div>
          
          <button className="btn btn-primary flex items-center space-x-2">
            <Plus size={18} />
            <span>New Contact</span>
          </button>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="card p-5"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-surface-500 dark:text-surface-400 text-sm font-medium">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <div className="flex items-center mt-1 text-sm">
                  <span className={`font-medium ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                  <span className="text-surface-500 dark:text-surface-400 ml-1">vs last month</span>
                </div>
              </div>
              <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <span className="text-white">{stat.icon}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Tabs */}
      <div className="border-b border-surface-200 dark:border-surface-700">
        <div className="flex space-x-6">
          {['dashboard', 'contacts', 'deals', 'tasks'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab 
                  ? 'border-primary text-primary dark:border-primary-light dark:text-primary-light' 
                  : 'border-transparent text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Contacts */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex items-center justify-between">
              <h3 className="font-semibold">Recent Contacts</h3>
              <button className="text-primary dark:text-primary-light text-sm font-medium flex items-center">
                <span>View All</span>
                <ArrowUpRight size={14} className="ml-1" />
              </button>
            </div>
            
            <div className="divide-y divide-surface-200 dark:divide-surface-700">
              {recentContacts.map((contact) => (
                <div key={contact.id} className="p-4 hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">{contact.name}</h4>
                      <p className="text-sm text-surface-500 dark:text-surface-400">{contact.company}</p>
                    </div>
                    <div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        contact.status === 'Customer' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                          : contact.status === 'Lead'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}>
                        {contact.status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs text-surface-500 dark:text-surface-400">{contact.email}</p>
                    <p className="text-xs text-surface-500 dark:text-surface-400">Last contact: {contact.lastContact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Feature */}
        <div className="lg:col-span-2">
          <MainFeature />
        </div>
      </div>
    </div>
  );
};

export default Home;