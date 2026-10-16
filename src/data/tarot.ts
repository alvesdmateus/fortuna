// Tarot deck data — 78 cards (22 Major + 56 Minor Arcana)

export interface TarotCard {
  id: string;
  name: string;
  arcana: 'major' | 'minor';
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
  number: number;
  keywords: string[];
  upright: string;
  reversed: string;
  symbolism: string;
  emoji: string;
}

export const MAJOR_ARCANA: TarotCard[] = [
  { id: 'fool', name: 'The Fool', arcana: 'major', number: 0, emoji: '🌟', keywords: ['beginnings', 'innocence', 'adventure', 'freedom'], upright: 'New beginnings, innocence, spontaneity, a free spirit. You stand at the precipice of an exciting new journey, full of optimism and wonder. Trust the universe.', reversed: 'Naivety, foolishness, recklessness, risk-taking without consideration. Pause and reconsider before leaping forward.', symbolism: 'The white rose represents purity of spirit, the cliff edge marks the threshold between known and unknown.' },
  { id: 'magician', name: 'The Magician', arcana: 'major', number: 1, emoji: '⚡', keywords: ['manifestation', 'power', 'skill', 'willpower'], upright: 'You have all the tools needed to manifest your desires. Skill, willpower, and resourcefulness are at your command. The universe conspires in your favor.', reversed: 'Manipulation, poor planning, untapped talents. You may be using your gifts deceptively or not at all.', symbolism: 'The infinity symbol above represents limitless potential; the four tools embody earth, air, fire, and water.' },
  { id: 'high-priestess', name: 'The High Priestess', arcana: 'major', number: 2, emoji: '🌙', keywords: ['intuition', 'mystery', 'inner knowing', 'subconscious'], upright: 'Trust your intuition. Hidden knowledge, a time for stillness and reflection. The answer you seek lies within — listen to your inner voice.', reversed: 'Secrets, hidden agendas, disconnection from intuition. You may be ignoring your inner wisdom.', symbolism: 'The crescent moon at her feet symbolizes the subconscious; she sits between pillars of light and dark.' },
  { id: 'empress', name: 'The Empress', arcana: 'major', number: 3, emoji: '🌿', keywords: ['fertility', 'abundance', 'nature', 'nurturing'], upright: 'Abundance, fertility, creativity, and sensual pleasure. A period of growth and nurturing is upon you. Nature and beauty surround your path.', reversed: 'Creative block, dependence on others, smothering energy. Reconnect with nature and your own creative spark.', symbolism: 'Her crown of 12 stars represents the zodiac; the wheat at her feet symbolizes earthy abundance.' },
  { id: 'emperor', name: 'The Emperor', arcana: 'major', number: 4, emoji: '👑', keywords: ['authority', 'structure', 'stability', 'fatherhood'], upright: 'Authority, structure, and solid foundations. You are called to take charge and establish order. Stability and security are your rewards.', reversed: 'Domination, rigidity, excessive control, inflexibility. Release the need to control every outcome.', symbolism: 'The ram heads on his throne represent Aries energy — ambition and drive to conquer.' },
  { id: 'hierophant', name: 'The Hierophant', arcana: 'major', number: 5, emoji: '⛪', keywords: ['tradition', 'spirituality', 'institutions', 'conformity'], upright: 'Tradition, spiritual guidance, conformity to established ways. Seek wisdom from a trusted mentor or established institution.', reversed: 'Challenging convention, personal beliefs over tradition, rebellion. Break free from outdated systems.', symbolism: 'His triple crown represents three realms; the two keys at his feet unlock the subconscious.' },
  { id: 'lovers', name: 'The Lovers', arcana: 'major', number: 6, emoji: '💞', keywords: ['love', 'choice', 'alignment', 'union'], upright: 'Love, harmony, relationships, and value alignment. A significant choice must be made — follow your heart. Union of opposites creates wholeness.', reversed: 'Disharmony, imbalance, misalignment of values. A relationship or choice is causing inner conflict.', symbolism: 'The angel above represents divine blessing; the tree of knowledge reminds us choices carry consequences.' },
  { id: 'chariot', name: 'The Chariot', arcana: 'major', number: 7, emoji: '🏆', keywords: ['victory', 'control', 'determination', 'success'], upright: 'Victory through determination and willpower. You are taking control and moving forward with confidence. Success is within reach — keep pushing.', reversed: 'Lack of direction, aggression, obstacles. The forces around you feel uncontrollable. Reclaim your inner compass.', symbolism: 'Two sphinxes of opposing colors represent the dual forces you must master to move forward.' },
  { id: 'strength', name: 'Strength', arcana: 'major', number: 8, emoji: '🦁', keywords: ['courage', 'patience', 'inner strength', 'compassion'], upright: 'Inner strength, courage, and compassion. You tame wild forces not through force, but through love and patience. Your true power is quiet yet immense.', reversed: 'Self-doubt, weakness, cowardice, insecurity. Reconnect with your inner lion — the courage is still there.', symbolism: 'The infinity symbol mirrors The Magician — mastery achieved through spiritual rather than material means.' },
  { id: 'hermit', name: 'The Hermit', arcana: 'major', number: 9, emoji: '🕯️', keywords: ['introspection', 'solitude', 'guidance', 'wisdom'], upright: 'Soul searching, introspection, and inner guidance. A period of solitude leads to profound wisdom. Your inner light guides the way.', reversed: 'Isolation, loneliness, withdrawal. Excessive solitude is becoming unhealthy — it is time to re-emerge.', symbolism: 'His lantern holds a six-pointed star — the light of Hermetic wisdom to guide seekers in darkness.' },
  { id: 'wheel', name: 'Wheel of Fortune', arcana: 'major', number: 10, emoji: '☸️', keywords: ['luck', 'cycles', 'destiny', 'turning point'], upright: 'Good luck, karma, life cycles, destiny, a turning point. The wheel turns in your favor. Embrace the flow of change — fortune favors you now.', reversed: 'Bad luck, resistance to change, breaking cycles. You may be fighting against the natural flow of life.', symbolism: 'The four fixed signs guard the corners of fate; the wheel itself never stops turning.' },
  { id: 'justice', name: 'Justice', arcana: 'major', number: 11, emoji: '⚖️', keywords: ['fairness', 'truth', 'cause and effect', 'law'], upright: 'Fairness, truth, cause and effect, law. Your actions have consequences — balance will be restored. The truth shall set you free.', reversed: 'Unfairness, lack of accountability, dishonesty. You may be avoiding responsibility for your actions.', symbolism: 'The sword of truth cuts through illusion; the scales weigh the soul against a feather.' },
  { id: 'hanged-man', name: 'The Hanged Man', arcana: 'major', number: 12, emoji: '🙃', keywords: ['suspension', 'surrender', 'new perspective', 'sacrifice'], upright: 'Pause, surrender, letting go, new perspectives. Willing sacrifice opens unexpected doors. See things from a different angle — enlightenment awaits.', reversed: 'Delays, resistance, stalling, indecision. You are caught in limbo, refusing to make a necessary sacrifice.', symbolism: 'His calm expression suggests this suspension is chosen — a voluntary pause for wisdom.' },
  { id: 'death', name: 'Death', arcana: 'major', number: 13, emoji: '🦋', keywords: ['endings', 'transformation', 'transition', 'letting go'], upright: 'Endings, transformation, transition, and letting go. A chapter closes so a new one may begin. Death here means rebirth — transformation is at hand.', reversed: 'Resistance to change, stagnation, decay. You cling to what has already ended. Release the old to welcome the new.', symbolism: 'The white rose symbolizes purity; the black flag marks the end of one cycle and the dawn of another.' },
  { id: 'temperance', name: 'Temperance', arcana: 'major', number: 14, emoji: '🌊', keywords: ['balance', 'moderation', 'patience', 'purpose'], upright: 'Balance, moderation, patience, and purpose. Flow between extremes with grace. The middle path leads to healing and wholeness.', reversed: 'Imbalance, excess, self-healing, realignment needed. You have strayed from the middle path — restore harmony.', symbolism: 'Water flows between cups — an eternal cycle of giving and receiving, balance made visible.' },
  { id: 'devil', name: 'The Devil', arcana: 'major', number: 15, emoji: '⛓️', keywords: ['bondage', 'materialism', 'shadow self', 'addiction'], upright: 'Bondage, addiction, materialism, and shadow self. Examine what holds you captive — the chains may be of your own making. Face your shadow.', reversed: 'Liberation, releasing limiting beliefs, exploration of dark side. You are breaking free from what once enslaved you.', symbolism: 'The chains on the figures are loose — they could free themselves. The bondage is largely self-imposed.' },
  { id: 'tower', name: 'The Tower', arcana: 'major', number: 16, emoji: '⚡', keywords: ['upheaval', 'chaos', 'revelation', 'awakening'], upright: 'Sudden change, upheaval, chaos, revelation, awakening. Lightning strikes the tower of false constructs. What crumbles was never built to last — this is liberation.', reversed: 'Personal transformation, fear of change, averting disaster. You resist necessary upheaval — the tremors warn you.', symbolism: 'The crown flies off the tower — ego\'s false throne topples, making way for authentic existence.' },
  { id: 'star', name: 'The Star', arcana: 'major', number: 17, emoji: '⭐', keywords: ['hope', 'faith', 'renewal', 'serenity'], upright: 'Hope, faith, purpose, renewal, and spirituality. After the storm comes the calm. Stars guide you home — trust in the universe\'s benevolent plan.', reversed: 'Lack of faith, despair, self-trust issues, disconnection. The stars still shine even when clouds obscure them.', symbolism: 'Eight stars mirror the eight-pointed star of Venus — love and hope guide the cosmos.' },
  { id: 'moon', name: 'The Moon', arcana: 'major', number: 18, emoji: '🌑', keywords: ['illusion', 'fear', 'subconscious', 'intuition'], upright: 'Illusion, fear, the unconscious, and intuition. Things are not what they seem. Navigate by inner light through uncertain waters — your intuition is your compass.', reversed: 'Release of fear, repressed emotion, inner confusion, clarity returns. The fog begins to lift — truth emerges.', symbolism: 'The path between towers represents the difficult journey through the unconscious realm.' },
  { id: 'sun', name: 'The Sun', arcana: 'major', number: 19, emoji: '☀️', keywords: ['joy', 'success', 'positivity', 'vitality'], upright: 'Positivity, fun, warmth, success, and vitality. The Sun shines on all you create. Joy and abundance flow freely — this is a golden moment.', reversed: 'Inner child, feeling down, overly optimistic. The sun still rises — reconnect with childlike wonder and joy.', symbolism: 'The child on horseback represents the soul freed from all fear, riding joyfully in the light.' },
  { id: 'judgement', name: 'Judgement', arcana: 'major', number: 20, emoji: '📯', keywords: ['judgement', 'rebirth', 'inner calling', 'absolution'], upright: 'Judgement, rebirth, inner calling, and absolution. The cosmic trumpet calls you to your higher purpose. Rise, be reborn, and answer your soul\'s true calling.', reversed: 'Self-doubt, inner critic, ignoring the call. You doubt your worthiness to rise — forgive yourself and ascend.', symbolism: 'Angels blow trumpets of awakening; the dead rising from coffins represents transcendence of limitation.' },
  { id: 'world', name: 'The World', arcana: 'major', number: 21, emoji: '🌍', keywords: ['completion', 'integration', 'accomplishment', 'wholeness'], upright: 'Completion, integration, accomplishment, travel. A cycle reaches its magnificent end. You have arrived — wholeness, fulfillment, and cosmic unity are yours.', reversed: 'Seeking personal closure, short-cuts, delays. The destination is near but you resist completing the journey.', symbolism: 'The wreath forms an egg of completion; four creatures mark the mastery of all elemental forces.' },
];

// Minor Arcana generation helper
const SUITS = [
  { suit: 'wands' as const, emoji: '🔥', element: 'fire' },
  { suit: 'cups' as const, emoji: '💧', element: 'water' },
  { suit: 'swords' as const, emoji: '💨', element: 'air' },
  { suit: 'pentacles' as const, emoji: '🌿', element: 'earth' },
];

const MINOR_TEMPLATES: Record<number, { name: string; upright: string; reversed: string }> = {
  1: { name: 'Ace', upright: 'New beginnings, raw potential, a powerful gift from the universe. Pure elemental energy flows to you — seize this initiation.', reversed: 'Blocked creativity, delays in new projects, wasted potential. The gift is offered but not received.' },
  2: { name: 'Two', upright: 'Balance, planning, decisions, partnership. Weigh your options carefully — two paths diverge and one leads to growth.', reversed: 'Indecision, disharmony, imbalance. You are paralyzed between choices — trust your deeper knowing.' },
  3: { name: 'Three', upright: 'Growth, creativity, collaboration, initial success. The seeds planted bear early fruit — celebrate progress and build on it.', reversed: 'Delays, lack of planning, obstacles to growth. Recalibrate your approach — the foundation needs strengthening.' },
  4: { name: 'Four', upright: 'Stability, rest, consolidation, grounding. A pause to integrate what you have achieved — rest restores your power.', reversed: 'Stagnation, boredom, restlessness. Comfortable stillness has become a trap — it is time to move again.' },
  5: { name: 'Five', upright: 'Conflict, loss, challenges, competition. Struggle and adversity build resilience — face the difficulty with courage.', reversed: 'Recovery from loss, moving on, acceptance. The storm passes — you find the strength to begin again.' },
  6: { name: 'Six', upright: 'Harmony, transition, help, and generosity. Kindness flows both ways — giving and receiving creates beautiful balance.', reversed: 'Strings attached, failed generosity, imbalance. Examine whether help comes with hidden expectations.' },
  7: { name: 'Seven', upright: 'Assessment, choice, strategy, mystery. The situation is complex — gather information and choose your path with wisdom.', reversed: 'Confusion, lack of strategy, making poor choices. Seek clarity before committing to any course of action.' },
  8: { name: 'Eight', upright: 'Action, movement, swiftness, progress. Energy accelerates — act now while momentum carries you forward powerfully.', reversed: 'Delays, frustration, obstacles, blockages. The path is temporarily blocked — patience and strategy will clear it.' },
  9: { name: 'Nine', upright: 'Resilience, courage, persistence, close to completion. You have come so far — one final push brings you to your goal.', reversed: 'Exhaustion, giving up too soon, inner crisis. Rest if needed, but do not abandon the journey at its final stage.' },
  10: { name: 'Ten', upright: 'Completion, culmination, fulfillment, end of a cycle. What began in the Ace reaches its fullest expression here — completion brings wisdom.', reversed: 'Burden, overwhelm, carrying too much. Set down what is not yours to carry — release and renewal await.' },
  11: { name: 'Page', upright: 'Curiosity, new energy, exploration, messages. Fresh energy arrives — embrace the beginner\'s mind and explore with enthusiasm.', reversed: 'Immaturity, lack of direction, hasty decisions. Slow down and develop your skills before charging ahead.' },
  12: { name: 'Knight', upright: 'Action, adventure, movement, bravery. Charge forward with courage — bold action now creates remarkable change.', reversed: 'Recklessness, impatience, impulsive decisions. Temper courage with wisdom before rushing headlong into battle.' },
  13: { name: 'Queen', upright: 'Nurturing authority, wisdom, independence, mastery. You embody the highest qualities of this element — lead with compassionate power.', reversed: 'Coldness, manipulation, overextension. Reconnect with the compassionate core of your authentic power.' },
  14: { name: 'King', upright: 'Mastery, command, achievement, authority. You stand at the pinnacle of elemental mastery — wield your power with integrity and vision.', reversed: 'Abuse of power, rigidity, domination. Examine whether your authority serves others or only yourself.' },
};

export const MINOR_ARCANA: TarotCard[] = SUITS.flatMap(({ suit, emoji }) =>
  Array.from({ length: 14 }, (_, i) => {
    const number = i + 1;
    const template = MINOR_TEMPLATES[number];
    const displayNum = number <= 10 ? (number === 1 ? 'Ace' : String(number)) : ['Page', 'Knight', 'Queen', 'King'][number - 11];
    return {
      id: `${suit}-${displayNum.toLowerCase()}`,
      name: `${displayNum} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
      arcana: 'minor' as const,
      suit,
      number,
      emoji,
      keywords: template.name === 'Ace' ? ['beginning', 'potential', suit] : [template.name.toLowerCase(), suit, 'energy'],
      upright: template.upright,
      reversed: template.reversed,
      symbolism: `The ${displayNum} of ${suit} channels the raw ${suit === 'wands' ? 'fire' : suit === 'cups' ? 'water' : suit === 'swords' ? 'air' : 'earth'} energy of elemental force.`,
    };
  })
);

export const ALL_CARDS: TarotCard[] = [...MAJOR_ARCANA, ...MINOR_ARCANA];

export function shuffleDeck(): TarotCard[] {
  const deck = [...ALL_CARDS];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export function drawCards(count: number): TarotCard[] {
  const deck = shuffleDeck();
  return deck.slice(0, count);
}
