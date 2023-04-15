const openaiUrl = '${process.env.BASE_URL}/v1/chat/completions';
const wordPrompt = process.env.WORD_PROMPT;

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
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error', error.response.data);
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { query } = req.body;
    console.log(query);
    const content = await getOpenaiData(wordPrompt, query);
    res.status(200).json({ content: content });
  } else {
    const { query } = req.body;
    console.log(query);
    res.status(405).json({ message: 'Method not allowed' });
  }
}
