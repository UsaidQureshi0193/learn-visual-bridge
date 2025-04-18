
import { useQuery } from "@tanstack/react-query";

const fetchConceptData = async (slug: string, apiKey: string) => {
  // Check if we're using a directly provided API key
  if (apiKey) {
    // Call the Gemini API directly instead of using the edge function
    const prompt = `
      Create a detailed educational explanation for the concept: "${slug.split('-').join(' ')}". 
      Structure the response as a JSON object with the following fields:
      {
        "title": "The concept name",
        "description": "A brief one-line description",
        "difficulty": "easy/medium/hard",
        "category": "The subject area",
        "longDescription": "A detailed explanation",
        "visualAnalogy": {
          "title": "A title for the visual analogy",
          "description": "An analogy that makes the concept easier to understand",
          "imageUrl": "/placeholder.svg"
        },
        "examples": [
          {
            "title": "Example title",
            "description": "Example description"
          }
        ],
        "quizQuestions": [
          {
            "question": "Question text",
            "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
            "correctAnswer": 0,
            "explanation": "Why this is the correct answer"
          }
        ],
        "relatedConcepts": ["related-concept-1", "related-concept-2"]
      }
      Make it educational and suitable for students aged 14-22.
    `;

    const response = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch concept data from Gemini API');
    }
    
    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response from Gemini API');
    }
    
    return JSON.parse(data.candidates[0].content.parts[0].text);
  }
  
  // Use the Supabase edge function if no API key is provided directly
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-concept-details`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ concept: slug.split('-').join(' ') })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch concept data');
  }

  return response.json();
};

export const useConceptData = (slug: string, apiKey?: string) => {
  return useQuery({
    queryKey: ['concept', slug, apiKey],
    queryFn: () => fetchConceptData(slug, apiKey || ""),
    enabled: !!slug && (!!apiKey || (!!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY)),
    retry: false,
  });
};
