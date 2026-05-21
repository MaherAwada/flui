'use client';

import Link from 'next/link';
import { MapPin, Star, Eye } from 'lucide-react';
import { eletropostos } from '@/lib/data';

export default function Dashboard() {
  const scoreMedia = (eletropostos.reduce((acc, e) => acc + e.score, 0) / eletropostos.length).toFixed(1);

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: '400', color: '#fff', marginBottom: '8px' }}>
        Dashboard Administrativo
      </h1>
      <p style={{ color: '#B8B8C2', marginBottom: '32px' }}>Visão geral da plataforma FLUI</p>

      {/* Métricas */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '32px', flexWrap: 'wrap' }}>
        {[
          { icon: <MapPin size={22} color="#B14DFF" />, valor: '1,247', label: 'Total de Eletropostos', badge: '+12%' },
          { icon: <Star size={22} color="#B14DFF" />, valor: '1,089', label: 'Pontos Ativos', badge: '+8%' },
          { icon: <Star size={22} color="#B14DFF" />, valor: scoreMedia, label: 'Score Médio', badge: '+0.3' },
        ].map((card, i) => (
          <div key={i} style={{
            backgroundColor: '#1B062D',
            border: '1px solid #B14DFF33',
            borderRadius: '16px',
            padding: '24px',
            flex: '1',
            minWidth: '200px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                backgroundColor: '#B14DFF33', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {card.icon}
              </div>
              <span style={{ color: '#2DFFB4', fontSize: '13px', fontWeight: '600' }}>{card.badge}</span>
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
              <div style={{ fontSize: '16px', fontWeight: '400', color: '#fff', marginBottom: '4px' }}>Gestão de Pontos</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>Gerenciar eletropostos</div>
            </div>
            <MapPin size={24} color="#fff" />
          </div>
        </Link>

        <Link href="/dashboard/avaliacoes" style={{ textDecoration: 'none', flex: 1, minWidth: '200px' }}>
          <div style={{
            backgroundColor: '#1B062D',
            border: '2px solid #B14DFF',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
          }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '400', color: '#fff', marginBottom: '4px' }}>Curadoria</div>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>Revisar avaliações</div>
            </div>
            <Star size={24} color="#B14DFF" />
          </div>
        </Link>

        <Link href="/dashboard/relatorios" style={{ textDecoration: 'none', flex: 1, minWidth: '200px' }}>
          <div style={{
            backgroundColor: '#1B062D',
            border: '2px solid #B14DFF',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
          }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '400', color: '#fff', marginBottom: '4px' }}>Relatórios</div>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>Ver insights</div>
            </div>
            <Eye size={24} color="#B14DFF" />
          </div>
        </Link>
      </div>
    </div>
  );
}