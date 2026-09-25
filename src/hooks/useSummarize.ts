import { useState } from 'react';

export function useSummarize() {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const summarize = async (text: string) => {
    if (!text) return;
    setIsLoading(true);
    setError('');
    setSummary('');
    
    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        setSummary(data.summary);
      }
    } catch (err) {
      setError('Erro ao se conectar com a API de IA.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { summary, isLoading, error, summarize, setError };
}
