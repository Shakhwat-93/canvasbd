import Footer from './Footer';
import ChatBot from './ChatBot';

export default function Layout({ children }) {
    return (
        <div className="page-wrapper">
            <main className="main">
                {children}
            </main>
            <Footer />

            {/* AI Chatbot Widget */}
            <ChatBot />

            {/* WhatsApp Floating Button */}
            <a
                href="https://wa.me/8801841991814"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                style={{
                    position: 'fixed',
                    bottom: '28px',
                    right: '28px',
                    zIndex: 9999,
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: '#25D366',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer',
                    animation: 'wa-pulse 2s ease-in-out infinite',
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.boxShadow = '0 6px 28px rgba(37, 211, 102, 0.5)';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(37, 211, 102, 0.4)';
                }}
            >
                <svg viewBox="0 0 32 32" width="28" height="28" fill="white">
                    <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.962a15.93 15.93 0 008.832 2.672C24.826 31.999 32 24.824 32 16.004 32 7.176 24.826 0 16.004 0zm9.534 22.612c-.396 1.116-2.328 2.136-3.21 2.196-.882.066-1.704.396-5.742-1.194-4.866-1.914-7.956-6.9-8.196-7.218-.24-.318-1.962-2.61-1.962-4.98s1.242-3.534 1.686-4.02c.444-.486.972-.606 1.296-.606.324 0 .648 0 .936.018.3.012.702-.114 1.098.84.396.954 1.35 3.294 1.47 3.534.12.24.198.522.036.84-.162.318-.24.516-.48.798-.24.276-.504.618-.72.828-.24.24-.49.498-.21.978.276.48 1.236 2.04 2.652 3.3 1.824 1.626 3.36 2.13 3.84 2.37.48.24.762.198 1.044-.12.276-.318 1.2-1.398 1.518-1.878.318-.48.642-.396 1.08-.24.438.162 2.778 1.308 3.258 1.548.48.24.798.36.918.558.12.198.12 1.152-.276 2.268z" />
                </svg>
            </a>

            <style>{`
                @keyframes wa-pulse {
                    0%, 100% { box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4); }
                    50% { box-shadow: 0 4px 30px rgba(37, 211, 102, 0.6), 0 0 0 10px rgba(37, 211, 102, 0.08); }
                }
            `}</style>
        </div>
    );
}
