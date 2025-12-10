import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { analyticsEvents } from '../utils/analytics';

interface FormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  website: string;
  message: string;
  interests: string[];
  services: string[];
  discussProjects: boolean;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    subject: '',
    website: '',
    message: '',
    interests: [],
    services: [],
    discussProjects: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Track form start when component mounts
  useEffect(() => {
    analyticsEvents.contactFormStart();
    
    // Debug: Log EmailJS configuration (only in development or if explicitly enabled)
    if (import.meta.env.DEV || window.location.search.includes('debug=true')) {
      const serviceId = (import.meta.env as any).VITE_EMAILJS_SERVICE_ID;
      const templateId = (import.meta.env as any).VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = (import.meta.env as any).VITE_EMAILJS_PUBLIC_KEY;
      
      console.log('EmailJS Configuration Check:', {
        serviceId: serviceId ? `${serviceId.substring(0, 10)}...` : 'MISSING',
        templateId: templateId ? `${templateId.substring(0, 10)}...` : 'MISSING',
        publicKey: publicKey ? `${publicKey.substring(0, 10)}...` : 'MISSING',
        allSet: !!(serviceId && templateId && publicKey)
      });
    }
  }, []);

  const interestOptions = [
    'Discovery call',
    'Proposal',
    'Demo'
  ];

  const serviceOptions = [
    'Product Strategy Consulting',
    'UX/UI Design',
    'Strategic Business Development',
    'Technology Strategy',
    'Data-Driven Product Development',
    'Process & Methodology'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleServiceChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // EmailJS configuration - Get from environment variables
    const serviceId = (import.meta.env as any).VITE_EMAILJS_SERVICE_ID;
    const templateId = (import.meta.env as any).VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = (import.meta.env as any).VITE_EMAILJS_PUBLIC_KEY;

    try {
      // Check if EmailJS is configured
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS is not configured. Please set up environment variables.');
      }

      // Prepare email template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || 'Not provided',
        subject: formData.subject || 'No subject',
        website: formData.website || 'Not provided',
        interests: formData.interests.length > 0 
          ? formData.interests.join(', ') 
          : 'None selected',
        services: formData.services.length > 0 
          ? formData.services.join(', ') 
          : 'None selected',
        discuss_projects: formData.discussProjects ? 'Yes' : 'No',
        message: formData.message,
        to_name: 'Carl Wahlen',
      };

      // Send email via EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );
      
      // Track successful form submission
      analyticsEvents.contactFormSubmit();
      
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Track form error
      const errorMessage = error instanceof Error ? error.message : 'submission_failed';
      analyticsEvents.contactFormError(errorMessage);
      
      // More detailed error handling
      let userFriendlyError = 'Failed to send message. Please try again or contact me directly via email.';
      
      if (errorMessage.includes('EmailJS is not configured')) {
        userFriendlyError = 'Form is not configured yet. Please contact the site administrator.';
      } else if (errorMessage.includes('400')) {
        userFriendlyError = 'Invalid form data. Please check all fields and try again.';
      } else if (errorMessage.includes('403') || errorMessage.includes('Forbidden')) {
        userFriendlyError = 'Email service authentication failed. Please contact the site administrator.';
      } else if (errorMessage.includes('Public Key') || errorMessage.includes('API key')) {
        userFriendlyError = 'Email service configuration error. Please contact the site administrator.';
      }
      
      // Log detailed error for debugging
      if (error instanceof Error) {
        console.error('EmailJS Error Details:', {
          message: error.message,
          serviceId: serviceId ? 'Set' : 'Missing',
          templateId: templateId ? 'Set' : 'Missing',
          publicKey: publicKey ? 'Set' : 'Missing',
        });
      }
      
      setError(userFriendlyError);
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="card p-8 text-center">
        <div className="text-4xl text-lux-green-500 mb-4">✓</div>
        <h3 className="text-xl text-gray-900 mb-2">
          Thank you for your message!
        </h3>
        <p className="text-gray-600">
          I'll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="form-label">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="form-input"
            placeholder="Your name"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="form-label">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="form-input"
            placeholder="your@email.com"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="company" className="form-label">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          className="form-input"
          placeholder="Company name"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="subject" className="form-label">
          Subject (optional)
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          className="form-input"
          placeholder="What is this regarding?"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="website" className="form-label">
          Website URL (optional)
        </label>
        <input
          type="url"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleInputChange}
          className="form-input"
          placeholder="https://yourwebsite.com"
        />
      </div>
      
      <div className="mb-6">
        <label className="form-label">
          What are you interested in?
        </label>
        <div className="space-y-2">
          {interestOptions.map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.interests.includes(option)}
                onChange={() => handleInterestChange(option)}
                className="w-4 h-4 text-gray-900 bg-white border-gray-300 rounded focus:ring-gray-900 focus:ring-2"
              />
              <span className="ml-3 text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="form-label">
          Which services are you interested in? (optional)
        </label>
        <div className="space-y-2">
          {serviceOptions.map((service) => (
            <label key={service} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.services.includes(service)}
                onChange={() => handleServiceChange(service)}
                className="w-4 h-4 text-gray-900 bg-white border-gray-300 rounded focus:ring-gray-900 focus:ring-2"
              />
              <span className="ml-3 text-sm text-gray-700">{service}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.discussProjects}
            onChange={(e) => setFormData(prev => ({ ...prev, discussProjects: e.target.checked }))}
            className="w-4 h-4 text-gray-900 bg-white border-gray-300 rounded focus:ring-gray-900 focus:ring-2"
          />
          <span className="ml-3 text-sm text-gray-700">
            Interested in discussing one of my existing projects? (optional)
          </span>
        </label>
      </div>
      
      <div className="mb-6">
        <label htmlFor="message" className="form-label">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          rows={4}
          className="form-input resize-none"
          placeholder="Tell me about your project or needs..."
        />
      </div>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send message'}
      </button>
    </form>
  );
};

export default ContactForm;
