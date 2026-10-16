import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle, Sparkles, RefreshCw, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { drawCards } from '../data/tarot';
import type { TarotCard } from '../data/tarot';
import { interpretTarotCards, getAIMode } from '../services/ai';
import type { TarotInterpretation } from '../services/ai';
import TarotCardDisplay from '../components/TarotCardDisplay';
import './Tarot.css';

type Spread = {
  id: string;
  name: string;
  count: number;
  description: string;
  positions?: string[];
  emoji: string;
};

const SPREADS: Spread[] = [
  {
    id: 'single', name: 'Single Card', count: 1, emoji: '🃏',
    description: 'One card for daily guidance or a focused question.',
    positions: ['Your Message'],
  },
  {
    id: 'three', name: 'Past · Present · Future', count: 3, emoji: '✨',
    description: 'A classic three-card spread revealing the arc of your situation.',
    positions: ['Past', 'Present', 'Future'],
  },
  {
    id: 'celtic', name: 'Celtic Cross', count: 6, emoji: '☩',
    description: 'A deeper six-card reading exploring the full landscape of your question.',
    positions: ['Situation', 'Challenge', 'Foundation', 'Recent Past', 'Possible Future', 'Outcome'],
  },
  {
    id: 'love', name: 'Love Spread', count: 5, emoji: '💞',
    description: 'Five cards dedicated to matters of the heart and connection.',
    positions: ['You', 'Your Partner / Potential', 'Dynamic', 'Hidden Feelings', 'Advice'],
  },
];

export default function Tarot() {
  const [selectedSpread, setSelectedSpread] = useState<Spread>(SPREADS[0]);
  const [question, setQuestion] = useState('');
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [interpretation, setInterpretation] = useState<TarotInterpretation | null>(null);
  const [loading, setLoading] = useState(false);
  const [shuffling, setShuffling] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const aiMode = getAIMode();

  const handleShuffle = async () => {
    setShuffling(true);
    setCards([]);
    setInterpretation(null);
    setError(null);
    await new Promise(r => setTimeout(r, 600));
    const drawn = drawCards(selectedSpread.count);
    setCards(drawn);
    setShuffling(false);
  };

  const handleInterpret = async () => {
    if (!cards.length) return;
    setLoading(true);
    setError(null);
    try {
      const result = await interpretTarotCards(
        cards.map(c => ({ name: c.name, upright: c.upright, keywords: c.keywords })),
        question || undefined
      );
      setInterpretation(result);
    } catch {
      setError('The reading could not be completed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setCards([]);
    setInterpretation(null);
    setQuestion('');
    setError(null);
    setExpandedCard(null);
  };

  return (
    <div className="tarot-page page-enter">
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ paddingTop: '60px' }}>
          <p className="eyebrow">The Sacred Deck</p>
          <h1 className="gradient-text">Tarot Reading</h1>
          <p>Shuffle the cosmic deck, draw your cards, and receive a deep reading of their combined wisdom. All 78 cards await.</p>
          {aiMode === 'local' && (
            <div className="mode-notice-tarot">
              <AlertCircle size={14} />
              Demo mode — add a Gemini API key in Settings for AI-powered interpretations
            </div>
          )}
        </div>

        {/* Spread Selection */}
        <section className="spread-section">
          <h2 className="spread-title">Choose Your Spread</h2>
          <div className="spread-grid">
            {SPREADS.map(spread => (
              <button
                key={spread.id}
                className={`spread-card ${selectedSpread.id === spread.id ? 'selected' : ''}`}
                onClick={() => { setSelectedSpread(spread); reset(); }}
              >
                <span className="spread-emoji">{spread.emoji}</span>
                <span className="spread-name">{spread.name}</span>
                <span className="spread-count">{spread.count} card{spread.count > 1 ? 's' : ''}</span>
                <p className="spread-desc">{spread.description}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Question Input */}
        <section className="question-section glass-card">
          <label htmlFor="tarot-question" className="question-label">
            <Sparkles size={16} />
            Your Question <span>(optional)</span>
          </label>
          <input
            id="tarot-question"
            type="text"
            className="question-input"
            placeholder="What guidance do you seek? Leave blank for a general reading..."
            value={question}
            onChange={e => setQuestion(e.target.value)}
            maxLength={200}
          />
        </section>

        {/* Shuffle Button */}
        <div className="shuffle-section">
          <motion.button
            className={`btn btn-primary shuffle-btn ${shuffling ? 'shuffling' : ''}`}
            onClick={handleShuffle}
            disabled={shuffling || loading}
            whileTap={{ scale: 0.96 }}
          >
            <Shuffle size={20} className={shuffling ? 'spin-icon' : ''} />
            {shuffling ? 'Shuffling the Deck...' : cards.length ? 'Reshuffle' : 'Shuffle & Draw'}
          </motion.button>

          {cards.length > 0 && !shuffling && (
            <motion.button
              className="btn btn-ghost"
              onClick={reset}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <RefreshCw size={16} />
              Start Over
            </motion.button>
          )}
        </div>

        {/* Shuffling Animation */}
        <AnimatePresence>
          {shuffling && (
            <motion.div
              className="shuffling-anim"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="deck-stack">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="deck-card-anim"
                    animate={{
                      rotateZ: [(i - 2) * 8, -(i - 2) * 8, (i - 2) * 8],
                      y: [0, -10, 0],
                    }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
                  >
                    <span>✦</span>
                  </motion.div>
                ))}
              </div>
              <p>The universe shuffles your destiny...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cards Display */}
        <AnimatePresence>
          {cards.length > 0 && !shuffling && (
            <motion.section
              className="cards-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="cards-section-title">
                <Sparkles size={20} />
                {selectedSpread.name}
              </h2>

              <div className={`cards-layout cards-${cards.length}`}>
                {cards.map((card, i) => (
                  <div key={card.id} className="card-slot">
                    <TarotCardDisplay
                      card={card}
                      index={i}
                      size={cards.length <= 3 ? 'lg' : 'md'}
                      positionLabel={selectedSpread.positions?.[i]}
                    />
                    <button
                      className="card-expand-btn"
                      onClick={() => setExpandedCard(expandedCard === card.id ? null : card.id)}
                    >
                      {expandedCard === card.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      {expandedCard === card.id ? 'Less' : 'Full Reading'}
                    </button>

                    <AnimatePresence>
                      {expandedCard === card.id && (
                        <motion.div
                          className="card-expanded glass-card"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <div className="expanded-section">
                            <h5>Upright Meaning</h5>
                            <p>{card.upright}</p>
                          </div>
                          <div className="expanded-section">
                            <h5>Reversed Meaning</h5>
                            <p>{card.reversed}</p>
                          </div>
                          <div className="expanded-section">
                            <h5>Symbolism</h5>
                            <p>{card.symbolism}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Interpret Button */}
              {!interpretation && (
                <div className="interpret-section">
                  <button
                    className="btn btn-gold interpret-btn"
                    onClick={handleInterpret}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                        Channeling the cards...
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        Interpret This Reading
                      </>
                    )}
                  </button>
                  <p className="interpret-hint">Receive a unified reading of all your cards together</p>
                </div>
              )}

              {error && (
                <div className="error-banner-tarot">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              {/* Interpretation Result */}
              <AnimatePresence>
                {interpretation && (
                  <motion.div
                    className="interpretation-section"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="divider" />
                    <h2 className="interp-title">
                      <span className="gradient-text">The Reading</span>
                    </h2>

                    <div className="interp-intro glass-card">
                      <p className="interp-intro-text">{interpretation.intro}</p>
                    </div>

                    <div className="interp-cards-grid">
                      {interpretation.cardReadings.map((cr, i) => (
                        <motion.div
                          key={cr.cardName}
                          className="interp-card glass-card"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <h4 className="interp-card-name">
                            <span className="interp-number">{i + 1}</span>
                            {cr.cardName}
                          </h4>
                          <p>{cr.interpretation}</p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="interp-synthesis glass-card">
                      <h4>✦ The Cards Together</h4>
                      <p>{interpretation.synthesis}</p>
                    </div>

                    <div className="interp-advice glass-card">
                      <h4>🌟 Guidance</h4>
                      <p className="advice-italic">"{interpretation.advice}"</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!cards.length && !shuffling && (
          <div className="tarot-empty">
            <div className="empty-cards">
              {['♠', '♣', '♥', '♦'].map((s, i) => (
                <div key={i} className={`empty-card ec-${i}`}>{s}</div>
              ))}
            </div>
            <p>The deck awaits your touch. Shuffle to begin your journey.</p>
          </div>
        )}
      </div>
    </div>
  );
}
