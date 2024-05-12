import React, { useState, useEffect } from 'react';
import profilePic from './images/profile.png';

function Message({ text, index, onDelete }) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = (e) => {
    e.preventDefault(); // Prevent the default context menu
    setShowMenu(!showMenu);
  };

  const handleDelete = () => {
    onDelete(index);
    setShowMenu(false); // Hide menu after deletion
  };

  return (
    <div style={{
      position: 'relative',
      textAlign: 'left',
      margin: '10px 0',
      backgroundColor: '#ebebeb',
      padding: '10px 20px',
      borderRadius: '20px',
      maxWidth: '70%',
      alignSelf: 'flex-start',
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
      hyphens: 'auto'
    }}
    onContextMenu={toggleMenu}
    >
      {text}
      {showMenu && (
        <div style={{
          position: 'absolute',
          top: 0,
          right: '100%',
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '5px',
          padding: '5px 10px',
          cursor: 'pointer',
          zIndex: 1000
        }}
        onClick={handleDelete}
        >
          Remove
        </div>
      )}
    </div>
  );
}

function App() {
  const [messages, setMessages] = useState(JSON.parse(localStorage.getItem('messages')) || []);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessages = [...messages, inputText];
      setMessages(newMessages);
      localStorage.setItem('messages', JSON.stringify(newMessages));
      setInputText('');
    }
  };

  const handleRemoveMessage = (index) => {
    const updatedMessages = messages.filter((_, i) => i !== index);
    setMessages(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
  };

  // Inline styles
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f4f7fa',
    },
    chatscreen: {
      width: '100%',
      maxWidth: '360px',
      padding: '20px',
      background: 'white',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      textAlign: 'center',
      height: '600px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
      backgroundColor: '#003366',
      padding: '10px',
      borderRadius: '8px',
      color: 'white',
    },
    profilePic: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundSize: 'cover',
      backgroundImage: `url(${profilePic})`,
      marginRight: '10px',
    },
    messageContainer: {
      overflowY: 'scroll',
      flex: 1,
      backgroundColor: '#f9f9f9',
    },
    inputArea: {
      display: 'flex',
      padding: '10px',
      borderTop: '1px solid #ccc',
      backgroundColor: '#fff',
      alignItems: 'flex-end',
    },
    textarea: {
      flex: 1,
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '20px',
      resize: 'none',
      overflow: 'auto',
      minHeight: '20px',
      maxHeight: '150px',
    },
    sendButton: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '20px',
      backgroundColor: '#009688',
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginLeft: '5px',
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
          {messages.map((msg, index) => (
            <Message key={index} text={msg} index={index} onDelete={handleRemoveMessage} />
          ))}
        </div>
        <div style={styles.inputArea}>
          <textarea
            style={styles.textarea}
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
