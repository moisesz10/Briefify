'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingGithub, setIsLoadingGithub] = useState(false);

  const handleSignIn = async (provider: 'google' | 'github') => {
    if (provider === 'google') setIsLoadingGoogle(true);
    if (provider === 'github') setIsLoadingGithub(true);
    await signIn(provider, { callbackUrl: '/dashboard' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      
      {/* Aesthetic Blobs */}
      <div style={{
        position: 'absolute', top: '20%', left: '30%', width: '300px', height: '300px', 
        background: '#6366f1', filter: 'blur(120px)', opacity: 0.2, borderRadius: '50%', zIndex: -1
      }}></div>
      
      <div className="glass-panel animate-fade-in" style={{ padding: 'var(--spacing-xl)', maxWidth: '400px', width: '90%', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>Bem-vindo ao <span className="gradient-text">Briefify</span></h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xl)' }}>Faça login para continuar.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
          <button 
            className="btn-secondary" 
            onClick={() => handleSignIn('google')}
            disabled={isLoadingGoogle}
            style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}
          >
            {isLoadingGoogle ? 'Carregando...' : 'Entrar com Google'}
          </button>
          <button 
            className="btn-secondary" 
            onClick={() => handleSignIn('github')}
            disabled={isLoadingGithub}
            style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}
          >
            {isLoadingGithub ? 'Carregando...' : 'Entrar com GitHub'}
          </button>
        </div>
      </div>
    </div>
  );
}
