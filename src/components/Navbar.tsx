import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Hand, Star, Moon, Menu, X, Settings } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home', icon: <Moon size={16} /> },
    { to: '/tarot', label: 'Tarot', icon: <Sparkles size={16} /> },
    { to: '/palm', label: 'Palm Reading', icon: <Hand size={16} /> },
    { to: '/astrology', label: 'Astrology', icon: <Star size={16} /> },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo">
          <span className="logo-star">✦</span>
          <span className="logo-text">Fortuna</span>
        </Link>

        <div className="navbar-links">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>

        <div className="navbar-actions">
          <Link to="/settings" className={`nav-settings ${location.pathname === '/settings' ? 'active' : ''}`} title="Settings">
            <Settings size={18} />
          </Link>
          <button
            className="navbar-burger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar-mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`mobile-nav-link ${location.pathname === link.to ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            <Link to="/settings" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
              <Settings size={16} />
              Settings
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
