import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Zap, ChevronDown, Heart, Briefcase, Activity, Lightbulb } from 'lucide-react';
import { ZODIAC_SIGNS, getDailyFortune } from '../data/astrology';
import type { ZodiacSign } from '../data/astrology';
import { getAstrologicalReading } from '../services/ai';
import './Astrology.css';

const ELEMENTS = {
  fire: { emoji: '🔥', color: '#f97316' },
  earth: { emoji: '🌿', color: '#84cc16' },
  air: { emoji: '💨', color: '#38bdf8' },
  water: { emoji: '💧', color: '#818cf8' },
};

const ENERGY_COLORS = {
  high: { color: '#22c55e', label: 'High Energy', bar: 90 },
  medium: { color: '#f59e0b', label: 'Balanced', bar: 55 },
  low: { color: '#818cf8', label: 'Introspective', bar: 25 },
};

export default function Astrology() {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);
  const [aiReading, setAiReading] = useState<string>('');
  const [loadingAI, setLoadingAI] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const fortune = selectedSign ? getDailyFortune(selectedSign.id, today) : null;
  const element = selectedSign ? ELEMENTS[selectedSign.element] : null;
  const energy = fortune ? ENERGY_COLORS[fortune.energy] : null;

  useEffect(() => {
    if (!selectedSign) return;
    setAiReading('');

    const fetchReading = async () => {
      setLoadingAI(true);
      try {
        const reading = await getAstrologicalReading(
          selectedSign.name,
          selectedSign.description,
          selectedSign.rulingPlanet,
          selectedSign.element
        );
        if (reading) setAiReading(reading);
      } catch {
        // fail silently, we use local fortune
      } finally {
        setLoadingAI(false);
      }
    };

    fetchReading();
  }, [selectedSign]);

  const displayedSigns = showAll ? ZODIAC_SIGNS : ZODIAC_SIGNS.slice(0, 12);

  return (
    <div className="astro-page page-enter">
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ paddingTop: '60px' }}>
          <p className="eyebrow">The Celestial Map</p>
          <h1 className="gradient-text-teal">Astrology</h1>
          <p>Discover your sign's wisdom, receive your daily cosmic forecast, and align with the universe's guidance.</p>
        </div>

        <div className="astro-layout">
          {/* Signs Grid */}
          <aside className="signs-panel">
            <h3 className="panel-title">Select Your Sign</h3>
            <div className="signs-grid">
              {ZODIAC_SIGNS.map((sign) => (
                <button
                  key={sign.id}
                  className={`sign-btn ${selectedSign?.id === sign.id ? 'selected' : ''}`}
                  onClick={() => setSelectedSign(sign)}
                  style={{ '--sign-color': sign.color } as React.CSSProperties}
                  title={sign.name}
                >
                  <span className="sign-symbol">{sign.symbol}</span>
                  <span className="sign-name-sm">{sign.name.slice(0, 3)}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <main className="astro-content">
            <AnimatePresence mode="wait">
              {!selectedSign ? (
                <motion.div
                  key="empty"
                  className="astro-empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="zodiac-wheel">
                    {ZODIAC_SIGNS.map((s, i) => (
                      <span
                        key={s.id}
                        className="wheel-symbol"
                        style={{
                          transform: `rotate(${i * 30}deg) translateY(-80px) rotate(${-i * 30}deg)`,
                          color: s.color,
                        }}
                      >
                        {s.symbol}
                      </span>
                    ))}
                  </div>
                  <h3>Choose your sign</h3>
                  <p>Select your zodiac sign to receive today's cosmic guidance, daily fortune, and personalized insights.</p>
                </motion.div>
              ) : (
                <motion.div
                  key={selectedSign.id}
                  className="sign-reading"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Sign Hero */}
                  <div
                    className="sign-hero glass-card"
                    style={{ '--sign-color': selectedSign.color } as React.CSSProperties}
                  >
                    <div className="sign-hero-left">
                      <div className="sign-big-symbol" style={{ color: selectedSign.color }}>
                        {selectedSign.symbol}
                      </div>
                      <div>
                        <p className="eyebrow" style={{ color: selectedSign.color }}>
                          {element?.emoji} {selectedSign.element} · {selectedSign.modality}
                        </p>
                        <h2 className="sign-hero-name">{selectedSign.name}</h2>
                        <p className="sign-dates">
                          <Star size={12} /> {selectedSign.dates}
                        </p>
                        <p className="sign-planet">
                          <Zap size={12} /> Ruled by {selectedSign.rulingPlanet}
                        </p>
                      </div>
                    </div>
                    <div className="sign-hero-right">
                      <p className="sign-description">{selectedSign.description}</p>
                      <div className="sign-traits">
                        {selectedSign.traits.map(t => (
                          <span key={t} className="trait-pill" style={{ borderColor: `${selectedSign.color}33`, color: selectedSign.color, background: `${selectedSign.color}12` }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Daily Fortune */}
                  {fortune && (
                    <>
                      <div className="fortune-header">
                        <h3>Today's Reading</h3>
                        <span className="fortune-date">
                          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </span>
                      </div>

                      <div className="fortune-overview glass-card">
                        <div className="fortune-meta">
                          <span className="moon-phase">{fortune.moonPhase}</span>
                          <div className="energy-meter">
                            <span className="energy-label">Energy</span>
                            <div className="energy-bar-track">
                              <motion.div
                                className="energy-bar-fill"
                                style={{ background: energy?.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${energy?.bar}%` }}
                                transition={{ duration: 1, delay: 0.3 }}
                              />
                            </div>
                            <span className="energy-text" style={{ color: energy?.color }}>
                              {energy?.label}
                            </span>
                          </div>
                        </div>

                        <p className="fortune-overall">
                          {aiReading || fortune.overall}
                          {loadingAI && <span className="ai-loading">...</span>}
                        </p>

                        <div className="lucky-row">
                          <div className="lucky-item">
                            <span className="lucky-label">Lucky Number</span>
                            <span className="lucky-value" style={{ color: selectedSign.color }}>
                              {fortune.luckyNumber}
                            </span>
                          </div>
                          <div className="lucky-item">
                            <span className="lucky-label">Lucky Color</span>
                            <span className="lucky-value" style={{ color: selectedSign.color }}>
                              {fortune.luckyColor}
                            </span>
                          </div>
                          <div className="lucky-item">
                            <span className="lucky-label">Gemstone</span>
                            <span className="lucky-value" style={{ color: selectedSign.color }}>
                              {selectedSign.gemstone}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Domains */}
                      <div className="domains-grid">
                        <div className="domain-card glass-card">
                          <div className="domain-icon" style={{ color: '#f43f5e' }}>
                            <Heart size={18} />
                          </div>
                          <h4>Love</h4>
                          <p>{fortune.love}</p>
                        </div>
                        <div className="domain-card glass-card">
                          <div className="domain-icon" style={{ color: '#f59e0b' }}>
                            <Briefcase size={18} />
                          </div>
                          <h4>Career</h4>
                          <p>{fortune.career}</p>
                        </div>
                        <div className="domain-card glass-card">
                          <div className="domain-icon" style={{ color: '#22c55e' }}>
                            <Activity size={18} />
                          </div>
                          <h4>Health</h4>
                          <p>{fortune.health}</p>
                        </div>
                      </div>

                      {/* Advice */}
                      <div className="advice-banner glass-card">
                        <div className="advice-icon">
                          <Lightbulb size={20} style={{ color: selectedSign.color }} />
                        </div>
                        <div>
                          <h4>Cosmic Advice</h4>
                          <p className="advice-body">"{fortune.advice}"</p>
                        </div>
                      </div>

                      {/* Strengths / Weaknesses */}
                      <div className="sw-grid">
                        <div className="sw-card glass-card">
                          <h4>✨ Strengths</h4>
                          <ul>
                            {selectedSign.strengths.map(s => (
                              <li key={s}>{s}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="sw-card glass-card">
                          <h4>⚡ Challenges</h4>
                          <ul>
                            {selectedSign.weaknesses.map(w => (
                              <li key={w}>{w}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>

        {/* All Signs Reference */}
        <section className="all-signs-section">
          <div className="section-header">
            <p className="eyebrow">The Zodiac</p>
            <h2>All <span className="gradient-text-teal">Twelve Signs</span></h2>
          </div>
          <div className="all-signs-grid">
            {displayedSigns.map((sign, i) => (
              <motion.button
                key={sign.id}
                className="all-sign-card glass-card"
                onClick={() => {
                  setSelectedSign(sign);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                style={{ '--sign-color': sign.color } as React.CSSProperties}
              >
                <span className="all-sign-symbol" style={{ color: sign.color }}>{sign.symbol}</span>
                <span className="all-sign-emoji">{sign.emoji}</span>
                <h4 style={{ color: sign.color }}>{sign.name}</h4>
                <span className="all-sign-dates">{sign.dates}</span>
                <div className="all-sign-element">
                  {ELEMENTS[sign.element].emoji} {sign.element}
                </div>
              </motion.button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
