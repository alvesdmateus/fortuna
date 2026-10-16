// AI service — supports local (mock) mode and Gemini API mode

export type AIMode = 'local' | 'gemini';

export interface PalmReadingResult {
  headline: string;
  lifeLine: string;
  heartLine: string;
  headLine: string;
  fateLine: string;
  overall: string;
  advice: string;
}

export interface TarotInterpretation {
  intro: string;
  cardReadings: { cardName: string; interpretation: string }[];
  synthesis: string;
  advice: string;
}

// Get API key from env or localStorage
function getApiKey(): string | null {
  return import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('fortuna_api_key') || null;
}

export function getAIMode(): AIMode {
  return getApiKey() ? 'gemini' : 'local';
}

// ============ PALM READING ============
const PALM_MOCK_RESPONSES: PalmReadingResult[] = [
  {
    headline: 'A Palm of Deep Wisdom and Passion',
    lifeLine: 'Your life line arcs with extraordinary vitality, suggesting a long and vibrant journey ahead. A fork midway indicates a significant life change — a crossroads you have already begun approaching.',
    heartLine: 'The heart line curves deeply, revealing profound emotional capacity. You love with great depth and loyalty. A gentle break suggests past heartache has transformed into wisdom.',
    headLine: 'A long, gently curving head line speaks of a creative and imaginative mind that balances intuition with logic. You are a problem-solver who trusts both feeling and reason.',
    fateLine: 'Your fate line rises strong from the wrist — purpose has always guided you. A branch appears reaching toward the mount of Apollo, hinting at creative or artistic fulfillment ahead.',
    overall: 'Your palm reveals a soul of remarkable depth — one who has weathered storms and emerged with greater wisdom. The lines tell of a life lived with authentic passion and a destiny still unfolding.',
    advice: 'Trust the path your hands have already traced. The mountains ahead are climbed one step at a time. Your hands hold the power to create the life you envision.',
  },
  {
    headline: 'Lines of a Visionary Spirit',
    lifeLine: 'A deep, clear life line traces a path of robust health and determination. The wide arc indicates an expansive approach to life — you embrace experience with both arms open.',
    heartLine: 'Your heart line begins beneath the index finger — a sign of idealism in love. You seek a partnership of true minds and souls, never settling for less than genuine connection.',
    headLine: 'A double head line — rare and remarkable — suggests you can hold multiple perspectives simultaneously. Your mind moves between analytical precision and visionary imagination with ease.',
    fateLine: 'The fate line emerges clearly, indicating a strong sense of destiny. Multiple branches speak of diverse talents and paths — you are not confined to one expression of your gifts.',
    overall: 'These are the hands of someone who creates their own reality. Your palm reveals unusual strength of will combined with deep sensitivity — a rare and powerful combination.',
    advice: 'You are more capable than you allow yourself to believe. The lines of your hand speak of potential not yet fully activated. Begin the project, speak the truth, take the step.',
  },
];

const PALM_LINE_VARIATIONS = {
  lifeLine: [
    'A well-defined arc curves with steady confidence — your vitality is remarkable, your energy reserves deep. Small marks indicate periods of challenge that ultimately strengthened you.',
    'The life line shows a gentle wavering at one point — a period of transition where your path required recalibration. You emerged with greater wisdom and resilience.',
  ],
  heartLine: [
    'Your heart line reaches toward Jupiter\'s mount — you hold high ideals for love and connection. Past experiences have refined rather than hardened your capacity for intimacy.',
    'A chain formation on the heart line suggests emotional complexity — you feel deeply and process experiences with great care. This sensitivity is your greatest gift.',
  ],
  headLine: [
    'A clear, steady head line indicates focused intellect and decisive thinking. You cut through complexity to find essential truth.',
    'The sloping curve of your head line speaks of rich imagination. You perceive possibilities invisible to more literal minds.',
  ],
  fateLine: [
    'A strong fate line rises from the lunar mount — your destiny is influenced by intuition and the unconscious. Dreams carry important messages.',
    'The fate line fragments and then reforms — periods of uncertainty that resolved into greater clarity of purpose.',
  ],
};

export async function analyzePalm(imageBase64: string): Promise<PalmReadingResult> {
  const apiKey = getApiKey();

  if (apiKey) {
    try {
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const prompt = `You are a mystical palm reader with deep knowledge of palmistry. Analyze this palm image and provide a detailed, mystical reading in JSON format.

Return ONLY valid JSON with this exact structure:
{
  "headline": "A short evocative title for this palm (5-8 words)",
  "lifeLine": "Description of the life line (2-3 sentences, mystical and personal)",
  "heartLine": "Description of the heart line (2-3 sentences, mystical and personal)",
  "headLine": "Description of the head line (2-3 sentences, mystical and personal)",
  "fateLine": "Description of the fate line (2-3 sentences, mystical and personal)",
  "overall": "Overall palm synthesis (3-4 sentences, deeply personal and profound)",
  "advice": "Closing wisdom and advice based on the palm reading (2-3 sentences)"
}

Be evocative, mystical, and personal. Reference actual palmistry knowledge. Make it feel like a real, meaningful reading.`;

      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: imageBase64,
          },
        },
      ]);

      const text = result.response.text();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]) as PalmReadingResult;
      }
    } catch (err) {
      console.warn('Gemini API error, falling back to local:', err);
    }
  }

  // Local mock response
  await simulateDelay(2500);
  const base = PALM_MOCK_RESPONSES[Math.floor(Math.random() * PALM_MOCK_RESPONSES.length)];
  return {
    ...base,
    lifeLine: PALM_LINE_VARIATIONS.lifeLine[Math.floor(Math.random() * PALM_LINE_VARIATIONS.lifeLine.length)],
    heartLine: PALM_LINE_VARIATIONS.heartLine[Math.floor(Math.random() * PALM_LINE_VARIATIONS.heartLine.length)],
    headLine: PALM_LINE_VARIATIONS.headLine[Math.floor(Math.random() * PALM_LINE_VARIATIONS.headLine.length)],
    fateLine: PALM_LINE_VARIATIONS.fateLine[Math.floor(Math.random() * PALM_LINE_VARIATIONS.fateLine.length)],
  };
}

// ============ TAROT INTERPRETATION ============
export async function interpretTarotCards(
  cards: { name: string; upright: string; keywords: string[] }[],
  question?: string
): Promise<TarotInterpretation> {
  const apiKey = getApiKey();

  if (apiKey) {
    try {
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const cardList = cards.map(c => `${c.name} (keywords: ${c.keywords.join(', ')})`).join(', ');
      const prompt = `You are a wise and mystical tarot reader. The seeker${question ? ` asks: "${question}"` : ' seeks general guidance'}. The cards drawn are: ${cardList}.

Return ONLY valid JSON with this exact structure:
{
  "intro": "Opening invocation and context-setting (2-3 sentences)",
  "cardReadings": [
    {"cardName": "Card Name", "interpretation": "Personal interpretation of this card in context (2-3 sentences)"}
  ],
  "synthesis": "How the cards interact and their combined message (3-4 sentences)",
  "advice": "Final wisdom and practical guidance from the reading (2-3 sentences)"
}

Be mystical, profound, and personally meaningful. Weave the cards together as a narrative.`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]) as TarotInterpretation;
      }
    } catch (err) {
      console.warn('Gemini API error, falling back to local:', err);
    }
  }

  // Local mock
  await simulateDelay(2000);
  return generateLocalTarotReading(cards, question);
}

function generateLocalTarotReading(
  cards: { name: string; upright: string; keywords: string[] }[],
  question?: string
): TarotInterpretation {
  const intros = [
    'The veil between worlds grows thin as the cards reveal their ancient wisdom. What emerges from the shuffle carries specific medicine for this moment in your journey.',
    'The cards do not predict a fixed future — they illuminate what already lives within you, waiting to be seen. Let what surfaces be received as a gift.',
    'In the sacred space between question and answer, the cards speak. Their language is symbol and soul — listen with more than your mind.',
  ];

  const syntheses = [
    `These ${cards.length} card${cards.length > 1 ? 's' : ''} form a coherent message: the forces at play in your life right now are converging toward a significant turning point. The combination of energies present suggests that clarity, which has felt elusive, is about to crystallize into unmistakable knowing.`,
    `Taken together, the cards tell a story of transformation underway. What feels like disruption is actually reorganization at a higher level. Trust the process unfolding — the pieces are falling into place with cosmic precision.`,
    `The synergy of these cards points toward one truth: you hold within you everything needed for what lies ahead. The external circumstances are secondary to the inner alignment these cards invite you to discover.`,
  ];

  const advices = [
    'Take one small, aligned action today. The cards show the way — your task is simply to begin the walk. Clarity comes through movement, not waiting.',
    'What would you do if you trusted completely? The cards suggest that trust — in yourself, in the process — is the key that unlocks the next chapter.',
    'Carry the wisdom of this reading lightly. Let it inform rather than dictate. Your own inner knowing, awakened by these symbols, is your true guide.',
  ];

  return {
    intro: intros[Math.floor(Math.random() * intros.length)],
    cardReadings: cards.map(card => ({
      cardName: card.name,
      interpretation: `${card.upright} In your current situation, ${card.name} calls attention to the themes of ${card.keywords.slice(0, 2).join(' and ')} — energies that are particularly relevant to where you stand at this crossroads.`,
    })),
    synthesis: syntheses[Math.floor(Math.random() * syntheses.length)],
    advice: advices[Math.floor(Math.random() * advices.length)],
  };
}

// ============ ASTROLOGY READING ============
export async function getAstrologicalReading(
  signName: string,
  signDescription: string,
  planet: string,
  element: string
): Promise<string> {
  const apiKey = getApiKey();

  if (apiKey) {
    try {
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
      const prompt = `You are an expert astrologer providing a daily reading for ${signName} (ruling planet: ${planet}, element: ${element}).

Today is ${today}. Provide a concise, mystical, and personally resonant daily horoscope of 3-4 sentences. 
Focus on actionable insights, emotional guidance, and spiritual wisdom. 
Be specific about current planetary influences. Do not use generic platitudes.
Return only the horoscope text, no JSON.`;

      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err) {
      console.warn('Gemini API error:', err);
    }
  }

  return '';
}

// ============ UTILITIES ============
function simulateDelay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function saveApiKey(key: string): void {
  localStorage.setItem('fortuna_api_key', key);
}

export function clearApiKey(): void {
  localStorage.removeItem('fortuna_api_key');
}
