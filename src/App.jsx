import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import { About, Contact } from './pages/AboutContact';
import DonatePage from './pages/DonatePage';
import { FindBlood, CampsPage } from './pages/FindBloodCamps';
import DonorsList from './pages/DonorsList';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          {/* Admin route without header/footer */}
          <Route path="/admin" element={<AdminPanel />} />
          
          {/* Public routes with header/footer */}
          <Route
            path="/*"
            element={
              <>
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/donate" element={<DonatePage />} />
                    <Route path="/find-blood" element={<FindBlood />} />
                    <Route path="/camps" element={<CampsPage />} />
                    <Route path="/donors" element={<DonorsList />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;