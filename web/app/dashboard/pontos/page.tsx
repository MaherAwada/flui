'use client';

import { useState } from 'react';
import { Search, MapPin, Star } from 'lucide-react';
import { eletropostos } from '@/lib/data';

export default function GestaoPontos() {
  const [busca, setBusca] = useState('');

  const filtrados = eletropostos.filter(e =>
    e.nome.toLowerCase().includes(busca.toLowerCase()) ||
    e.cidade.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>
        Gestão de Pontos de Recarga
      </h1>
      <p style={{ color: '#6b7280', marginBottom: '24px' }}>Gerenciar e monitorar eletropostos</p>

      {/* Busca */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: '#1e1535',
        border: '1px solid #2a1d4a',
        borderRadius: '12px',
        padding: '12px 16px',
        marginBottom: '24px',
      }}>
        <Search size={18} color="#6b7280" />
        <input
          type="text"
          placeholder="Buscar por nome, cidade, endereço..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#fff',
            fontSize: '14px',
            width: '100%',
          }}
        />
      </div>

      {/* Tabela */}
      <div style={{
        backgroundColor: '#1e1535',
        border: '1px solid #2a1d4a',
        borderRadius: '16px',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr auto',
          padding: '16px 24px',
          borderBottom: '1px solid #2a1d4a',
          color: '#6b7280',
          fontSize: '13px',
        }}>
          <span>Eletroposto</span>
          <span>Cidade</span>
          <span>Score</span>
        </div>

        {/* Rows */}
        {filtrados.map((e, i) => (
          <div key={e.id} style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr auto',
            padding: '18px 24px',
            borderBottom: i < filtrados.length - 1 ? '1px solid #2a1d4a' : 'none',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
            onMouseEnter={el => (el.currentTarget.style.backgroundColor = '#2a1d4a')}
            onMouseLeave={el => (el.currentTarget.style.backgroundColor = 'transparent')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={16} color="#7c3aed" />
              <span style={{ color: '#fff', fontSize: '14px' }}>{e.nome}</span>
            </div>
            <span style={{ color: '#a78bfa', fontSize: '14px' }}>{e.cidade} - {e.estado}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Star size={14} color="#f59e0b" fill="#f59e0b" />
              <span style={{ color: '#fff', fontSize: '14px', fontWeight: '600' }}>{e.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}