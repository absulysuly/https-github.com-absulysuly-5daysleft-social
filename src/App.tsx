import React, { useState, useEffect } from 'react';
import { getStats, getAgentInstructions } from './services/api';
import { askGemini } from './services/gemini';

const TopNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigationLinks = [
    { href: '#', label: 'Dashboard' },
    { href: '#', label: 'Roadmap' },
    { href: '#', label: 'Community' },
    { href: '#', label: 'Blog' },
  ];

  return (
    <nav className="top-nav-bar">
      <div className="nav-container">
        <a href="#" className="nav-brand">Sunrise23</a>
        <div className="nav-links-container">
          <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={link.label === 'Dashboard' ? 'active' : ''}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="nav-actions">
           <a href="#" className="sign-in-button">Sign In</a>
           <button className="hamburger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle navigation" aria-expanded={isMenuOpen}>
             <span/>
             <span/>
             <span/>
           </button>
        </div>
      </div>
    </nav>
  );
};

const ProjectCountdown = () => {
    const calculateTimeLeft = () => {
        // Set a fixed future date for the countdown
        const difference = +new Date("2025-01-01T00:00:00") - +new Date();
        let timeLeft: {[key: string]: number} = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        <div className="countdown-timer">
            {Object.keys(timeLeft).length > 0 ? (
              Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="countdown-unit">
                      <span className="countdown-value">{String(value).padStart(2, '0')}</span>
                      <span className="countdown-label">{unit.toUpperCase()}</span>
                  </div>
              ))
            ) : (
              <p className="countdown-launched">Project Launched!</p>
            )}
        </div>
    );
};


const GeminiQuery = () => {
  const [prompt, setPrompt] = useState('');
  const [geminiResponse, setGeminiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setGeminiResponse('');

    try {
      const response = await askGemini(prompt);
      setGeminiResponse(response);
    } catch (err) {
      setError('Failed to get a response from the AI. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="gemini-query-container">
      <h2>Project AI Assistant</h2>
      <p>Have questions about your project, need to brainstorm ideas, or want a code snippet? Ask away!</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Write a JavaScript function to sort an array of objects by a property"
          rows={4}
          disabled={isLoading}
          aria-label="Ask the AI assistant a question"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Thinking...' : 'Submit Question'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {geminiResponse && (
        <div className="gemini-response">
          <h3>AI Response:</h3>
          <p>{geminiResponse}</p>
        </div>
      )}
    </div>
  );
};

const ProjectStats = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const data = await getStats();
      setStats(data);
      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p>Loading project stats...</p>;
  }

  return (
    <>
      {stats && (
        <ul className="stats-grid">
          {Object.entries(stats).map(([key, value]) => (
            <li key={key} className="stat-card">
              <p className="stat-value">{String(value)}</p>
              <p className="stat-label">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

const AgentInstructions = ({ instructions, onDismiss }: { instructions: string; onDismiss: () => void; }) => {
  return (
    <div className="agent-instructions-banner">
      <div className="info-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
      </div>
      <p>{instructions}</p>
      <button onClick={onDismiss} className="dismiss-button" aria-label="Dismiss instructions">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
  );
}


const HomeView = () => {
  const [agentInstructions, setAgentInstructions] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    const fetchInstructions = async () => {
      const instructions = await getAgentInstructions();
      if (instructions) {
        setAgentInstructions(instructions);
        setShowInstructions(true);
      }
    };
    fetchInstructions();
  }, []);

  const handleDismissInstructions = () => {
    setShowInstructions(false);
  };
  
  return (
    <>
      <TopNavBar />
      <div className="container">
        {showInstructions && agentInstructions && (
          <AgentInstructions
            instructions={agentInstructions}
            onDismiss={handleDismissInstructions}
          />
        )}
        <header className="app-header">
          <h1>Sunrise23 Project</h1>
          <p>Your project dashboard and AI assistant, counting down to launch.</p>
          <div className="cta-buttons">
            <a href="#" className="cta-primary">Join the Waitlist</a>
            <a href="#" className="cta-secondary">View Roadmap</a>
          </div>
        </header>
        
        <main>
          <section className="countdown-section">
            <h2>LAUNCHING IN</h2>
            <ProjectCountdown />
          </section>

          <section className="project-stats-section">
            <h2>Project Status</h2>
            <ProjectStats />
          </section>

          <section className="ai-section">
            <GeminiQuery />
          </section>
        </main>

        <footer className="app-footer">
            <p>&copy; 2024 Sunrise23 Project. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};


function App() {
  return (
      <HomeView />
  );
}

export default App;