
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from "../_shared/cors.ts"

const PERPLEXITY_API_KEY = Deno.env.get('PERPLEXITY_API_KEY')
const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions'

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { concept } = await req.json()

    if (!PERPLEXITY_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Perplexity API key not configured' }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const response = await fetch(PERPLEXITY_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: 'Create educational content in JSON format.'
          },
          {
            role: 'user',
            content: `Create a detailed educational explanation for: "${concept}". 
            Structure it as JSON with these fields:
            {
              "title": "concept name",
              "description": "brief description",
              "difficulty": "easy/medium/hard",
              "category": "subject area",
              "longDescription": "detailed explanation",
              "visualAnalogy": {
                "title": "visual analogy title",
                "description": "analogy description",
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
                  "explanation": "Answer explanation"
                }
              ],
              "relatedConcepts": ["related-concept-1", "related-concept-2"]
            }`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Perplexity API error:', errorData)
      return new Response(
        JSON.stringify({ error: 'Error calling Perplexity API', details: errorData }), 
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const data = await response.json()
    const conceptData = JSON.parse(data.choices[0].message.content)
    
    return new Response(JSON.stringify(conceptData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Server error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
