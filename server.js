const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;
  const apiEndpoint = 'https://api.openai.com/v1/chat/completions';
  const apiKey = process.env.OPENAI_API_KEY; // 환경 변수에서 API 키를 가져옴

  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
        max_tokens: 1024,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
        stop: ["Human"],
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('OpenAI API 호출 중 오류 발생:', error);
    res.status(500).json({ error: 'OpenAI API 호출 중 오류 발생' });
  }
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
