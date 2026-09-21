import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  // Verificar se o usuário tem assinatura ativa
  const subscription = await prisma.subscription.findUnique({
    where: { userId: session.user.id },
  });

  const isPro = subscription?.isActive ?? false;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <header style={{ padding: '1rem 2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-glass)', backdropFilter: 'var(--blur-glass)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Briefify</h2>
        <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-secondary)' }}>{session.user.name}</span>
          {!isPro && (
            <form action="/api/checkout" method="POST">
              <button type="submit" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                Fazer Upgrade PRO
              </button>
            </form>
          )}
          {isPro && <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>PRO</span>}
        </nav>
      </header>
      <main style={{ flex: 1, padding: '2rem', display: 'flex', justifyContent: 'center' }}>
        {children}
      </main>
    </div>
  );
}
