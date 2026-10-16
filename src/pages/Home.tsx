import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Hand, Star, ArrowRight, Moon } from 'lucide-react';
import './Home.css';

const features = [
  {
    icon: <Hand size={28} />,
    emoji: '🖐️',
    title: 'Palm Reading',
    description: 'Upload a photo of your palm and receive a mystical reading of your life, heart, head, and fate lines through AI vision.',
    to: '/palm',
    color: '#a855f7',
    badge: 'AI Vision',
  },
  {
    icon: <Sparkles size={28} />,
    emoji: '🃏',
    title: 'Tarot Reading',
    description: 'Shuffle the cosmic deck, draw your cards, and receive a deep, personalized interpretation of their combined message.',
    to: '/tarot',
    color: '#f59e0b',
    badge: 'Full 78-Card Deck',
  },
  {
    icon: <Star size={28} />,
    emoji: '⭐',
    title: 'Astrology',
    description: 'Discover your zodiac sign\'s daily fortune, personality insights, and cosmic guidance aligned with the stars.',
    to: '/astrology',
    color: '#06b6d4',
    badge: 'Daily Forecast',
  },
];

const testimonials = [
  { text: 'The tarot readings feel uncannily accurate. I come back every morning before making important decisions.', name: 'Luna M.', sign: '♓ Pisces' },
  { text: 'The palm reading absolutely floored me. It described my personality and life path better than I could myself.', name: 'Rafael K.', sign: '♏ Scorpio' },
  { text: 'My daily horoscope from Fortuna is the first thing I read. The insights always feel relevant and personal.', name: 'Amara J.', sign: '♌ Leo' },
];

export default function Home() {
  return (
    <div className="home page-enter">
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="hero-badge">
              <Moon size={14} />
              The Mystic Oracle
            </div>

            <h1 className="hero-title">
              Read Your
              <br />
              <span className="gradient-text">Destiny</span>
            </h1>

            <p className="hero-subtitle">
              Ancient wisdom meets modern intelligence. Explore tarot, palm reading,
              and astrology — personalized readings crafted by AI and cosmic insight.
            </p>

            <div className="hero-actions">
              <Link to="/tarot" className="btn btn-primary btn-lg">
                <Sparkles size={18} />
                Begin Your Reading
              </Link>
              <Link to="/astrology" className="btn btn-ghost btn-lg">
                <Star size={18} />
                View Your Stars
              </Link>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">78</span>
                <span className="stat-label">Tarot Cards</span>
              </div>
              <div className="stat-divider" />
              <div className="stat">
                <span className="stat-number">12</span>
                <span className="stat-label">Zodiac Signs</span>
              </div>
              <div className="stat-divider" />
              <div className="stat">
                <span className="stat-number">∞</span>
                <span className="stat-label">Possibilities</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="hero-orb"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="orb-outer">
              <div className="orb-middle">
                <div className="orb-inner">
                  <span className="orb-symbol">✦</span>
                </div>
              </div>
            </div>
            <div className="orb-ring ring-1" />
            <div className="orb-ring ring-2" />
            <div className="orb-ring ring-3" />
            <div className="orb-planets">
              {['♈', '♎', '♓', '♊'].map((s, i) => (
                <div key={i} className={`orb-planet planet-${i}`}>{s}</div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">What We Offer</p>
            <h2>Three Paths to <span className="gradient-text">Inner Truth</span></h2>
            <p>Each reading is a unique journey into self-discovery. Choose the path that calls to you.</p>
          </div>

          <div className="features-grid">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
              >
                <Link to={feat.to} className="feature-card glass-card">
                  <div className="feature-icon" style={{ '--feat-color': feat.color } as React.CSSProperties}>
                    <span className="feat-emoji">{feat.emoji}</span>
                  </div>
                  <div className="feature-badge" style={{ color: feat.color, borderColor: `${feat.color}33`, backgroundColor: `${feat.color}15` }}>
                    {feat.badge}
                  </div>
                  <h3 className="feature-title">{feat.title}</h3>
                  <p className="feature-desc">{feat.description}</p>
                  <div className="feature-cta" style={{ color: feat.color }}>
                    Explore <ArrowRight size={14} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Seekers Speak</p>
            <h2>What the Stars <span className="gradient-text">Revealed</span></h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                className="testimonial-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <span className="author-name">{t.name}</span>
                  <span className="author-sign">{t.sign}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-card glass-card"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="cta-star">✦</span>
            <h2>The cosmos awaits your question</h2>
            <p>Every reading is a conversation with the universe. What do you seek to understand?</p>
            <div className="cta-actions">
              <Link to="/tarot" className="btn btn-gold">
                <Sparkles size={16} />
                Draw Your Cards
              </Link>
              <Link to="/palm" className="btn btn-outline">
                <Hand size={16} />
                Read My Palm
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
