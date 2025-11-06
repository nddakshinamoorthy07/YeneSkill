export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export async function sendMessageToGemini(message: string, conversationHistory: Message[] = []): Promise<string> {
  // Read API key from environment variable
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('Gemini API key missing.');
    return "AI service is not configured. Please contact support.";
  }

  // Use gemini-pro with the v1 API endpoint
  const model = 'gemini-pro';
  const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent`;

  try {
    // Simplified payload structure
    const payload = {
      contents: [
        {
          parts: [
            {
              text: message
            }
          ]
        }
      ]
    };

    console.log('🤖 Sending request to Gemini API...', { model, url, messageLength: message.length });

    const response = await fetch(`${url}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    console.log('📥 Raw Response:', { status: response.status, responseText });

    if (!response.ok) {
      console.error('❌ Gemini API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: responseText
      });
      
      // Try to parse error details
      try {
        const errorJson = JSON.parse(responseText);
        if (errorJson.error?.message) {
          console.error('API Error Message:', errorJson.error.message);
          return `Error: ${errorJson.error.message}`;
        }
      } catch (e) {
        // Error text is not JSON
      }
      
      return 'I apologize, but I encountered a technical issue. Please check the console for details.';
    }

    const data = JSON.parse(responseText);
    console.log('✅ Gemini API Response:', data);
    
    // Extract text from the response
    const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (generatedText && typeof generatedText === 'string') {
      return generatedText.trim();
    }

    console.warn('⚠️ No valid response from Gemini API:', data);
    return 'I apologize, but I could not generate a proper response. Please try rephrasing your question.';
    
  } catch (error) {
    console.error('💥 Error calling Gemini API:', error);
    return `I apologize, but I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}
