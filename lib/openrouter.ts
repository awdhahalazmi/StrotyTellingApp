export interface StoryParams {
  childName: string;
  childAge: number;
  theme: string;
  elements: string[];
  length: 'short' | 'medium' | 'long';
  description?: string;
}

export interface StoryResult {
  story: string;
  imagePrompts: string[];
}

function parseResponse(raw: string): StoryResult {
  const marker = 'ILLUSTRATIONS:';
  const idx = raw.indexOf(marker);
  if (idx === -1) return { story: raw.trim(), imagePrompts: [] };

  const story = raw.slice(0, idx).trim();
  const illSection = raw.slice(idx + marker.length).trim();

  const imagePrompts = illSection
    .split('\n')
    .map(l => l.replace(/^\d+[\.\)]\s*/, '').trim())
    .filter(Boolean);

  return { story, imagePrompts };
}

export async function generateStory(params: StoryParams, apiKey: string): Promise<StoryResult> {
  const { childName, childAge, theme, elements, length, description } = params;

  const elementsText = elements.length > 0
    ? `Include these magical elements: ${elements.join(', ')}.`
    : '';

  const lengthGuide = {
    short:  'Keep it very short and simple. Write exactly 3 paragraphs. Simple sentences a young child can follow easily.',
    medium: 'Write exactly 5 paragraphs.',
    long:   'Write exactly 8 paragraphs.',
  }[length];

  const realEventText = description?.trim()
    ? `\nReal event inspiration: Something that actually happened to ${childName} today — "${description.trim()}". Weave this into the story magically.`
    : '';

  const prompt = `Write a magical bedtime story for a child named ${childName}, who is ${childAge} years old.
Theme: ${theme}.
${elementsText}
${lengthGuide}
${realEventText}

Requirements:
- Safe, warm, and comforting for children
- Age-appropriate for a ${childAge}-year-old
- Encourages kindness, friendship, and imagination
- A clear story arc with a peaceful, happy bedtime ending
- No scary content whatsoever

After the story, add this section on a new line with NO extra text before it:
ILLUSTRATIONS:
One illustration description per paragraph, numbered, max 12 words each.
Write them as vivid scene descriptions for a children's watercolor picture book.
Example format:
1. A small rabbit discovers a glowing golden door in the forest.
2. The rabbit and a friendly fox share a magical picnic under stars.`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'https://dreamtales.app',
      'X-Title': 'DreamTales',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/gpt-oss-120b:free',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2500,
      temperature: 0.9,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenRouter error: ${err}`);
  }

  const data = await response.json();
  return parseResponse(data.choices[0].message.content as string);
}
