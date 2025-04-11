import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  DollarSign, 
  Calendar, 
  User, 
  Building, 
  Phone, 
  Mail, 
  Tag, 
  Check, 
  X, 
  ChevronDown, 
  ChevronUp,
  AlertCircle
} from 'lucide-react';

const MainFeature = () => {
  // State for deal form
  const [dealForm, setDealForm] = useState({
    title: '',
    company: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    value: '',
    stage: 'Qualification',
    closeDate: '',
    notes: ''
  });
  
  // State for form validation
  const [errors, setErrors] = useState({});
  
  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  
  // State for deal stages dropdown
  const [stagesOpen, setStagesOpen] = useState(false);
  
  // Deal stages
  const dealStages = [
    'Qualification',
    'Meeting Scheduled',
    'Proposal Sent',
    'Negotiation',
    'Closed Won',
    'Closed Lost'
  ];
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDealForm({
      ...dealForm,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!dealForm.title.trim()) newErrors.title = "Deal title is required";
    if (!dealForm.company.trim()) newErrors.company = "Company name is required";
    if (!dealForm.contactName.trim()) newErrors.contactName = "Contact name is required";
    if (!dealForm.contactEmail.trim()) {
      newErrors.contactEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(dealForm.contactEmail)) {
      newErrors.contactEmail = "Email is invalid";
    }
    if (!dealForm.value.trim()) {
      newErrors.value = "Deal value is required";
    } else if (isNaN(dealForm.value) || parseFloat(dealForm.value) <= 0) {
      newErrors.value = "Deal value must be a positive number";
    }
    if (!dealForm.closeDate.trim()) newErrors.closeDate = "Expected close date is required";
    
    return newErrors;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    // Submit form
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // 90% chance of success for demo purposes
      if (Math.random() > 0.1) {
        setSubmitSuccess(true);
        setSubmitError(false);
        
        // Reset form after success
        setTimeout(() => {
          setDealForm({
            title: '',
            company: '',
            contactName: '',
            contactEmail: '',
            contactPhone: '',
            value: '',
            stage: 'Qualification',
            closeDate: '',
            notes: ''
          });
          setSubmitSuccess(false);
        }, 2000);
      } else {
        setSubmitError(true);
        setSubmitSuccess(false);
      }
      setIsSubmitting(false);
    }, 1500);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (stagesOpen && !event.target.closest('.stages-dropdown')) {
        setStagesOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [stagesOpen]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card overflow-visible shadow-modern dark:shadow-modern-dark"
    >
      <div className="p-5 border-b border-surface-200/70 dark:border-surface-700/70">
        <h2 className="text-lg font-semibold flex items-center">
          <div className="mr-3 p-2 bg-primary/10 dark:bg-primary/20 rounded-lg text-primary dark:text-primary-light">
            <Briefcase size={20} />
          </div>
          <span className="text-gradient">Create New Deal</span>
        </h2>
        <p className="text-sm text-surface-500 dark:text-surface-400 mt-1 ml-11">
          Add a new sales opportunity to your pipeline
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        <AnimatePresence>
          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-green-100/70 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-xl flex items-center backdrop-blur-sm border border-green-200/50 dark:border-green-800/30"
            >
              <div className="p-1 bg-green-500/20 dark:bg-green-500/30 rounded-lg mr-3">
                <Check size={18} />
              </div>
              <span>Deal successfully created!</span>
            </motion.div>
          )}
          
          {submitError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-red-100/70 dark:bg-red-900/30 text-red-800 dark:text-red-400 rounded-xl flex items-center backdrop-blur-sm border border-red-200/50 dark:border-red-800/30"
            >
              <div className="p-1 bg-red-500/20 dark:bg-red-500/30 rounded-lg mr-3">
                <AlertCircle size={18} />
              </div>
              <span>There was an error creating the deal. Please try again.</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Deal Information */}
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label htmlFor="title" className="label">Deal Title*</label>
              <div className="relative">
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={dealForm.title}
                  onChange={handleChange}
                  className={`input ${errors.title ? 'border-red-500 dark:border-red-500 focus:ring-red-400/40' : ''}`}
                  placeholder="e.g. Annual Software Subscription"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.title}</p>
                )}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label htmlFor="company" className="label">Company*</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Building size={16} className="text-surface-400" />
                </div>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={dealForm.company}
                  onChange={handleChange}
                  className={`input pl-10 ${errors.company ? 'border-red-500 dark:border-red-500 focus:ring-red-400/40' : ''}`}
                  placeholder="Company name"
                />
                {errors.company && (
                  <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.company}</p>
                )}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="value" className="label">Deal Value*</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <DollarSign size={16} className="text-surface-400" />
                </div>
                <input
                  type="text"
                  id="value"
                  name="value"
                  value={dealForm.value}
                  onChange={handleChange}
                  className={`input pl-10 ${errors.value ? 'border-red-500 dark:border-red-500 focus:ring-red-400/40' : ''}`}
                  placeholder="0.00"
                />
                {errors.value && (
                  <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.value}</p>
                )}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="stage" className="label">Deal Stage*</label>
              <div className="relative stages-dropdown">
                <button
                  type="button"
                  onClick={() => setStagesOpen(!stagesOpen)}
                  className="input w-full text-left flex items-center justify-between group"
                >
                  <span>{dealForm.stage}</span>
                  <span className="text-surface-400 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                    {stagesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </button>
                
                <AnimatePresence>
                  {stagesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-10 mt-1 w-full bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl shadow-xl overflow-hidden backdrop-blur-sm"
                    >
                      {dealStages.map((stage, index) => (
                        <motion.button
                          key={stage}
                          type="button"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => {
                            setDealForm({ ...dealForm, stage });
                            setStagesOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors ${
                            dealForm.stage === stage ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light' : ''
                          }`}
                        >
                          {stage}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label htmlFor="closeDate" className="label">Expected Close Date*</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Calendar size={16} className="text-surface-400" />
                </div>
                <input
                  type="date"
                  id="closeDate"
                  name="closeDate"
                  value={dealForm.closeDate}
                  onChange={handleChange}
                  className={`input pl-10 ${errors.closeDate ? 'border-red-500 dark:border-red-500 focus:ring-red-400/40' : ''}`}
                />
                {errors.closeDate && (
                  <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.closeDate}</p>
                )}
              </div>
            </motion.div>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label htmlFor="contactName" className="label">Contact Name*</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User size={16} className="text-surface-400" />
                </div>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  value={dealForm.contactName}
                  onChange={handleChange}
                  className={`input pl-10 ${errors.contactName ? 'border-red-500 dark:border-red-500 focus:ring-red-400/40' : ''}`}
                  placeholder="Contact person"
                />
                {errors.contactName && (
                  <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.contactName}</p>
                )}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label htmlFor="contactEmail" className="label">Contact Email*</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail size={16} className="text-surface-400" />
                </div>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={dealForm.contactEmail}
                  onChange={handleChange}
                  className={`input pl-10 ${errors.contactEmail ? 'border-red-500 dark:border-red-500 focus:ring-red-400/40' : ''}`}
                  placeholder="email@example.com"
                />
                {errors.contactEmail && (
                  <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.contactEmail}</p>
                )}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="contactPhone" className="label">Contact Phone</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Phone size={16} className="text-surface-400" />
                </div>
                <input
                  type="text"
                  id="contactPhone"
                  name="contactPhone"
                  value={dealForm.contactPhone}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="(123) 456-7890"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="notes" className="label">Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={dealForm.notes}
                onChange={handleChange}
                className="input min-h-[115px] resize-none"
                placeholder="Additional details about this deal..."
              />
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="mt-8 flex items-center justify-end space-x-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => {
              setDealForm({
                title: '',
                company: '',
                contactName: '',
                contactEmail: '',
                contactPhone: '',
                value: '',
                stage: 'Qualification',
                closeDate: '',
                notes: ''
              });
              setErrors({});
            }}
          >
            Cancel
          </button>
          
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <span className="flex items-center">
                <Check size={18} className="mr-1.5" />
                Create Deal
              </span>
            )}
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default MainFeature;