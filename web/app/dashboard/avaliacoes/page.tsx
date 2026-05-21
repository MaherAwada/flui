'use client';

import { useState } from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { avaliacoes as avaliacoesData } from '@/lib/data';

export default function Avaliacoes() {
  const [avaliacoes, setAvaliacoes] = useState(avaliacoesData);

  const aprovar = (id: number) => {
    setAvaliacoes(prev =>
      prev.map(a => a.id === id ? { ...a, aprovado: true } : a)
    );
  };

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>
        Avaliações e Curadoria
      </h1>
      <p style={{ color: '#6b7280', marginBottom: '32px' }}>Revisar e moderar comentários dos usuários</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {avaliacoes.map((a) => (
          <div key={a.id} style={{
            backgroundColor: '#1e1535',
            border: '1px solid #2a1d4a',
            borderRadius: '16px',
            padding: '24px',
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div>
                <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                  {a.eletroposto}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '13px' }}>
                  <span>{a.autor}</span>
                  <span>•</span>
                  <span>{a.tempo}</span>
                </div>
              </div>
              {/* Estrelas */}
              <div style={{ display: 'flex', gap: '2px' }}>
                {[1, 2, 3, 4, 5].map(s => (
                  <Star
                    key={s}
                    size={18}
                    color="#f59e0b"
                    fill={s <= a.estrelas ? '#f59e0b' : 'transparent'}
                  />
                ))}
              </div>
            </div>

            {/* Comentário */}
            <p style={{ color: '#a78bfa', fontSize: '14px', marginBottom: '16px', fontStyle: 'italic' }}>
              "{a.comentario}"
            </p>

            {/* Botão */}
            {a.aprovado ? (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#0d2e22',
                border: '1px solid #10b981',
                borderRadius: '8px',
                padding: '8px 16px',
                color: '#10b981',
                fontSize: '13px',
                fontWeight: '600',
              }}>
                <CheckCircle size={14} />
                Aprovado
              </div>
            ) : (
              <button
                onClick={() => aprovar(a.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#0d2e22',
                  border: '1px solid #10b981',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  color: '#10b981',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}>
                <CheckCircle size={14} />
                Aprovar
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}