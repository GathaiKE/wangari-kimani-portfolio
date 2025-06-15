'use client';

import { sendEmail } from '@/app/actions/createData';
import { EmailData } from '@/app/interfaces';
import { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    isProcessing: false
  });
  
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  
  const statusTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear any existing status
    setStatus({ type: null, message: '' });
    
    // Clear any existing timeout
    if (statusTimeoutRef.current) {
      clearTimeout(statusTimeoutRef.current);
      statusTimeoutRef.current = null;
    }
    
    // Set processing state
    setForm(prev => ({ ...prev, isProcessing: true }));

    const data: EmailData = {
      name: form.name,
      message: form.message,
      subject: form.subject,
      email: form.email
    };
    
    try {
      const response = await sendEmail(data);
      
      let isSuccess = false;
      
      if (typeof response.status === 'number') {
        isSuccess = response.status === 200;
      } 
      else if (response.status && typeof response.status === 'number') {
        isSuccess = response.status === 200;
      }
      else {
        isSuccess = response.status === 200;
      }
      
      if (isSuccess) {
        setStatus({
          type: 'success',
          message: 'Message sent successfully!'
        });
      } else {
        throw new Error('Server returned non-success response');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      });
    } finally {
      setForm(prev => ({ ...prev, isProcessing: false }));
      
      statusTimeoutRef.current = setTimeout(() => {
        setStatus({ type: null, message: '' });
      }, 3000);
    }
  };

  useEffect(() => {
    return () => {
      if (statusTimeoutRef.current) {
        clearTimeout(statusTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 font-medium">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-inputfield border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 font-medium">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-inputfield border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="subject" className="block mb-2 font-medium">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-inputfield border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
            placeholder="What is this regarding?"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="message" className="block mb-2 font-medium">Message</label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-3 bg-inputfield border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
            placeholder="How can I help you?"
            required
          ></textarea>
        </div>
        
        <div className="flex flex-col items-center">
          <button
            type="submit"
            disabled={form.isProcessing}
            className="relative inline-block px-8 py-3 bg-gradient-to-r from-primary to-primary text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group disabled:opacity-80 disabled:cursor-not-allowed disabled:transform-none"
          >
            {form.isProcessing ? (
              <span className="relative z-10 flex items-center">
                <span className="processing-dots">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </span>
              </span>
            ) : (
              <span className="relative z-10">
                Send Message <FaPaperPlane className="inline ml-2" />
              </span>
            )}
          </button>
          
          {status.type && (
            <div className={`mt-4 py-2 px-4 rounded-lg flex items-center transition-all duration-300 ${
              status.type === 'success' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {status.type === 'success' ? (
                <FaCheck className="mr-2 flex-shrink-0" />
              ) : (
                <FaExclamationTriangle className="mr-2 flex-shrink-0" />
              )}
              <span>{status.message}</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}