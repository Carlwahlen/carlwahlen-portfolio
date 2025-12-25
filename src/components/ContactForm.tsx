import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { analyticsEvents } from '../utils/analytics';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Track form start when component mounts
  useEffect(() => {
    analyticsEvents.contactFormStart();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
      // EmailJS configuration - Get from environment variables
    const env = (import.meta as any).env || {};
    const serviceId = env.VITE_EMAILJS_SERVICE_ID as string | undefined;
    const templateId = env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
    const publicKey = env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

    try {
      // Check if EmailJS is configured
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS is not configured. Please set up environment variables.');
      }

      // Prepare email template parameters
      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`.trim(),
        first_name: formData.firstName,
        last_name: formData.lastName,
        from_email: formData.email,
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
          <label htmlFor="firstName" className="form-label">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className="form-input"
            placeholder="First name"
          />
        </div>
        
        <div>
          <label htmlFor="lastName" className="form-label">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className="form-input"
            placeholder="Last name"
          />
        </div>
      </div>
      
      <div className="mb-6">
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
