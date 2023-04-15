
import { NextResponse } from 'next/server';

const openaiUrl = `${process.env.BASE_URL}/v1/chat/completions`;
const wordPrompt = process.env.WORD_PROMPT;

// console.log(openaiUrl);
// console.log(wordPrompt);

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
};

async function getOpenaiData(wordPrompt, query) {
  const data = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: wordPrompt + query }],
  };

  try {
    const response = await fetch(openaiUrl, {method: 'POST', headers: headers, body: JSON.stringify(data)});
    const content = await response.json();
    console.log(query, content.usage);
    return content.choices[0].message.content;
  } catch (error) {
    console.error('Error', error.response.data);
    return null;
  }
}

// export default async function handler(req, res) {  
//   console.error('Handling request in /api/wordinfo', req.method);
//   if (req.method === 'POST') {    
//     const { query } = req.body;
//     console.error('Received POST request:', query);
//     console.log(query);
//     const content = await getOpenaiData(wordPrompt, query);
//     res.status(200).json({ content: content });
//   } else {    
//     const { query } = req.body;
//     console.error('Received non-POST request:', query);
//     console.log(query);
//     res.status(405).json({ message: 'Method not allowed!  kkkkkkk' });
//   }
// }


export async function POST(req) { 
  const query = await req.json();
  console.log('POST /api/wordinfo', query);
  const content = await getOpenaiData(wordPrompt, query.query);
  return NextResponse.json({ content: content });
}

