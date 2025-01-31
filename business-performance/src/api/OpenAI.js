import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

async function OpenAIQuery(systemMessage, userMessage) {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: 'system', content: systemMessage },
          { role: "user", content: userMessage }
        ],
        model: "gpt-4o-mini",
      });
  
      return completion.choices[0].message.content;
    } catch (error) {
      console.error("OpenAI API error:", error);
      return "Error retrieving response.";
    }
  }

export default OpenAIQuery;
