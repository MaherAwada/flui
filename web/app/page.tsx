import Link from 'next/link';
import { Zap, BarChart2, Smartphone } from 'lucide-react';

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
        color: '#D6A8FF',
        marginBottom: '16px',
        textAlign: 'center',
        fontFamily: 'var(--font-inter), sans-serif',
        fontWeight: '400',
      }}>
        O sistema operacional da mobilidade elétrica
      </h1>

      <p style={{
        fontSize: '15px',
        color: '#B8B8C2',
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
            fontWeight: '400',
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
            color: '#D6A8FF',
            border: '2px solid #B14DFF',
            borderRadius: '12px',
            padding: '14px 28px',
            fontSize: '15px',
            fontWeight: '400',
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
            icon: <Zap size={24} color="#2DFFB4" />,
            iconBg: '#2DFFB433',
            title: 'Mapa Inteligente',
            desc: 'Encontre eletropostos com avaliações reais e FLUI Score',
          },
          {
            icon: <BarChart2 size={24} color="#B14DFF" />,
            iconBg: '#B14DFF33',
            title: 'Planejador de Viagem',
            desc: 'Descubra se você chega ao destino e onde parar',
          },
          {
            icon: <Smartphone size={24} color="#D6A8FF" />,
            iconBg: '#D6A8FF33',
            title: 'Vale Migrar?',
            desc: 'Compare custos e descubra sua economia real',
          },
        ].map((card, i) => (
          <div key={i} style={{
            backgroundColor: '#1B062D80',
            border: '1px solid #B14DFF33',
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
              backgroundColor: card.iconBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {card.icon}
            </div>
            <h3 style={{ color: '#ffffff', fontSize: '15px', fontWeight: '400' }}>{card.title}</h3>
            <p style={{ color: '#B8B8C2', fontSize: '13px', lineHeight: '1.5' }}>{card.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}