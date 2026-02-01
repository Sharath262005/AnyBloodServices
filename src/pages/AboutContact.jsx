import React, { useState } from 'react';
import api from '../services/api';

// About Component (includes Services section)
export const About = () => {
  return (
    <div className="min-h-screen">
      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-blood-primary to-blood-dark text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">About LifeFlow</h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-gray-200">
            Connecting donors with those in need since 2020
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg mx-auto">
            <h2 className="text-3xl font-bold text-blood-primary mb-6">Our Mission</h2>
            <p className="text-neutral-text leading-relaxed mb-6">
              LifeFlow is dedicated to bridging the gap between blood donors and recipients. We believe 
              that every person deserves access to safe blood when they need it most. Our platform makes 
              it easy for donors to register and for those in need to find available blood quickly.
            </p>

            <h2 className="text-3xl font-bold text-blood-primary mb-6 mt-12">Our Vision</h2>
            <p className="text-neutral-text leading-relaxed mb-6">
              We envision a world where no life is lost due to blood shortage. Through technology and 
              community engagement, we're building a network of voluntary donors who are ready to help 
              whenever called upon.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="card text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-blood-primary mb-2">Accessibility</h3>
                <p className="text-sm text-neutral-text">Making blood donation accessible to everyone</p>
              </div>
              <div className="card text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold text-blood-primary mb-2">Community</h3>
                <p className="text-sm text-neutral-text">Building a community of caring donors</p>
              </div>
              <div className="card text-center">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-xl font-bold text-blood-primary mb-2">Innovation</h3>
                <p className="text-sm text-neutral-text">Using technology to save lives</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-neutral-section">
        <div className="container mx-auto px-4">
          <h2 className="section-heading text-center mx-auto mb-16">Our Services</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="card hover:border-blood-primary">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-blood-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blood-primary mb-3">Donor Registration</h3>
                  <p className="text-neutral-text leading-relaxed">
                    Easy online registration for blood donors. Maintain your profile, track donation history, 
                    and update availability status.
                  </p>
                </div>
              </div>
            </div>

            <div className="card hover:border-blood-primary">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-blood-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blood-primary mb-3">Blood Search</h3>
                  <p className="text-neutral-text leading-relaxed">
                    Advanced search filters to find blood donors by blood group, location, and availability. 
                    Get instant contact details.
                  </p>
                </div>
              </div>
            </div>

            <div className="card hover:border-blood-primary">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-blood-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blood-primary mb-3">Blood Camps</h3>
                  <p className="text-neutral-text leading-relaxed">
                    Discover upcoming blood donation camps in your area. View locations, timings, and 
                    organizer contact information.
                  </p>
                </div>
              </div>
            </div>

            <div className="card hover:border-blood-primary">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-blood-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blood-primary mb-3">Blood Inventory</h3>
                  <p className="text-neutral-text leading-relaxed">
                    Real-time inventory tracking across multiple locations. Check availability of different 
                    blood groups at nearby camps.
                  </p>
                </div>
              </div>
            </div>

            <div className="card hover:border-blood-primary">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-blood-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blood-primary mb-3">24/7 Emergency</h3>
                  <p className="text-neutral-text leading-relaxed">
                    Round-the-clock emergency blood request handling. Our team coordinates urgent 
                    blood requirements immediately.
                  </p>
                </div>
              </div>
            </div>

            <div className="card hover:border-blood-primary">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-blood-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blood-primary mb-3">Feedback & Support</h3>
                  <p className="text-neutral-text leading-relaxed">
                    Share your experience and suggestions. We continuously improve our services based 
                    on community feedback.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Contact Component (includes Feedback form)
export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'feedback',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await api.submitFeedback(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', type: 'feedback', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.message || 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-blood-primary to-blood-dark text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">Contact Us</h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-gray-200">
            We'd love to hear from you. Send us your feedback or complaints.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-blood-primary mb-8">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blood-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blood-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-blood-primary mb-1">Phone</h3>
                    <p className="text-neutral-text">Emergency: +91 1800-123-4567</p>
                    <p className="text-neutral-text">General: +91 9876543210</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blood-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blood-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-blood-primary mb-1">Email</h3>
                    <p className="text-neutral-text">help@lifeflow.org</p>
                    <p className="text-neutral-text">emergency@lifeflow.org</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blood-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blood-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-blood-primary mb-1">Address</h3>
                    <p className="text-neutral-text">LifeFlow Blood Bank</p>
                    <p className="text-neutral-text">123 Healthcare Avenue</p>
                    <p className="text-neutral-text">Mumbai, Maharashtra 400001</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blood-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blood-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-blood-primary mb-1">Working Hours</h3>
                    <p className="text-neutral-text">24/7 Emergency Service</p>
                    <p className="text-neutral-text">Office: Mon-Sat, 9 AM - 6 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feedback Form */}
            <div className="card">
              <h2 className="text-3xl font-bold text-blood-primary mb-6">Send Feedback</h2>
              
              {success && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                  <p className="text-green-700 font-medium">Thank you for your feedback!</p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-neutral-text font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-neutral-text font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-neutral-text font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="+91 9876543210"
                  />
                </div>

                <div>
                  <label className="block text-neutral-text font-medium mb-2">Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="feedback">Feedback</option>
                    <option value="complaint">Complaint</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-text font-medium mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="input-field resize-none"
                    placeholder="Write your message here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};