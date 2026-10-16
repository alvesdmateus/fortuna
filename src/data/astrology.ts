// Astrology data — zodiac signs, houses, planets

export interface ZodiacSign {
  id: string;
  name: string;
  symbol: string;
  emoji: string;
  element: 'fire' | 'earth' | 'air' | 'water';
  modality: 'cardinal' | 'fixed' | 'mutable';
  rulingPlanet: string;
  dates: string;
  traits: string[];
  strengths: string[];
  weaknesses: string[];
  color: string;
  gemstone: string;
  description: string;
}

export const ZODIAC_SIGNS: ZodiacSign[] = [
  {
    id: 'aries', name: 'Aries', symbol: '♈', emoji: '🐏', element: 'fire', modality: 'cardinal',
    rulingPlanet: 'Mars', dates: 'Mar 21 – Apr 19', color: '#ef4444', gemstone: 'Diamond',
    traits: ['Bold', 'Ambitious', 'Impulsive', 'Passionate', 'Courageous'],
    strengths: ['Leadership', 'Determination', 'Confidence', 'Enthusiasm'],
    weaknesses: ['Impatience', 'Aggression', 'Impulsiveness', 'Selfishness'],
    description: 'The first fire of the zodiac — Aries charges forward with unstoppable energy and primal courage.'
  },
  {
    id: 'taurus', name: 'Taurus', symbol: '♉', emoji: '🐂', element: 'earth', modality: 'fixed',
    rulingPlanet: 'Venus', dates: 'Apr 20 – May 20', color: '#84cc16', gemstone: 'Emerald',
    traits: ['Reliable', 'Patient', 'Practical', 'Devoted', 'Sensual'],
    strengths: ['Persistence', 'Loyalty', 'Stability', 'Sensibility'],
    weaknesses: ['Stubbornness', 'Possessiveness', 'Materialism', 'Inflexibility'],
    description: 'Taurus grounds cosmic energy into earthly beauty, finding sacred meaning in the material world.'
  },
  {
    id: 'gemini', name: 'Gemini', symbol: '♊', emoji: '👯', element: 'air', modality: 'mutable',
    rulingPlanet: 'Mercury', dates: 'May 21 – Jun 20', color: '#facc15', gemstone: 'Agate',
    traits: ['Adaptable', 'Outgoing', 'Curious', 'Witty', 'Communicative'],
    strengths: ['Versatility', 'Intelligence', 'Communication', 'Humor'],
    weaknesses: ['Inconsistency', 'Indecisiveness', 'Nervousness', 'Superficiality'],
    description: 'The cosmic twins dance between worlds — Gemini\'s quicksilver mind bridges all realms of thought.'
  },
  {
    id: 'cancer', name: 'Cancer', symbol: '♋', emoji: '🦀', element: 'water', modality: 'cardinal',
    rulingPlanet: 'Moon', dates: 'Jun 21 – Jul 22', color: '#e2e8f0', gemstone: 'Pearl',
    traits: ['Intuitive', 'Nurturing', 'Empathetic', 'Tenacious', 'Imaginative'],
    strengths: ['Emotional depth', 'Intuition', 'Loyalty', 'Creativity'],
    weaknesses: ['Moodiness', 'Pessimism', 'Clinginess', 'Insecurity'],
    description: 'Cancer flows with the tides of emotion, holding cosmic memory in their sacred inner ocean.'
  },
  {
    id: 'leo', name: 'Leo', symbol: '♌', emoji: '🦁', element: 'fire', modality: 'fixed',
    rulingPlanet: 'Sun', dates: 'Jul 23 – Aug 22', color: '#f97316', gemstone: 'Ruby',
    traits: ['Creative', 'Generous', 'Warm-hearted', 'Enthusiastic', 'Humorous'],
    strengths: ['Leadership', 'Charisma', 'Creativity', 'Generosity'],
    weaknesses: ['Arrogance', 'Stubbornness', 'Self-centeredness', 'Vanity'],
    description: 'Leo radiates the pure light of the Sun — a sovereign of heart whose warmth illuminates all around them.'
  },
  {
    id: 'virgo', name: 'Virgo', symbol: '♍', emoji: '🌾', element: 'earth', modality: 'mutable',
    rulingPlanet: 'Mercury', dates: 'Aug 23 – Sep 22', color: '#86efac', gemstone: 'Sapphire',
    traits: ['Analytical', 'Reliable', 'Practical', 'Meticulous', 'Diligent'],
    strengths: ['Attention to detail', 'Analysis', 'Service', 'Practicality'],
    weaknesses: ['Worry', 'Critical nature', 'Perfectionism', 'Over-thinking'],
    description: 'Virgo channels sacred discernment — the healer who sees the whole through the perfection of each part.'
  },
  {
    id: 'libra', name: 'Libra', symbol: '♎', emoji: '⚖️', element: 'air', modality: 'cardinal',
    rulingPlanet: 'Venus', dates: 'Sep 23 – Oct 22', color: '#f9a8d4', gemstone: 'Opal',
    traits: ['Diplomatic', 'Fair', 'Social', 'Idealistic', 'Gracious'],
    strengths: ['Balance', 'Diplomacy', 'Charm', 'Aesthetic sense'],
    weaknesses: ['Indecisiveness', 'Avoidance', 'Self-pity', 'Unreliability'],
    description: 'Libra weighs the cosmic scales — the artist of the zodiac who breathes beauty into every imbalance.'
  },
  {
    id: 'scorpio', name: 'Scorpio', symbol: '♏', emoji: '🦂', element: 'water', modality: 'fixed',
    rulingPlanet: 'Pluto', dates: 'Oct 23 – Nov 21', color: '#7c3aed', gemstone: 'Topaz',
    traits: ['Resourceful', 'Determined', 'Intuitive', 'Intense', 'Powerful'],
    strengths: ['Passion', 'Transformation', 'Loyalty', 'Resourcefulness'],
    weaknesses: ['Jealousy', 'Manipulation', 'Distrust', 'Vindictiveness'],
    description: 'Scorpio descends into the underworld and returns transformed — the phoenix of the zodiac, reborn.'
  },
  {
    id: 'sagittarius', name: 'Sagittarius', symbol: '♐', emoji: '🏹', element: 'fire', modality: 'mutable',
    rulingPlanet: 'Jupiter', dates: 'Nov 22 – Dec 21', color: '#fb923c', gemstone: 'Turquoise',
    traits: ['Optimistic', 'Adventurous', 'Philosophical', 'Honest', 'Free-spirited'],
    strengths: ['Adventure', 'Optimism', 'Wisdom', 'Generosity'],
    weaknesses: ['Carelessness', 'Overconfidence', 'Bluntness', 'Restlessness'],
    description: 'Sagittarius aims the arrow of truth toward the infinite horizon — the cosmic wanderer and truth seeker.'
  },
  {
    id: 'capricorn', name: 'Capricorn', symbol: '♑', emoji: '🐐', element: 'earth', modality: 'cardinal',
    rulingPlanet: 'Saturn', dates: 'Dec 22 – Jan 19', color: '#64748b', gemstone: 'Garnet',
    traits: ['Disciplined', 'Ambitious', 'Responsible', 'Persistent', 'Practical'],
    strengths: ['Discipline', 'Management', 'Ambition', 'Responsibility'],
    weaknesses: ['Know-it-all attitude', 'Unforgiving', 'Condescension', 'Pessimism'],
    description: 'Capricorn climbs the sacred mountain with patient determination — mastery earned through devoted effort.'
  },
  {
    id: 'aquarius', name: 'Aquarius', symbol: '♒', emoji: '🏺', element: 'air', modality: 'fixed',
    rulingPlanet: 'Uranus', dates: 'Jan 20 – Feb 18', color: '#38bdf8', gemstone: 'Amethyst',
    traits: ['Progressive', 'Original', 'Independent', 'Humanitarian', 'Intellectual'],
    strengths: ['Originality', 'Humanitarianism', 'Innovation', 'Vision'],
    weaknesses: ['Aloofness', 'Stubbornness', 'Detachment', 'Extremism'],
    description: 'Aquarius pours the waters of cosmic consciousness into the world — the visionary awakening humanity.'
  },
  {
    id: 'pisces', name: 'Pisces', symbol: '♓', emoji: '🐟', element: 'water', modality: 'mutable',
    rulingPlanet: 'Neptune', dates: 'Feb 19 – Mar 20', color: '#818cf8', gemstone: 'Aquamarine',
    traits: ['Compassionate', 'Intuitive', 'Artistic', 'Wise', 'Mystical'],
    strengths: ['Compassion', 'Intuition', 'Art', 'Psychic sensitivity'],
    weaknesses: ['Fear', 'Overly trusting', 'Escapism', 'Desire to disappear'],
    description: 'Pisces dissolves the boundary between worlds — the dreamer who swims in the ocean of universal love.'
  },
];

export type DailyFortune = {
  overall: string;
  love: string;
  career: string;
  health: string;
  luckyNumber: number;
  luckyColor: string;
  advice: string;
  energy: 'high' | 'medium' | 'low';
  moonPhase: string;
};

// Deterministic daily fortune based on sign + date
export function getDailyFortune(signId: string, dateStr: string): DailyFortune {
  const sign = ZODIAC_SIGNS.find(s => s.id === signId)!;
  // Simple hash for deterministic but varied output
  const seed = [...signId, ...dateStr].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const pick = <T,>(arr: T[]) => arr[(seed) % arr.length];
  const pick2 = <T,>(arr: T[]) => arr[(seed * 7 + 3) % arr.length];
  const pick3 = <T,>(arr: T[]) => arr[(seed * 13 + 5) % arr.length];

  const overalls = [
    `The stars align magnificently for ${sign.name} today. Your ruling planet ${sign.rulingPlanet} amplifies your natural gifts — move forward with confidence. The universe whispers approval of your chosen path.`,
    `A day of quiet power for ${sign.name}. The cosmic tides work beneath the surface, preparing a significant shift. Trust the invisible forces at work in your favor.`,
    `${sign.name} stands at a crossroads today, illuminated by celestial light. What feels uncertain is actually the threshold of transformation. Step through with courage.`,
    `${sign.rulingPlanet} sends favorable vibrations to ${sign.name} today. Creative solutions emerge easily, and connections made now carry lasting significance.`,
    `A day of integration for ${sign.name} — weave together what you know and what you feel. The element of ${sign.element} supports your journey with elemental wisdom.`,
  ];

  const loves = [
    'Venus casts a warm glow on your romantic life. A meaningful conversation deepens an important bond. Single? Someone new enters your orbit with beautiful timing.',
    'Emotional authenticity is your superpower in love today. Share what lives in your heart — vulnerability creates the intimacy you crave.',
    'Old patterns in love are ready to dissolve. A relationship reaches a new level of understanding. Single souls may encounter a significant meeting.',
    'Love requires your full presence today. Put down distractions and truly see the ones who matter most. Small gestures carry enormous meaning.',
    'A playful energy lightens the romantic realm. Laughter and lightness strengthen your bond. Let love be joyful, uncomplicated, and free.',
  ];

  const careers = [
    'Your professional instincts are sharp today. Trust your first response in important meetings — your intuition leads to the right decision.',
    'Collaboration amplifies your productivity. Reach out to a colleague whose perspective complements yours. Together you solve what neither could alone.',
    'A project or idea you have been developing is ready to move forward. The timing for bold professional moves is favorable — act now.',
    'Focus on the details today. Precision and thoroughness impress the right people. Your careful work is noticed and rewarded.',
    'New opportunities arrive unexpectedly in your professional sphere. Stay open to conversations that seem tangential — they lead somewhere remarkable.',
  ];

  const healths = [
    'Your body speaks through subtle signals today. Honor its wisdom by resting more than you think necessary. Restoration is productive work.',
    'Physical movement transforms emotional energy. Even a brief walk in nature realigns your entire system — body, mind, and spirit.',
    'Hydration and nourishment deserve extra attention today. Treat your body as the sacred vessel it is — what you put in determines what you put out.',
    'Stress held in the body seeks release. Breathwork, stretching, or meditation dissolves tension you may not know you are carrying.',
    'A vibrant energy animates your physical form today. Use this vital force for activities that also nourish your soul.',
  ];

  const advices = [
    `Trust the quiet knowing that lives beneath the noise. Your ${sign.element} nature holds ancient wisdom — let it guide you beyond logic.`,
    `Release the need to control every outcome. The universe is conspiring in your favor in ways your mind cannot yet see.`,
    `Your sensitivity is not a weakness — it is your greatest gift. Let it guide you toward what truly aligns with your highest path.`,
    `Begin. The perfect moment is always now. ${sign.rulingPlanet} supports decisive action taken from a place of inner alignment.`,
    `Boundaries are sacred — honor yours today. What you protect creates space for what truly matters to flourish and grow.`,
  ];

  const moonPhases = ['🌑 New Moon', '🌒 Waxing Crescent', '🌓 First Quarter', '🌔 Waxing Gibbous', '🌕 Full Moon', '🌖 Waning Gibbous', '🌗 Last Quarter', '🌘 Waning Crescent'];
  const energies: DailyFortune['energy'][] = ['high', 'high', 'medium', 'medium', 'medium', 'low'];
  const colors = ['Violet', 'Indigo', 'Gold', 'Rose', 'Teal', 'Pearl', 'Amber', 'Silver', 'Emerald', 'Sapphire'];

  return {
    overall: pick(overalls),
    love: pick2(loves),
    career: pick3(careers),
    health: pick(healths),
    luckyNumber: (seed % 9) + 1,
    luckyColor: pick2(colors),
    advice: pick3(advices),
    energy: pick(energies),
    moonPhase: pick(moonPhases),
  };
}

export function getZodiacByDate(month: number, day: number): ZodiacSign | null {
  const ranges = [
    { id: 'capricorn', start: [12, 22], end: [12, 31] },
    { id: 'capricorn', start: [1, 1], end: [1, 19] },
    { id: 'aquarius', start: [1, 20], end: [2, 18] },
    { id: 'pisces', start: [2, 19], end: [3, 20] },
    { id: 'aries', start: [3, 21], end: [4, 19] },
    { id: 'taurus', start: [4, 20], end: [5, 20] },
    { id: 'gemini', start: [5, 21], end: [6, 20] },
    { id: 'cancer', start: [6, 21], end: [7, 22] },
    { id: 'leo', start: [7, 23], end: [8, 22] },
    { id: 'virgo', start: [8, 23], end: [9, 22] },
    { id: 'libra', start: [9, 23], end: [10, 22] },
    { id: 'scorpio', start: [10, 23], end: [11, 21] },
    { id: 'sagittarius', start: [11, 22], end: [12, 21] },
  ];

  for (const r of ranges) {
    const [sm, sd] = r.start;
    const [em, ed] = r.end;
    if ((month === sm && day >= sd) || (month === em && day <= ed)) {
      return ZODIAC_SIGNS.find(s => s.id === r.id) || null;
    }
  }
  return null;
}
