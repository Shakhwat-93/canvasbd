import { useState, useRef, useEffect } from 'react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', content: 'Hello! 👋 Welcome to Canvas Digital. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    useEffect(() => {
        if (isOpen) inputRef.current?.focus();
    }, [isOpen]);

    async function sendMessage(e) {
        e?.preventDefault();
        const text = input.trim();
        if (!text || isTyping) return;

        const userMsg = { role: 'user', content: text };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            const history = [...messages, userMsg].map(m => ({
                role: m.role === 'bot' ? 'model' : 'user',
                content: m.content
            }));

            const res = await fetch(`${SUPABASE_URL}/functions/v1/chatbot`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text, history })
            });

            const data = await res.json();
            setMessages(prev => [...prev, { role: 'bot', content: data.reply || 'Sorry, please try again.' }]);
        } catch {
            setMessages(prev => [...prev, { role: 'bot', content: 'Connection error. Please try again or call us at 01990-081308.' }]);
        }
        setIsTyping(false);
    }

    return (
        <>
            <style>{`
                .chatbot-widget {
                    position: fixed;
                    bottom: 96px;
                    right: 28px;
                    z-index: 9998;
                    font-family: Inter, system-ui, sans-serif;
                }
                .chatbot-toggle {
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    border: none;
                    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    animation: cb-pulse 2.5s ease-in-out infinite;
                }
                .chatbot-toggle:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 28px rgba(99, 102, 241, 0.5);
                }
                .chatbot-toggle svg {
                    transition: transform 0.3s ease;
                }
                .chatbot-toggle.active svg {
                    transform: rotate(90deg);
                }
                @keyframes cb-pulse {
                    0%, 100% { box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4); }
                    50% { box-shadow: 0 4px 30px rgba(99, 102, 241, 0.55), 0 0 0 10px rgba(99, 102, 241, 0.06); }
                }

                .chatbot-window {
                    position: absolute;
                    bottom: 68px;
                    right: 0;
                    width: 380px;
                    max-width: calc(100vw - 32px);
                    height: 520px;
                    max-height: calc(100vh - 180px);
                    background: #111113;
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 24px;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    box-shadow: 0 16px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04);
                    animation: cb-slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
                    transform-origin: bottom right;
                }
                @keyframes cb-slideUp {
                    from { opacity: 0; transform: translateY(16px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                .chatbot-header {
                    padding: 18px 20px;
                    background: linear-gradient(180deg, rgba(99, 102, 241, 0.08), transparent);
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .chatbot-header-avatar {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .chatbot-header-info {
                    flex: 1;
                }
                .chatbot-header-name {
                    font-size: 14px;
                    font-weight: 600;
                    color: #fff;
                    line-height: 1.2;
                }
                .chatbot-header-status {
                    font-size: 11px;
                    color: rgba(255,255,255,0.4);
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    margin-top: 2px;
                }
                .chatbot-header-status .dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #22c55e;
                }
                .chatbot-close {
                    width: 28px;
                    height: 28px;
                    border-radius: 8px;
                    border: none;
                    background: rgba(255,255,255,0.05);
                    color: rgba(255,255,255,0.4);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }
                .chatbot-close:hover {
                    background: rgba(255,255,255,0.1);
                    color: #fff;
                }

                .chatbot-messages {
                    flex: 1;
                    overflow-y: auto;
                    padding: 16px 16px 8px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    scrollbar-width: thin;
                    scrollbar-color: rgba(255,255,255,0.08) transparent;
                }
                .chatbot-messages::-webkit-scrollbar { width: 4px; }
                .chatbot-messages::-webkit-scrollbar-track { background: transparent; }
                .chatbot-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }

                .chatbot-msg {
                    max-width: 85%;
                    padding: 10px 14px;
                    border-radius: 16px;
                    font-size: 13.5px;
                    line-height: 1.55;
                    animation: cb-msgIn 0.25s ease;
                    word-wrap: break-word;
                }
                @keyframes cb-msgIn {
                    from { opacity: 0; transform: translateY(6px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .chatbot-msg.user {
                    align-self: flex-end;
                    background: linear-gradient(135deg, #6366f1, #7c3aed);
                    color: #fff;
                    border-bottom-right-radius: 4px;
                }
                .chatbot-msg.bot {
                    align-self: flex-start;
                    background: rgba(255,255,255,0.06);
                    color: rgba(255,255,255,0.85);
                    border-bottom-left-radius: 4px;
                    border: 1px solid rgba(255,255,255,0.05);
                }

                .chatbot-typing {
                    align-self: flex-start;
                    display: flex;
                    gap: 4px;
                    padding: 12px 16px;
                    background: rgba(255,255,255,0.06);
                    border-radius: 16px;
                    border-bottom-left-radius: 4px;
                    border: 1px solid rgba(255,255,255,0.05);
                }
                .chatbot-typing span {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.3);
                    animation: cb-bounce 1.4s ease-in-out infinite;
                }
                .chatbot-typing span:nth-child(2) { animation-delay: 0.16s; }
                .chatbot-typing span:nth-child(3) { animation-delay: 0.32s; }
                @keyframes cb-bounce {
                    0%, 60%, 100% { transform: translateY(0); }
                    30% { transform: translateY(-5px); }
                }

                .chatbot-input-area {
                    padding: 12px 16px 14px;
                    border-top: 1px solid rgba(255,255,255,0.06);
                    background: rgba(255,255,255,0.02);
                }
                .chatbot-input-form {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 14px;
                    padding: 4px 4px 4px 14px;
                    transition: border-color 0.2s;
                }
                .chatbot-input-form:focus-within {
                    border-color: rgba(99, 102, 241, 0.4);
                }
                .chatbot-input-form input {
                    flex: 1;
                    background: none;
                    border: none;
                    outline: none;
                    color: #fff;
                    font-size: 13.5px;
                    font-family: inherit;
                    padding: 6px 0;
                }
                .chatbot-input-form input::placeholder {
                    color: rgba(255,255,255,0.25);
                }
                .chatbot-send {
                    width: 34px;
                    height: 34px;
                    border-radius: 10px;
                    border: none;
                    background: linear-gradient(135deg, #6366f1, #7c3aed);
                    color: #fff;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    transition: opacity 0.2s, transform 0.2s;
                }
                .chatbot-send:hover { transform: scale(1.05); }
                .chatbot-send:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
            `}</style>

            <div className="chatbot-widget">
                {/* Chat Window */}
                {isOpen && (
                    <div className="chatbot-window">
                        {/* Header */}
                        <div className="chatbot-header">
                            <div className="chatbot-header-avatar">
                                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7z" />
                                    <circle cx="12" cy="9" r="2.5" />
                                </svg>
                            </div>
                            <div className="chatbot-header-info">
                                <div className="chatbot-header-name">Canvas Digital Assistant</div>
                                <div className="chatbot-header-status">
                                    <span className="dot" />
                                    Always online
                                </div>
                            </div>
                            <button className="chatbot-close" onClick={() => setIsOpen(false)}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="chatbot-messages">
                            {messages.map((msg, i) => (
                                <div key={i} className={`chatbot-msg ${msg.role}`}>
                                    {msg.content}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="chatbot-typing">
                                    <span /><span /><span />
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="chatbot-input-area">
                            <form className="chatbot-input-form" onSubmit={sendMessage}>
                                <input
                                    ref={inputRef}
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    placeholder="Type your message..."
                                    autoComplete="off"
                                />
                                <button type="submit" className="chatbot-send" disabled={!input.trim() || isTyping}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Toggle Button */}
                <button
                    className={`chatbot-toggle ${isOpen ? 'active' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Chat with us"
                >
                    {isOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="none">
                            <path d="M18.3 5.71a1 1 0 0 0-1.42 0L12 10.59 7.12 5.71a1 1 0 1 0-1.42 1.42L10.59 12l-4.89 4.88a1 1 0 1 0 1.42 1.42L12 13.41l4.88 4.89a1 1 0 0 0 1.42-1.42L13.41 12l4.89-4.88a1 1 0 0 0 0-1.41z" />
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                    )}
                </button>
            </div>
        </>
    );
}
