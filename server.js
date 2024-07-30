const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(express.json());

const apiKey = process.env.OPENAI_API_KEY;
const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

app.post('/api/chat', async (req, res) => {
    const prompt = req.body.prompt;

    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.8,
                max_tokens: 1024
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        res.json(data.choices[0].message);
    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
        res.status(500).json({ error: 'API 호출 중 오류 발생' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
