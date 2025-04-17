import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";
import Auth from "./components/Auth";
import QuoteForm from "./components/QuoteForm";
import Contact from "./components/Contact";
import Blog from "./components/Blog";
import AdminDashboard from "./components/admin/AdminDashboard";
import UserDashboard from "./components/user/UserDashboard";
import { ProtectedRoute } from "./hooks/ProtectedRoutes";
import Notifications from "./components/admin/Notifications";


function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const handleAuthClick = (mode: "login" | "register") => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  const handleCloseAuth = () => {
    setShowAuth(false);
  };

  const handleQuoteClick = () => {
    setShowQuoteForm(true);
  };

  const handleCloseQuote = () => {
    setShowQuoteForm(false);
  };

  if (showAuth) {
    return (
      <div>
        <button
          onClick={handleCloseAuth}
          className="fixed top-4 right-4 z-50 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          ✕
        </button>
        <Auth initialMode={authMode} />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route element={<ProtectedRoute admin={true} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
        {/* User Dashboard Route */}
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/notifications" element={<Notifications />} />

        <Route path="/login" element={<Auth initialMode="login" />} />

        
        <Route path="/register" element={<Auth initialMode="register" />} />
        Public Routes 
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gray-50">
              <Header onAuthClick={handleAuthClick} />
              <main className="pt-16">
                <Hero />
                <About />
                <Services onQuoteClick={handleQuoteClick} />
                <Portfolio />
                <HowItWorks />
              </main>
              <Footer />
              {showQuoteForm && <QuoteForm onClose={handleCloseQuote} />}
            </div>
          }
        />
        <Route
          path="/about"
          element={
            <div className="min-h-screen bg-gray-50">
              <Header onAuthClick={handleAuthClick} />
              <main className="pt-16">
                <About />
              </main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/services"
          element={
            <div className="min-h-screen bg-gray-50">
              <Header onAuthClick={handleAuthClick} />
              <main className="pt-16">
                <Services onQuoteClick={handleQuoteClick} />
              </main>
              <Footer />
              {showQuoteForm && <QuoteForm onClose={handleCloseQuote} />}
            </div>
          }
        />
        <Route
          path="/services/web-design"
          element={<Navigate to="/services" replace />}
        />
        <Route
          path="/services/mobile-apps"
          element={<Navigate to="/services" replace />}
        />
        <Route
          path="/services/software-dev"
          element={<Navigate to="/services" replace />}
        />
        <Route
          path="/services/graphic-design"
          element={<Navigate to="/services" replace />}
        />
        <Route
          path="/services/digital-marketing"
          element={<Navigate to="/services" replace />}
        />
        <Route
          path="/services/it-consultancy"
          element={<Navigate to="/services" replace />}
        />
        <Route
          path="/portfolio"
          element={
            <div className="min-h-screen bg-gray-50">
              <Header onAuthClick={handleAuthClick} />
              <main className="pt-16">
                <Portfolio />
              </main>
              <Footer />
            </div>
          }
        />
        <Route
          path="/contact"
          element={
            <div className="min-h-screen bg-gray-50">
              <Header onAuthClick={handleAuthClick} />
              <Contact />
              <Footer />
            </div>
          }
        />
        <Route
          path="/blog"
          element={
            <div className="min-h-screen bg-gray-50">
              <Header onAuthClick={handleAuthClick} />
              <Blog />
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
