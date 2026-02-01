import React, { useState, useEffect } from 'react';
import api from '../services/api';

// Find Blood Page
export const FindBlood = () => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [city, setCity] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);

    try {
      const data = await api.searchBlood({ blood_group: bloodGroup, city });
      setResults(data);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-section">
      <section className="py-16 bg-gradient-to-br from-blood-primary to-blood-dark text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">Find Blood</h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-gray-200">
            Search for available blood in your area
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-blood-primary mb-6">Search Blood Availability</h2>
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-neutral-text font-medium mb-2">
                    Blood Group *
                  </label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    required
                    className="input-field"
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-text font-medium mb-2">
                    City (Optional)
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="input-field"
                    placeholder="Enter city name"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50"
              >
                {loading ? 'Searching...' : 'Search Blood'}
              </button>
            </form>
          </div>

          {/* Results */}
          {searched && (
            <div>
              <h3 className="text-2xl font-bold text-blood-primary mb-6">
                Search Results ({results.length} locations found)
              </h3>

              {results.length === 0 ? (
                <div className="card text-center py-12">
                  <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No Results Found</h3>
                  <p className="text-gray-500">
                    No blood banks found with {bloodGroup} blood{city && ` in ${city}`}. Try adjusting your search criteria.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {results.map((result, index) => (
                    <div key={index} className="card hover:border-blood-primary transition-all">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0">
                          <h4 className="text-xl font-bold text-blood-primary mb-2">
                            {result.location_name}
                          </h4>
                          <p className="text-neutral-text mb-1">
                            <span className="font-semibold">City:</span> {result.city}
                          </p>
                          <p className="text-neutral-text mb-1">
                            <span className="font-semibold">Address:</span> {result.address}
                          </p>
                          <div className="flex items-center space-x-4 mt-3">
                            <div className="flex items-center space-x-2 text-blood-primary">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                              </svg>
                              <span className="font-semibold text-2xl">{result.units_available} units</span>
                            </div>
                            <div className="px-3 py-1 bg-blood-primary text-white rounded-full text-sm font-semibold">
                              {result.blood_group}
                            </div>
                          </div>
                        </div>

                        <div className="border-t md:border-t-0 md:border-l border-neutral-border pt-4 md:pt-0 md:pl-6 md:ml-6">
                          <h5 className="font-semibold text-blood-primary mb-2">Contact Manager:</h5>
                          <p className="text-neutral-text mb-1">
                            <span className="font-medium">Name:</span> {result.manager_name}
                          </p>
                          <p className="text-neutral-text mb-1">
                            <span className="font-medium">Phone:</span> {result.manager_phone}
                          </p>
                          {result.manager_email && (
                            <p className="text-neutral-text">
                              <span className="font-medium">Email:</span> {result.manager_email}
                            </p>
                          )}
                          <a
                            href={`tel:${result.manager_phone}`}
                            className="inline-block mt-3 px-4 py-2 bg-blood-primary text-white rounded-lg 
                                     hover:bg-blood-dark transition-colors text-sm font-semibold"
                          >
                            Call Now
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Emergency Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="card bg-gradient-to-r from-blood-primary to-blood-dark text-white">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 pulse-animation">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Emergency Blood Request</h3>
                <p className="mb-3">Can't find what you're looking for? Call our emergency hotline</p>
                <a
                  href="tel:+911800-123-4567"
                  className="inline-block px-6 py-3 bg-white text-blood-primary rounded-lg 
                           font-bold hover:bg-blood-light hover:text-white transition-all"
                >
                  Call: +91 1800-123-4567
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Camps Page
export const CampsPage = () => {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadCamps();
  }, [filter]);

  const loadCamps = async () => {
    setLoading(true);
    try {
      const filters = filter === 'all' ? {} : { status: filter };
      const data = await api.getCamps(filters);
      setCamps(data);
    } catch (error) {
      console.error('Failed to load camps:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getStatusBadge = (status) => {
    const styles = {
      upcoming: 'bg-blue-100 text-blue-800',
      ongoing: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800'
    };
    return styles[status] || styles.upcoming;
  };

  return (
    <div className="min-h-screen bg-neutral-section">
      <section className="py-16 bg-gradient-to-br from-blood-primary to-blood-dark text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">Blood Donation Camps</h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-gray-200">
            Find and participate in blood donation camps near you
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                filter === 'all'
                  ? 'bg-blood-primary text-white'
                  : 'bg-white text-neutral-text border-2 border-neutral-border hover:border-blood-primary'
              }`}
            >
              All Camps
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                filter === 'upcoming'
                  ? 'bg-blood-primary text-white'
                  : 'bg-white text-neutral-text border-2 border-neutral-border hover:border-blood-primary'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter('ongoing')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                filter === 'ongoing'
                  ? 'bg-blood-primary text-white'
                  : 'bg-white text-neutral-text border-2 border-neutral-border hover:border-blood-primary'
              }`}
            >
              Ongoing
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                filter === 'completed'
                  ? 'bg-blood-primary text-white'
                  : 'bg-white text-neutral-text border-2 border-neutral-border hover:border-blood-primary'
              }`}
            >
              Completed
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-blood-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-neutral-text">Loading camps...</p>
            </div>
          ) : camps.length === 0 ? (
            <div className="card text-center py-12">
              <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Camps Found</h3>
              <p className="text-gray-500">No {filter !== 'all' && filter} blood donation camps available.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {camps.map((camp) => (
                <div key={camp.id} className="card hover:border-blood-primary transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-blood-primary group-hover:text-blood-dark">
                      {camp.location_name}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(camp.status)}`}>
                      {camp.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-start space-x-2 text-neutral-text">
                      <svg className="w-5 h-5 text-blood-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      <span className="text-sm">{camp.address}, {camp.city}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-neutral-text">
                      <svg className="w-5 h-5 text-blood-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <span className="text-sm font-medium">{formatDate(camp.camp_date)}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-neutral-text">
                      <svg className="w-5 h-5 text-blood-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span className="text-sm font-medium">{formatTime(camp.camp_time)}</span>
                    </div>
                  </div>

                  <div className="border-t border-neutral-border pt-4">
                    <h4 className="text-sm font-semibold text-blood-primary mb-2">Camp Manager:</h4>
                    <p className="text-sm text-neutral-text mb-1">
                      <span className="font-medium">Name:</span> {camp.manager_name}
                    </p>
                    <p className="text-sm text-neutral-text mb-1">
                      <span className="font-medium">Phone:</span> {camp.manager_phone}
                    </p>
                    {camp.manager_email && (
                      <p className="text-sm text-neutral-text">
                        <span className="font-medium">Email:</span> {camp.manager_email}
                      </p>
                    )}
                  </div>

                  {camp.total_units !== null && (
                    <div className="mt-4 bg-blood-primary/5 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-neutral-text">Total Blood Units:</span>
                        <span className="text-lg font-bold text-blood-primary">{camp.total_units || 0} units</span>
                      </div>
                    </div>
                  )}

                  <a
                    href={`tel:${camp.manager_phone}`}
                    className="block mt-4 text-center px-4 py-2 bg-blood-primary text-white rounded-lg 
                             hover:bg-blood-dark transition-colors font-semibold"
                  >
                    Contact Manager
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};