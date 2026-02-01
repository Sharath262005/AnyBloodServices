import React, { useState } from 'react';
import api from '../services/api';

const DonatePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    blood_group: 'A+',
    age: '',
    address: '',
    city: '',
    state: '',
    last_donation_date: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await api.createDonor(formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        blood_group: 'A+',
        age: '',
        address: '',
        city: '',
        state: '',
        last_donation_date: ''
      });
      
      // Scroll to success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-section">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blood-primary to-blood-dark text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">Become a Donor</h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-gray-200">
            Join our community of life-savers. Your blood can save up to three lives.
          </p>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="card">
            {success && (
              <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8 rounded-lg animate-slide-in">
                <div className="flex items-center">
                  <svg className="w-8 h-8 text-green-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <div>
                    <h3 className="text-green-800 font-bold text-lg">Registration Successful!</h3>
                    <p className="text-green-700">Thank you for registering as a donor. You're now part of our life-saving network.</p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            )}

            <h2 className="text-3xl font-bold text-blood-primary mb-2">Donor Registration</h2>
            <p className="text-neutral-text mb-8">Please fill in your details to register as a blood donor.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-neutral-text font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-neutral-text font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-neutral-text font-medium mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="+91 9876543210"
                  />
                </div>

                <div>
                  <label className="block text-neutral-text font-medium mb-2">
                    Blood Group *
                  </label>
                  <select
                    name="blood_group"
                    value={formData.blood_group}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-neutral-text font-medium mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    min="18"
                    max="65"
                    className="input-field"
                    placeholder="25"
                  />
                  <p className="text-sm text-gray-500 mt-1">Must be between 18-65 years</p>
                </div>

                <div>
                  <label className="block text-neutral-text font-medium mb-2">
                    Last Donation Date
                  </label>
                  <input
                    type="date"
                    name="last_donation_date"
                    value={formData.last_donation_date}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-text font-medium mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="input-field resize-none"
                  placeholder="Street address, Landmark"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-neutral-text font-medium mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Mumbai"
                  />
                </div>

                <div>
                  <label className="block text-neutral-text font-medium mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Maharashtra"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Donor Eligibility Criteria:</h4>
                <ul className="text-blue-700 text-sm space-y-1 ml-4">
                  <li>• Age between 18-65 years</li>
                  <li>• Weight at least 50 kg</li>
                  <li>• Hemoglobin level above 12.5 g/dL</li>
                  <li>• At least 3 months since last donation</li>
                  <li>• Free from any infectious diseases</li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Registering...' : 'Register as Donor'}
              </button>

              <p className="text-center text-sm text-gray-600">
                By registering, you agree to be contacted for blood donation requests and updates.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-4xl font-bold text-center text-blood-primary mb-12">
            Benefits of Donating Blood
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blood-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-blood-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blood-primary mb-2">Save Lives</h3>
              <p className="text-neutral-text">One donation can save up to three lives</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blood-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-blood-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blood-primary mb-2">Health Benefits</h3>
              <p className="text-neutral-text">Regular donation reduces heart disease risk</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blood-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-blood-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blood-primary mb-2">Community Impact</h3>
              <p className="text-neutral-text">Be a hero in your community</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonatePage;