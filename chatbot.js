const chatMessages = document.querySelector('#chat-messages');
const userInput = document.querySelector('#user-input input');
const sendButton = document.querySelector('#user-input button');
const apiEndpoint = '/api/chat'; // 서버의 엔드포인트

function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.textContent = `${sender}: ${message}`;
    chatMessages.prepend(messageElement);
}

async function fetchAIResponse(prompt) {
    const requestOptions = {
        method: 'POST', // POST 메서드 사용
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }) // 요청 본문에 프롬프트 포함
    };

    try {
        const response = await fetch(apiEndpoint, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.content; // 응답에서 챗봇의 답변 가져오기
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
