import { useState } from 'react';
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: 'support', time: new Date() }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      time: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Auto-reply simulation
    setTimeout(() => {
      const supportMessage = {
        id: Date.now() + 1,
        text: "Thank you for your message. A pharmacist will assist you shortly.",
        sender: 'support',
        time: new Date()
      };
      setMessages(prev => [...prev, supportMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: isOpen ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
          zIndex: 1000,
          transition: 'all 0.3s ease'
        }}
      >
        <ChatBubbleLeftRightIcon style={{width: '24px', height: '24px'}} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '350px',
          height: '500px',
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <h3 style={{margin: 0, fontSize: '1rem', fontWeight: '600'}}>Live Support</h3>
              <p style={{margin: 0, fontSize: '0.875rem', opacity: 0.9}}>Online now</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <XMarkIcon style={{width: '20px', height: '20px'}} />
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            padding: '1rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%'
                }}
              >
                <div style={{
                  backgroundColor: message.sender === 'user' ? 'var(--color-primary)' : '#f1f5f9',
                  color: message.sender === 'user' ? 'white' : '#374151',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.875rem'
                }}>
                  {message.text}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#94a3b8',
                  marginTop: '0.25rem',
                  textAlign: message.sender === 'user' ? 'right' : 'left'
                }}>
                  {message.time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} style={{
            padding: '1rem',
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            gap: '0.5rem'
          }}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: '0.75rem',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '0.875rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <PaperAirplaneIcon style={{width: '16px', height: '16px'}} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}