import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Key, Eye, EyeOff, Trash2, Check, Info } from 'lucide-react';
import { saveApiKey, clearApiKey, getAIMode } from '../services/ai';
import './SettingsPage.css';

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState(localStorage.getItem('fortuna_api_key') || '');
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);
  const currentMode = getAIMode();

  const handleSave = () => {
    if (apiKey.trim()) {
      saveApiKey(apiKey.trim());
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  };

  const handleClear = () => {
    clearApiKey();
    setApiKey('');
  };

  return (
    <div className="settings-page page-enter">
      <div className="container">
        <div className="section-header" style={{ paddingTop: '60px' }}>
          <p className="eyebrow">Configuration</p>
          <h1>
            <Settings size={32} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 12, color: 'var(--accent-purple)' }} />
            Settings
          </h1>
          <p>Configure your AI provider to unlock enhanced readings powered by Google Gemini.</p>
        </div>

        <div className="settings-layout">
          {/* Current Mode */}
          <motion.div
            className={`mode-card glass-card ${currentMode === 'gemini' ? 'mode-active' : ''}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mode-indicator">
              <div className={`mode-dot ${currentMode === 'gemini' ? 'dot-active' : 'dot-local'}`} />
              <span className="mode-status">
                {currentMode === 'gemini' ? '✓ Gemini AI Active' : 'Demo Mode (Local)'}
              </span>
            </div>
            <p className="mode-desc">
              {currentMode === 'gemini'
                ? 'Your readings are powered by Google Gemini vision and language models.'
                : 'Using built-in reading templates. Add a Gemini API key below for AI-powered readings.'}
            </p>
          </motion.div>

          {/* API Key Section */}
          <motion.div
            className="settings-card glass-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="settings-card-header">
              <Key size={20} className="settings-icon" />
              <div>
                <h3>Gemini API Key</h3>
                <p>Connect to Google Gemini for AI-powered palm vision, tarot interpretation, and astrology readings.</p>
              </div>
            </div>

            <div className="api-key-input-wrap">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="api-key-input"
                id="api-key-input"
                autoComplete="off"
              />
              <button
                className="show-key-btn"
                onClick={() => setShowKey(!showKey)}
                type="button"
                aria-label={showKey ? 'Hide key' : 'Show key'}
              >
                {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="settings-actions">
              <button
                className={`btn ${saved ? 'btn-saved' : 'btn-primary'}`}
                onClick={handleSave}
                disabled={!apiKey.trim() || saved}
              >
                {saved ? <><Check size={16} /> Saved!</> : 'Save API Key'}
              </button>
              {localStorage.getItem('fortuna_api_key') && (
                <button className="btn btn-ghost danger-btn" onClick={handleClear}>
                  <Trash2 size={16} />
                  Remove Key
                </button>
              )}
            </div>

            <div className="api-info">
              <Info size={14} />
              <div>
                <p>Your API key is stored locally in your browser and never sent to any server other than Google's APIs.</p>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="get-key-link"
                >
                  Get a free Gemini API key →
                </a>
              </div>
            </div>
          </motion.div>

          {/* Features Comparison */}
          <motion.div
            className="features-compare glass-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3>Feature Comparison</h3>
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Demo Mode</th>
                  <th>With Gemini</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Palm Reading', 'Template-based', 'Real AI Vision Analysis'],
                  ['Tarot Interpretation', 'Rich templates', 'Contextual AI narrative'],
                  ['Astrology', 'Daily fortune generator', 'Real-time planetary AI'],
                  ['Question Context', '—', 'Personalized to your question'],
                  ['Image Analysis', '—', 'Real palm line detection'],
                ].map(([feat, demo, ai]) => (
                  <tr key={feat}>
                    <td>{feat}</td>
                    <td className="demo-col">
                      <span className="compare-badge local">{demo}</span>
                    </td>
                    <td className="ai-col">
                      <span className="compare-badge ai">{ai}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Production Deployment Note */}
          <motion.div
            className="deploy-card glass-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3>🚀 Production Deployment</h3>
            <p>When deploying to Vercel or Render, set the environment variable:</p>
            <div className="env-block">
              <code>VITE_GEMINI_API_KEY=your_api_key_here</code>
            </div>
            <p className="deploy-note">
              The app checks for this env variable first, then falls back to the locally-stored key.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
