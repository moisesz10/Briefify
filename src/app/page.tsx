import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
      <div className="container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', alignItems: 'center' }}>
        <div className="glass-panel" style={{ padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: 'var(--spacing-md)', lineHeight: 1.1 }}>
            Transforme Textos em <br />
            <span className="gradient-text">Áudio com Inteligência Artificial</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto var(--spacing-xl) auto' }}>
            O Briefify resume textos gigantes e PDFs, entregando o essencial direto nos seus fones de ouvido. Consuma conteúdo 10x mais rápido.
          </p>
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center' }}>
            <Link href="/login" className="btn-primary" style={{ fontSize: '1.1rem' }}>
              Começar Gratuitamente
            </Link>
            <Link href="#features" className="btn-secondary" style={{ fontSize: '1.1rem' }}>
              Saiba Mais
            </Link>
          </div>
        </div>
      </div>
      
      {/* Background blobs for aesthetic */}
      <div style={{
        position: 'absolute', top: '10%', left: '10%', width: '400px', height: '400px', 
        background: 'var(--accent-primary)', filter: 'blur(150px)', opacity: 0.15, borderRadius: '50%', zIndex: -1
      }}></div>
      <div style={{
        position: 'absolute', bottom: '10%', right: '10%', width: '300px', height: '300px', 
        background: '#ec4899', filter: 'blur(150px)', opacity: 0.15, borderRadius: '50%', zIndex: -1
      }}></div>
    </main>
  );
}
