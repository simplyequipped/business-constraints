import React, { useState } from 'react';
//import axios from 'axios';
import OpenAI from 'openai';

const openai = new OpenAI({apiKey: process.env.REACT_APP_OPENAI_API_KEY});

async function OpenAiQuery({systemMessage, userMessage}) {
  const completion = await openai.chat.completions.create({
    messages: [
        { role: 'system', content: {systemMessage}},
        { role: "user", content: {userMessage} }
    ],
    model: "gpt-4o-mini",
  });

  console.log(completion.choices[0]);
  return completion.choices[0].message.content
}

export default function ChatGptQuery({systemMessage, userMessage}) {
    const response = OpenAiQuery({systemMessage, userMessage});
    {/*
    const API_KEY=process.env.REACT_APP_OPENAI_API_KEY
    const [response, setResponse] = useState(null);

    const sendMessage = async (query) => {
        try {
            const apiUrl = 'https://api.openai.com/v1/chat/completions';
            const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
            };

            const requestBody = {
                messages: [{ role: 'user', content: {query} }],
            };

            const { data } = await axios.post(apiUrl, requestBody, { headers });

            setResponse(data.choices[0].message.content);
        }
        catch (error) {
            console.error('Error sending message:', error);
        }
        };

        sendMessage({query})
        */}

    return(
        <div>{response}</div>
    );
}