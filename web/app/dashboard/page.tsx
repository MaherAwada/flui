'use client';

import Link from 'next/link';
import { MapPin, Star, Eye } from 'lucide-react';
import { eletropostos, avaliacoes } from '@/lib/data';

export default function Dashboard() {
  const totalPontos = eletropostos.length;
  const pontosAtivos = eletropostos.filter(e => e.disponiveis > 0).length;
  const scoreMedia = (eletropostos.reduce((acc, e) => acc + e.score, 0) / eletropostos.length).toFixed(1);

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>
        Dashboard Administrativo
      </h1>
      <p style={{ color: '#6b7280', marginBottom: '32px' }}>Visão geral da plataforma FLUI</p>

      {/* Métricas */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '32px', flexWrap: 'wrap' }}>
        {[
          { icon: <MapPin size={22} color="#a78bfa" />, valor: '1,247', label: 'Total de Eletropostos', badge: '+12%' },
          { icon: <Star size={22} color="#a78bfa" />, valor: '1,089', label: 'Pontos Ativos', badge: '+8%' },
          { icon: <Star size={22} color="#a78bfa" />, valor: scoreMedia, label: 'Score Médio', badge: '+0.3' },
        ].map((card, i) => (
          <div key={i} style={{
            backgroundColor: '#1e1535',
            border: '1px solid #2a1d4a',
            borderRadius: '16px',
            padding: '24px',
            flex: '1',
            minWidth: '200px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                backgroundColor: '#2a1d4a', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {card.icon}
              </div>
              <span style={{ color: '#10b981', fontSize: '13px', fontWeight: '600' }}>{card.badge}</span>
            </div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff', marginBottom: '4px' }}>{card.valor}</div>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Ações Rápidas */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <Link href="/dashboard/pontos" style={{ textDecoration: 'none', flex: 1, minWidth: '200px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #7c3aed, #9d5cf6)',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
          }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff', marginBottom: '4px' }}>Gestão de Pontos</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>Gerenciar eletropostos</div>
            </div>
            <MapPin size={24} color="rgba(255,255,255,0.8)" />
          </div>
        </Link>

        <Link href="/dashboard/avaliacoes" style={{ textDecoration: 'none', flex: 1, minWidth: '200px' }}>
          <div style={{
            backgroundColor: '#1e1535',
            border: '1px solid #7c3aed',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
          }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff', marginBottom: '4px' }}>Curadoria</div>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>Revisar avaliações</div>
            </div>
            <Star size={24} color="#a78bfa" />
          </div>
        </Link>

        <Link href="/dashboard/relatorios" style={{ textDecoration: 'none', flex: 1, minWidth: '200px' }}>
          <div style={{
            backgroundColor: '#1e1535',
            border: '1px solid #7c3aed',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
          }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff', marginBottom: '4px' }}>Relatórios</div>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>Ver insights</div>
            </div>
            <Eye size={24} color="#a78bfa" />
          </div>
        </Link>
      </div>
    </div>
  );
}