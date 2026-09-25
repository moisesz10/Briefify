import { useState } from 'react';

export function useSpeech() {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = (text: string) => {
    if (!text) return;
    
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
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

  return { playAudio, isPlaying };
}
