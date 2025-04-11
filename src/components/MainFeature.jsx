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
    <div className="card overflow-visible">
      <div className="p-4 border-b border-surface-200 dark:border-surface-700">
        <h2 className="text-lg font-semibold flex items-center">
          <Briefcase size={20} className="mr-2 text-primary dark:text-primary-light" />
          Create New Deal
        </h2>
        <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
          Add a new sales opportunity to your pipeline
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-5">
        <AnimatePresence>
          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-lg flex items-center"
            >
              <Check size={18} className="mr-2" />
              <span>Deal successfully created!</span>
            </motion.div>
          )}
          
          {submitError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 rounded-lg flex items-center"
            >
              <AlertCircle size={18} className="mr-2" />
              <span>There was an error creating the deal. Please try again.</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Deal Information */}
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="label">Deal Title*</label>
              <div className="relative">
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={dealForm.title}
                  onChange={handleChange}
                  className={`input ${errors.title ? 'border-red-500 dark:border-red-500' : ''}`}
                  placeholder="e.g. Annual Software Subscription"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="company" className="label">Company*</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building size={16} className="text-surface-400" />
                </div>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={dealForm.company}
                  onChange={handleChange}
                  className={`input pl-10 ${errors.company ? 'border-red-500 dark:border-red-500' : ''}`}
                  placeholder="Company name"
                />
                {errors.company && (
                  <p className="text-red-500 text-xs mt-1">{errors.company}</p>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="value" className="label">Deal Value*</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign size={16} className="text-surface-400" />
                </div>
                <input
                  type="text"
                  id="value"
                  name="value"
                  value={dealForm.value}
                  onChange={handleChange}
                  className={`input pl-10 ${errors.value ? 'border-red-500 dark:border-red-500' : ''}`}
                  placeholder="0.00"
                />
                {errors.value && (
                  <p className="text-red-500 text-xs mt-1">{errors.value}</p>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="stage" className="label">Deal Stage*</label>
              <div className="relative stages-dropdown">
                <button
                  type="button"
                  onClick={() => setStagesOpen(!stagesOpen)}
                  className="input w-full text-left flex items-center justify-between"
                >
                  <span>{dealForm.stage}</span>
                  {stagesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                
                <AnimatePresence>
                  {stagesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute z-10 mt-1 w-full bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg shadow-lg overflow-hidden"
                    >
                      {dealStages.map((stage) => (
                        <button
                          key={stage}
                          type="button"
                          onClick={() => {
                            setDealForm({ ...dealForm, stage });
                            setStagesOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors ${
                            dealForm.stage === stage ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light' : ''
                          }`}
                        >
                          {stage}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            <div>
              <label htmlFor="closeDate" className="label">Expected Close Date*</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={16} className="text-surface-400" />
                </div>
                <input
                  type="date"
                  id="closeDate"
                  name="closeDate"
                  value={dealForm.closeDate}
                  onChange={handleChange}
                  className={`input pl-10 ${errors.closeDate ? 'border-red-500 dark:border-red-500' : ''}`}
                />
                {errors.closeDate && (
                  <p className="text-red-500 text-xs mt-1">{errors.closeDate}</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-4">
            <div>
              <label htmlFor="contactName" className="label">Contact Name*</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={16} className="text-surface-400" />
                </div>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  value={dealForm.contactName}
                  onChange={handleChange}
                  className={`input pl-10 ${errors.contactName ? 'border-red-500 dark:border-red-500' : ''}`}
                  placeholder="Contact person"
                />
                {errors.contactName && (
                  <p className="text-red-500 text-xs mt-1">{errors.contactName}</p>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="contactEmail" className="label">Contact Email*</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={16} className="text-surface-400" />
                </div>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={dealForm.contactEmail}
                  onChange={handleChange}
                  className={`input pl-10 ${errors.contactEmail ? 'border-red-500 dark:border-red-500' : ''}`}
                  placeholder="email@example.com"
                />
                {errors.contactEmail && (
                  <p className="text-red-500 text-xs mt-1">{errors.contactEmail}</p>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="contactPhone" className="label">Contact Phone</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
            </div>
            
            <div>
              <label htmlFor="notes" className="label">Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={dealForm.notes}
                onChange={handleChange}
                className="input min-h-[104px]"
                placeholder="Additional details about this deal..."
              />
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-end space-x-3">
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
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary relative"
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
                <Check size={18} className="mr-1" />
                Create Deal
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MainFeature;