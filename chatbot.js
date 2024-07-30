const chatMessages = document.querySelector('#chat-messages');
const userInput = document.querySelector('#user-input input');
const sendButton = document.querySelector('#user-input button');
const apiEndpoint = '/api/chat'; // 서버 프록시 엔드포인트

function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.textContent = `${sender}: ${message}`;
    chatMessages.prepend(messageElement);
}

async function fetchAIResponse(prompt) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}` // API 키를 헤더에 포함
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.8,
            max_tokens: 1024
        })
    };

    try {
        const response = await fetch(apiEndpoint, requestOptions);

        // 응답 상태 코드 확인
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // JSON 응답 파싱
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('서버 호출 중 오류 발생:', error);
        return '서버 호출 중 오류 발생';
    }
}


sendButton.addEventListener('click', async () => {
    const message = userInput.value.trim();
    if (message.length === 0) return;
    addMessage('나', message);
    userInput.value = '';
    const aiResponse = await fetchAIResponse(message);
    addMessage('챗봇', aiResponse);
});

userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});
