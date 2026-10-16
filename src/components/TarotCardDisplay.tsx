import { motion } from 'framer-motion';
import type { TarotCard } from '../data/tarot';
import './TarotCardDisplay.css';

interface Props {
  card: TarotCard;
  index?: number;
  size?: 'sm' | 'md' | 'lg';
  isRevealed?: boolean;
  onClick?: () => void;
  positionLabel?: string;
}

const SUIT_COLORS: Record<string, string> = {
  wands: '#f97316',
  cups: '#38bdf8',
  swords: '#94a3b8',
  pentacles: '#84cc16',
};

const MAJOR_GRADIENT = 'linear-gradient(160deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)';

export default function TarotCardDisplay({ card, index = 0, size = 'md', isRevealed = true, onClick, positionLabel }: Props) {
  const suitColor = card.suit ? SUIT_COLORS[card.suit] : null;
  const borderColor = suitColor || '#a855f7';

  return (
    <motion.div
      className={`tarot-card-wrapper ${size}`}
      initial={{ opacity: 0, y: 30, rotateY: isRevealed ? 0 : 180 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {positionLabel && (
        <div className="position-label">{positionLabel}</div>
      )}
      <div
        className="tarot-card"
        style={{ '--border-color': borderColor } as React.CSSProperties}
      >
        {/* Card back (hidden state) */}
        {!isRevealed && (
          <div className="card-back">
            <div className="card-back-pattern">✦</div>
          </div>
        )}

        {/* Card front */}
        <div className="card-front">
          <div
            className="card-header"
            style={{
              background: card.arcana === 'major'
                ? MAJOR_GRADIENT
                : `linear-gradient(160deg, ${suitColor}33 0%, ${suitColor}11 100%)`,
            }}
          >
            <span className="card-number">
              {card.arcana === 'major' ? card.number : ''}
            </span>
            <span className="card-emoji">{card.emoji}</span>
            {card.arcana === 'major' && (
              <span className="major-badge">Major</span>
            )}
          </div>

          <div className="card-body">
            <h3 className="card-name">{card.name}</h3>
            <div className="card-keywords">
              {card.keywords.slice(0, 3).map(kw => (
                <span key={kw} className="keyword-pill">{kw}</span>
              ))}
            </div>
            {size !== 'sm' && (
              <p className="card-upright">{card.upright.slice(0, 120)}...</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
