import React, { useState, useEffect } from 'react';
import api from '../services/api';

const DonorsList = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    bloodGroup: '',
    city: ''
  });
  const [filteredDonors, setFilteredDonors] = useState([]);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  useEffect(() => {
    loadDonors();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, donors]);

  const loadDonors = async () => {
    try {
      const data = await api.getDonors();
      setDonors(data);
      setFilteredDonors(data);
    } catch (error) {
      console.error('Failed to load donors:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...donors];

    if (filters.bloodGroup) {
      filtered = filtered.filter(donor => donor.blood_group === filters.bloodGroup);
    }

    if (filters.city) {
      filtered = filtered.filter(donor => 
        donor.city && donor.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    setFilteredDonors(filtered);
  };

  const resetFilters = () => {
    setFilters({ bloodGroup: '', city: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blood-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-text text-lg">Loading donors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-section">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blood-primary to-blood-dark text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">Our Donors</h1>
          <p className="text-xl text-center max-w-3xl mx-auto text-gray-200">
            Meet the heroes who are ready to save lives. Total registered donors: <strong>{donors.length}</strong>
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {bloodGroups.map(group => {
              const count = donors.filter(d => d.blood_group === group).length;
              return (
                <div key={group} className="card text-center hover:border-blood-primary transition-all">
                  <div className="text-3xl font-bold text-blood-primary mb-2">{group}</div>
                  <div className="text-2xl font-semibold text-neutral-text">{count}</div>
                  <div className="text-sm text-gray-500">donors</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-neutral-section">
        <div className="container mx-auto px-4">
          <div className="card max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-blood-primary mb-6">🔍 Filter Donors</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-text mb-2">Blood Group</label>
                <select
                  value={filters.bloodGroup}
                  onChange={(e) => setFilters({ ...filters, bloodGroup: e.target.value })}
                  className="input-field"
                >
                  <option value="">All Blood Groups</option>
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-text mb-2">City</label>
                <input
                  type="text"
                  value={filters.city}
                  onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                  placeholder="Enter city name"
                  className="input-field"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={resetFilters}
                  className="w-full px-4 py-3 bg-neutral-border text-neutral-text rounded-lg 
                           hover:bg-neutral-text hover:text-white transition-all font-semibold"
                >
                  Reset Filters
                </button>
              </div>
            </div>

            <div className="mt-4 text-center text-neutral-text">
              Showing <strong className="text-blood-primary">{filteredDonors.length}</strong> of {donors.length} donors
            </div>
          </div>
        </div>
      </section>

      {/* Donors List Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredDonors.length === 0 ? (
            <div className="card text-center py-16 max-w-2xl mx-auto">
              <svg className="w-24 h-24 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <h3 className="text-2xl font-bold text-gray-600 mb-3">No Donors Found</h3>
              <p className="text-gray-500 mb-6">
                No donors match your current filters. Try adjusting your search criteria.
              </p>
              <button onClick={resetFilters} className="btn-primary">
                Show All Donors
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDonors.map((donor) => (
                <div key={donor.id} className="card hover:border-blood-primary transition-all group">
                  {/* Donor Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-14 h-14 bg-blood-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-blood-primary group-hover:text-blood-dark">
                          {donor.name}
                        </h3>
                        <span className="inline-block px-3 py-1 bg-blood-primary text-white rounded-full text-xs font-semibold">
                          {donor.blood_group}
                        </span>
                      </div>
                    </div>
                    
                    {donor.is_eligible ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                        ✓ Eligible
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded">
                        Not Eligible
                      </span>
                    )}
                  </div>

                  {/* Donor Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-neutral-text">
                      <svg className="w-4 h-4 mr-2 text-blood-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                      <span className="truncate">{donor.email}</span>
                    </div>

                    <div className="flex items-center text-sm text-neutral-text">
                      <svg className="w-4 h-4 mr-2 text-blood-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                      <span>{donor.phone}</span>
                    </div>

                    {donor.city && (
                      <div className="flex items-center text-sm text-neutral-text">
                        <svg className="w-4 h-4 mr-2 text-blood-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        <span>{donor.city}{donor.state ? `, ${donor.state}` : ''}</span>
                      </div>
                    )}

                    {donor.age && (
                      <div className="flex items-center text-sm text-neutral-text">
                        <svg className="w-4 h-4 mr-2 text-blood-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                        <span>{donor.age} years old</span>
                      </div>
                    )}

                    {donor.last_donation_date && (
                      <div className="flex items-center text-sm text-neutral-text">
                        <svg className="w-4 h-4 mr-2 text-blood-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                        <span>Last donated: {new Date(donor.last_donation_date).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  {/* Contact Buttons */}
                  <div className="flex gap-2 border-t border-neutral-border pt-4">
                    <a
                      href={`tel:${donor.phone}`}
                      className="flex-1 px-4 py-2 bg-blood-primary text-white text-center rounded-lg 
                               hover:bg-blood-dark transition-colors font-semibold text-sm"
                    >
                      📞 Call
                    </a>
                    <a
                      href={`mailto:${donor.email}`}
                      className="flex-1 px-4 py-2 bg-white text-blood-primary border-2 border-blood-primary 
                               text-center rounded-lg hover:bg-blood-primary hover:text-white 
                               transition-colors font-semibold text-sm"
                    >
                      ✉️ Email
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="card bg-gradient-to-r from-blood-primary to-blood-dark text-white text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Want to Join Our Heroes?</h2>
            <p className="text-lg mb-6 text-gray-200">
              Register as a blood donor today and help save lives in your community.
            </p>
            <a
              href="/donate"
              className="inline-block px-8 py-4 bg-white text-blood-primary rounded-lg 
                       font-bold text-lg hover:bg-blood-light hover:text-white 
                       transform hover:scale-105 transition-all shadow-lg"
            >
              Register as Donor
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonorsList;