import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const stats = [
    { number: '10,000+', label: 'Donors Registered', icon: '👥' },
    { number: '5,000+', label: 'Lives Saved', icon: '❤️' },
    { number: '50+', label: 'Active Camps', icon: '🏥' },
    { number: '24/7', label: 'Emergency Service', icon: '⏰' },
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blood-primary via-blood-dark to-neutral-text text-white py-20 overflow-hidden">
        {/* Animated blood drops */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full blood-drop"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-in">
              Donate Blood, <span className="text-blood-light">Save Lives</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-slide-in" style={{ animationDelay: '0.2s' }}>
              Join our community of heroes. Every donation makes a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in" style={{ animationDelay: '0.4s' }}>
              <Link
                to="/donate"
                className="px-8 py-4 bg-white text-blood-primary rounded-lg font-bold text-lg 
                         hover:bg-blood-light hover:text-white transform hover:scale-105 
                         transition-all duration-300 shadow-2xl"
              >
                Register as Donor
              </Link>
              <Link
                to="/find-blood"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg 
                         font-bold text-lg hover:bg-white hover:text-blood-primary transform 
                         hover:scale-105 transition-all duration-300"
              >
                Find Blood
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="card text-center transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-blood-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-neutral-text font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blood Groups Quick Reference */}
      <section className="py-16 bg-neutral-section">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-blood-primary mb-12">
            Blood Groups
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
            {bloodGroups.map((group) => (
              <div
                key={group}
                className="card text-center cursor-pointer hover:bg-blood-primary 
                         hover:text-white group transition-all duration-300"
              >
                <div className="text-3xl font-bold mb-2 group-hover:scale-110 
                              transition-transform duration-300">
                  {group}
                </div>
                <Link
                  to={`/find-blood?blood_group=${group}`}
                  className="text-sm text-blood-primary group-hover:text-white"
                >
                  Find Donors
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-heading text-center mx-auto mb-16">Why Choose LifeFlow?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center group hover:border-blood-primary">
              <div className="w-20 h-20 bg-blood-primary/10 rounded-full mx-auto mb-6 
                            flex items-center justify-center group-hover:bg-blood-primary 
                            transition-colors duration-300">
                <svg className="w-10 h-10 text-blood-primary group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-blood-primary mb-4">Easy Search</h3>
              <p className="text-neutral-text leading-relaxed">
                Find blood donors and camps near you with our advanced search filters.
              </p>
            </div>

            <div className="card text-center group hover:border-blood-primary">
              <div className="w-20 h-20 bg-blood-primary/10 rounded-full mx-auto mb-6 
                            flex items-center justify-center group-hover:bg-blood-primary 
                            transition-colors duration-300">
                <svg className="w-10 h-10 text-blood-primary group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-blood-primary mb-4">24/7 Available</h3>
              <p className="text-neutral-text leading-relaxed">
                Emergency blood requests handled round the clock. We're always here when you need us.
              </p>
            </div>

            <div className="card text-center group hover:border-blood-primary">
              <div className="w-20 h-20 bg-blood-primary/10 rounded-full mx-auto mb-6 
                            flex items-center justify-center group-hover:bg-blood-primary 
                            transition-colors duration-300">
                <svg className="w-10 h-10 text-blood-primary group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-blood-primary mb-4">Verified Donors</h3>
              <p className="text-neutral-text leading-relaxed">
                All donors are verified and their health information is regularly updated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blood-primary to-blood-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Be a Hero. Donate Blood Today.
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-200">
            One pint of blood can save three lives. Join thousands of donors making a difference.
          </p>
          <Link
            to="/donate"
            className="inline-block px-10 py-4 bg-white text-blood-primary rounded-lg 
                     font-bold text-lg hover:bg-blood-light hover:text-white 
                     transform hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            Register Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;