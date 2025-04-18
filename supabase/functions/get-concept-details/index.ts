
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from "../_shared/cors.ts"

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent"

serve(async (req) => {
  // CORS handling
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { concept } = await req.json()

    // Validate API key
    if (!GEMINI_API_KEY) {
      return new Response(JSON.stringify({ error: 'Gemini API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const prompt = `
      Create a detailed educational explanation for the concept: "${concept}". 
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
    `

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY,
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
    })

    const data = await response.json()
    const conceptData = JSON.parse(data.candidates[0].content.parts[0].text)

    return new Response(JSON.stringify(conceptData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

