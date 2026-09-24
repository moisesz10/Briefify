'use client';

import { useState } from 'react';

export default function DashboardPage() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSummarize = async () => {
    if (!text) return;
    setIsLoading(true);
    
    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      
      if (data.error) {
        alert(data.error);
      } else {
        setSummary(data.summary);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayAudio = () => {
    if (!summary) return;
    
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(summary);
    utterance.lang = 'pt-BR';
    
    // Tenta encontrar uma voz mais natural (Premium, Google, ou Microsoft)
    const voices = window.speechSynthesis.getVoices();
    const ptVoices = voices.filter(v => v.lang.includes('pt-BR') || v.lang.includes('pt_BR'));
    const bestVoice = ptVoices.find(v => 
      v.name.includes('Google') || 
      v.name.includes('Premium') || 
      v.name.includes('Natural') ||
      v.name.includes('Microsoft Francisca') ||
      v.name.includes('Microsoft Antonio')
    ) || ptVoices[0];
    
    if (bestVoice) {
      utterance.voice = bestVoice;
    }

    utterance.onend = () => setIsPlaying(false);
    
    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="container animate-fade-in" style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
      
      <div className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-md)' }}>Cole seu texto aqui</h1>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Cole aquele artigo enorme que você não tem tempo de ler..."
          style={{
            width: '100%',
            height: '200px',
            padding: '1rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
            background: 'rgba(0,0,0,0.2)',
            color: 'var(--text-primary)',
            fontFamily: 'inherit',
            resize: 'vertical',
            marginBottom: 'var(--spacing-md)'
          }}
        />
        <button 
          className="btn-primary" 
          onClick={handleSummarize} 
          disabled={isLoading || !text}
          style={{ width: '100%' }}
        >
          {isLoading ? 'Resumindo com IA...' : 'Resumir Texto'}
        </button>
      </div>

      {summary && (
        <div className="glass-panel animate-fade-in" style={{ padding: 'var(--spacing-lg)', border: '1px solid var(--accent-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-primary)' }}>Resumo</h2>
            <button className="btn-secondary" onClick={handlePlayAudio}>
              {isPlaying ? '⏹ Parar Áudio' : '▶️ Ouvir Resumo'}
            </button>
          </div>
          <p style={{ color: 'var(--text-primary)', lineHeight: '1.8' }}>
            {summary}
          </p>
        </div>
      )}
    </div>
  );
}
