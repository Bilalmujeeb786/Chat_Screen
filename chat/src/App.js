import React, { useState } from 'react';
import profilePic from './images/profile.png'; // Ensure this path is correct

function Message({ text, isReply }) {
  return (
    <div style={{
      textAlign: 'left',
      margin: isReply ? '10px 5px 10px auto' : '10px auto 10px 20px', // Very small right margin for replies
      backgroundColor: isReply ? '#ADD8E6' : '#ebebeb', // Blue for replies, grey for messages
      padding: '10px 20px',
      borderRadius: '20px',
      maxWidth: '70%', // You can adjust this if you want replies to be wider
      alignSelf: isReply ? 'flex-end' : 'flex-start', // Align right for replies
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
    }}>
      {text}
    </div>
  );
}


function App() {
  const [messages, setMessages] = useState([
    { text: "Hello, how are you?", isReply: false },
    { text: "I'm fine, thanks for asking!", isReply: true },
    { text: "Great to hear that!", isReply: false }
  ]);
  const [inputText, setInputText] = useState('');

  // Inline styles
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f0f0',
    },
    chatscreen: {
      width: '100%',
      maxWidth: '360px',
      background: 'white',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      height: '600px',
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#003366', // Dark blue background
      padding: '10px',
      borderRadius: '8px',
      color: 'white',
      marginBottom: '10px',
    },
    profilePic: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundSize: 'cover',
      backgroundImage: `url(${profilePic})`,
      marginRight: '10px',
    },
    messageContainer: {
      overflowY: 'auto',
      flex: 1,
      padding: '0 20px',
    },
    inputArea: {
      borderTop: '1px solid #ccc',
      padding: '10px',
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      padding: '10px',
      borderRadius: '20px',
      border: '1px solid #ccc',
      marginRight: '10px',
    },
    sendButton: {
      padding: '10px 20px',
      borderRadius: '20px',
      backgroundColor: '#009688',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
    },
  };

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessages = [...messages, { text: inputText, isReply: false }];
      setMessages(newMessages);
      setInputText('');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatscreen}>
        <div style={styles.header}>
          <div style={styles.profilePic}></div>
          <strong>John Doe</strong>
        </div>
        <div style={styles.messageContainer}>
          {messages.map((message, index) => (
            <Message key={index} text={message.text} isReply={message.isReply} />
          ))}
        </div>
        <div style={styles.inputArea}>
          <input
            style={styles.input}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
          />
          <button style={styles.sendButton} onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
