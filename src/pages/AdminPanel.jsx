
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('donors');
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const response = await api.checkAuth();
      // Check if response has authenticated property
      if (response && response.authenticated === true) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log('Auth check error:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blood-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-neutral-section">
      <AdminDashboard 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onLogout={() => {
          setIsAuthenticated(false);
          navigate('/');
        }}
      />
    </div>
  );
};

// Admin Login Component
const AdminLogin = ({ onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.login(credentials.username, credentials.password);
      if (response.success) {
        onLoginSuccess();
      } else {
        setError(response.error || 'Login failed');
      }
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blood-primary to-blood-dark py-12 px-4">
      <div className="max-w-md w-full card">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blood-primary rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-blood-primary">Admin Login</h2>
          <p className="text-neutral-text mt-2">Enter your credentials to access the admin panel</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-neutral-text font-medium mb-2">Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              required
              className="input-field"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-neutral-text font-medium mb-2">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
              className="input-field"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="text-center text-sm text-gray-600">
            <p>Default credentials for testing:</p>
            <p className="font-mono bg-gray-100 p-2 rounded mt-2">
              Username: admin<br />
              Password: admin123
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

// Admin Dashboard Component
const AdminDashboard = ({ activeTab, setActiveTab, onLogout }) => {
  const handleLogout = async () => {
    try {
      await api.logout();
      onLogout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Admin Header */}
      <header className="bg-blood-primary text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">LifeFlow Admin Panel</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white text-blood-primary rounded-lg font-semibold hover:bg-blood-light hover:text-white transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-neutral-border">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto">
            {[
              { id: 'donors', label: 'Donors', icon: '👥' },
              { id: 'camps', label: 'Camps', icon: '🏥' },
              { id: 'inventory', label: 'Inventory', icon: '💉' },
              { id: 'feedback', label: 'Feedback', icon: '💬' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-semibold transition-all border-b-4 ${
                  activeTab === tab.id
                    ? 'border-blood-primary text-blood-primary'
                    : 'border-transparent text-neutral-text hover:text-blood-primary'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'donors' && <DonorsManager />}
        {activeTab === 'camps' && <CampsManager />}
        {activeTab === 'inventory' && <InventoryManager />}
        {activeTab === 'feedback' && <FeedbackManager />}
      </div>
    </div>
  );
};

// Donors Manager
const DonorsManager = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingDonor, setEditingDonor] = useState(null);

  useEffect(() => {
    loadDonors();
  }, []);

  const loadDonors = async () => {
    try {
      const data = await api.getDonors();
      setDonors(data);
    } catch (error) {
      console.error('Failed to load donors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this donor?')) return;
    
    try {
      await api.deleteDonor(id);
      loadDonors();
    } catch (error) {
      alert('Failed to delete donor');
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading donors...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blood-primary">Donors Management</h2>
        <div className="text-gray-600">Total: {donors.length} donors</div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-neutral-border">
              <th className="text-left py-3 px-4 font-semibold">Name</th>
              <th className="text-left py-3 px-4 font-semibold">Blood Group</th>
              <th className="text-left py-3 px-4 font-semibold">Contact</th>
              <th className="text-left py-3 px-4 font-semibold">City</th>
              <th className="text-left py-3 px-4 font-semibold">Eligible</th>
              <th className="text-left py-3 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor) => (
              <tr key={donor.id} className="border-b border-neutral-border hover:bg-neutral-section">
                <td className="py-3 px-4">{donor.name}</td>
                <td className="py-3 px-4">
                  <span className="px-3 py-1 bg-blood-primary text-white rounded-full text-sm font-semibold">
                    {donor.blood_group}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="text-sm">
                    <div>{donor.phone}</div>
                    <div className="text-gray-600">{donor.email}</div>
                  </div>
                </td>
                <td className="py-3 px-4">{donor.city || 'N/A'}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    donor.is_eligible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {donor.is_eligible ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDelete(donor.id)}
                    className="text-red-600 hover:text-red-800 font-medium text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Camps Manager
const CampsManager = () => {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    location_name: '',
    address: '',
    city: '',
    state: '',
    camp_date: '',
    camp_time: '',
    manager_name: '',
    manager_phone: '',
    manager_email: '',
    capacity: 50,
    status: 'upcoming'
  });

  useEffect(() => {
    loadCamps();
  }, []);

  const loadCamps = async () => {
    try {
      const data = await api.getCamps();
      setCamps(data);
    } catch (error) {
      console.error('Failed to load camps:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createCamp(formData);
      setShowForm(false);
      setFormData({
        location_name: '',
        address: '',
        city: '',
        state: '',
        camp_date: '',
        camp_time: '',
        manager_name: '',
        manager_phone: '',
        manager_email: '',
        capacity: 50,
        status: 'upcoming'
      });
      loadCamps();
    } catch (error) {
      alert('Failed to create camp');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this camp?')) return;
    
    try {
      await api.deleteCamp(id);
      loadCamps();
    } catch (error) {
      alert('Failed to delete camp');
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading camps...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blood-primary">Camps Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          {showForm ? 'Cancel' : '+ Add New Camp'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-6">
          <h3 className="text-xl font-bold text-blood-primary mb-4">Add New Camp</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Location Name *</label>
                <input
                  type="text"
                  value={formData.location_name}
                  onChange={(e) => setFormData({...formData, location_name: e.target.value})}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  required
                  className="input-field"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Address *</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Camp Date *</label>
                <input
                  type="date"
                  value={formData.camp_date}
                  onChange={(e) => setFormData({...formData, camp_date: e.target.value})}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Camp Time *</label>
                <input
                  type="time"
                  value={formData.camp_time}
                  onChange={(e) => setFormData({...formData, camp_time: e.target.value})}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Manager Name *</label>
                <input
                  type="text"
                  value={formData.manager_name}
                  onChange={(e) => setFormData({...formData, manager_name: e.target.value})}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Manager Phone *</label>
                <input
                  type="tel"
                  value={formData.manager_phone}
                  onChange={(e) => setFormData({...formData, manager_phone: e.target.value})}
                  required
                  className="input-field"
                />
              </div>
            </div>
            <button type="submit" className="btn-primary">Create Camp</button>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {camps.map((camp) => (
          <div key={camp.id} className="card">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-blood-primary">{camp.location_name}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                camp.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                camp.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {camp.status}
              </span>
            </div>
            <p className="text-sm text-neutral-text mb-2">{camp.address}, {camp.city}</p>
            <p className="text-sm text-neutral-text mb-2">
              <strong>Date:</strong> {camp.camp_date} | <strong>Time:</strong> {camp.camp_time}
            </p>
            <p className="text-sm text-neutral-text mb-4">
              <strong>Manager:</strong> {camp.manager_name} ({camp.manager_phone})
            </p>
            <button
              onClick={() => handleDelete(camp.id)}
              className="text-red-600 hover:text-red-800 font-medium text-sm"
            >
              Delete Camp
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Inventory Manager
const InventoryManager = () => {
  const [camps, setCamps] = useState([]);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCamps();
  }, []);

  const loadCamps = async () => {
    try {
      const data = await api.getCamps();
      setCamps(data);
      if (data.length > 0) {
        setSelectedCamp(data[0].id);
        loadInventory(data[0].id);
      }
    } catch (error) {
      console.error('Failed to load camps:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadInventory = async (campId) => {
    try {
      const data = await api.getCampInventory(campId);
      setInventory(data);
    } catch (error) {
      console.error('Failed to load inventory:', error);
    }
  };

  const handleCampChange = (campId) => {
    setSelectedCamp(campId);
    loadInventory(campId);
  };

  const handleUpdate = async (bloodGroup, units) => {
    try {
      await api.updateInventory({
        camp_id: selectedCamp,
        blood_group: bloodGroup,
        units_available: units
      });
      loadInventory(selectedCamp);
    } catch (error) {
      alert('Failed to update inventory');
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading inventory...</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-blood-primary mb-6">Blood Inventory Management</h2>

      <div className="card mb-6">
        <label className="block text-sm font-medium mb-2">Select Camp:</label>
        <select
          value={selectedCamp || ''}
          onChange={(e) => handleCampChange(e.target.value)}
          className="input-field max-w-md"
        >
          {camps.map((camp) => (
            <option key={camp.id} value={camp.id}>
              {camp.location_name} - {camp.city}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {inventory.map((item) => (
          <div key={item.id} className="card text-center">
            <div className="text-4xl font-bold text-blood-primary mb-2">{item.blood_group}</div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Units Available:</label>
              <input
                type="number"
                value={item.units_available}
                onChange={(e) => {
                  const newInventory = inventory.map(inv =>
                    inv.id === item.id ? {...inv, units_available: e.target.value} : inv
                  );
                  setInventory(newInventory);
                }}
                min="0"
                className="input-field text-center text-xl font-bold"
              />
            </div>
            <button
              onClick={() => handleUpdate(item.blood_group, item.units_available)}
              className="btn-primary text-sm w-full"
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Feedback Manager
const FeedbackManager = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadFeedback();
  }, [filter]);

  const loadFeedback = async () => {
    try {
      const filters = filter === 'all' ? {} : { status: filter };
      const data = await api.getFeedback(filters);
      setFeedbacks(data);
    } catch (error) {
      console.error('Failed to load feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.updateFeedbackStatus(id, status);
      loadFeedback();
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this feedback?')) return;
    
    try {
      await api.deleteFeedback(id);
      loadFeedback();
    } catch (error) {
      alert('Failed to delete feedback');
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading feedback...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blood-primary">Feedback & Complaints</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === 'all' ? 'bg-blood-primary text-white' : 'bg-white text-neutral-text border'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === 'pending' ? 'bg-blood-primary text-white' : 'bg-white text-neutral-text border'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('resolved')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === 'resolved' ? 'bg-blood-primary text-white' : 'bg-white text-neutral-text border'
            }`}
          >
            Resolved
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="card">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">{feedback.name}</h3>
                <p className="text-sm text-gray-600">{feedback.email} | {feedback.phone}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  feedback.type === 'feedback' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {feedback.type}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  feedback.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  feedback.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {feedback.status}
                </span>
              </div>
            </div>
            <p className="text-neutral-text mb-4">{feedback.message}</p>
            <div className="flex gap-2">
              <select
                value={feedback.status}
                onChange={(e) => handleStatusUpdate(feedback.id, e.target.value)}
                className="px-3 py-1 border rounded text-sm"
              >
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="resolved">Resolved</option>
              </select>
              <button
                onClick={() => handleDelete(feedback.id)}
                className="text-red-600 hover:text-red-800 font-medium text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;