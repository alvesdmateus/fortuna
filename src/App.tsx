import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Tarot from './pages/Tarot';
import PalmReading from './pages/PalmReading';
import Astrology from './pages/Astrology';
import SettingsPage from './pages/SettingsPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tarot" element={<Tarot />} />
            <Route path="/palm" element={<PalmReading />} />
            <Route path="/astrology" element={<Astrology />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <div className="container">
            <span className="footer-logo">✦ Fortuna</span>
            <p className="footer-text">Ancient wisdom for the modern seeker</p>
            <p className="footer-disclaimer">For entertainment and self-reflection purposes.</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
