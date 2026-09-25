'use client';

import { useState } from 'react';
import styles from './page.module.css';
import { useSummarize } from '@/hooks/useSummarize';
import { useSpeech } from '@/hooks/useSpeech';

export default function DashboardPage() {
  const [text, setText] = useState('');
  const { summary, isLoading, error, summarize } = useSummarize();
  const { playAudio, isPlaying } = useSpeech();

  return (
    <div className={`container animate-fade-in ${styles.wrapper}`}>
      
      <div className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
        <h1 className={styles.title}>Cole seu texto aqui</h1>
        
        {error && (
          <div className={styles.errorBox}>
            {error}
          </div>
        )}

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Cole aquele artigo enorme que você não tem tempo de ler..."
          className={styles.textarea}
        />
        
        <button 
          className={`btn-primary ${styles.btnFull}`}
          onClick={() => summarize(text)} 
          disabled={isLoading || !text}
        >
          {isLoading ? 'Resumindo com IA...' : 'Resumir Texto'}
        </button>
      </div>

      {summary && (
        <div className={`glass-panel animate-fade-in ${styles.summaryPanel}`}>
          <div className={styles.summaryHeader}>
            <h2 className={styles.summaryTitle}>Resumo</h2>
            <button className="btn-secondary" onClick={() => playAudio(summary)}>
              {isPlaying ? '⏹ Parar Áudio' : '▶️ Ouvir Resumo'}
            </button>
          </div>
          <p className={styles.summaryText}>
            {summary}
          </p>
        </div>
      )}
    </div>
  );
}
