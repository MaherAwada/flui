import Link from 'next/link';
import { Zap, MapPin, BarChart2, Smartphone } from 'lucide-react';

export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#0d0a1a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #7c3aed, #9d5cf6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Zap size={28} color="#fff" />
        </div>
        <span style={{ fontSize: '42px', fontWeight: 'bold', color: '#fff' }}>FLUI</span>
      </div>

      {/* Tagline */}
      <h1 style={{
        fontSize: '20px',
        color: '#a78bfa',
        marginBottom: '16px',
        textAlign: 'center',
      }}>
        O sistema operacional da mobilidade elétrica
      </h1>

      <p style={{
        fontSize: '15px',
        color: '#6b7280',
        textAlign: 'center',
        maxWidth: '480px',
        marginBottom: '40px',
        lineHeight: '1.6',
      }}>
        Confiança, tecnologia e fluidez para quem deseja migrar para um veículo elétrico
      </p>

      {/* CTAs */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '64px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/dashboard" style={{ textDecoration: 'none' }}>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#7c3aed',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            padding: '14px 28px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
          }}>
            <Smartphone size={18} />
            App Mobile
          </button>
        </Link>

        <Link href="/dashboard" style={{ textDecoration: 'none' }}>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'transparent',
            color: '#a78bfa',
            border: '1px solid #7c3aed',
            borderRadius: '12px',
            padding: '14px 28px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
          }}>
            <BarChart2 size={18} />
            Dashboard Web
          </button>
        </Link>
      </div>

      {/* Feature Cards */}
      <div style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '860px',
      }}>
        {[
          {
            icon: <Zap size={24} color="#10b981" />,
            bg: '#0d2e22',
            title: 'Mapa Inteligente',
            desc: 'Encontre eletropostos com avaliações reais e FLUI Score',
          },
          {
            icon: <BarChart2 size={24} color="#a78bfa" />,
            bg: '#1e1535',
            title: 'Planejador de Viagem',
            desc: 'Descubra se você chega ao destino e onde parar',
          },
          {
            icon: <Smartphone size={24} color="#a78bfa" />,
            bg: '#1e1535',
            title: 'Vale Migrar?',
            desc: 'Compare custos e descubra sua economia real',
          },
        ].map((card, i) => (
          <div key={i} style={{
            backgroundColor: card.bg,
            border: '1px solid #2a1d4a',
            borderRadius: '16px',
            padding: '28px 24px',
            width: '240px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '12px',
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: card.bg,
              border: '1px solid #2a1d4a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {card.icon}
            </div>
            <h3 style={{ color: '#fff', fontSize: '15px', fontWeight: '600' }}>{card.title}</h3>
            <p style={{ color: '#6b7280', fontSize: '13px', lineHeight: '1.5' }}>{card.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}