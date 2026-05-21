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
      <h1 style={{ fontSize: '28px', fontWeight: '400', color: '#fff', marginBottom: '8px' }}>
        Avaliações e Curadoria
      </h1>
      <p style={{ color: '#B8B8C2', marginBottom: '32px' }}>Revisar e moderar comentários dos usuários</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {avaliacoes.map((a) => (
          <div key={a.id} style={{
            backgroundColor: '#1B062D',
            border: '1px solid #B14DFF33',
            borderRadius: '16px',
            padding: '24px',
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div>
                <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: '400', marginBottom: '4px' }}>
                  {a.eletroposto}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#B8B8C2', fontSize: '13px' }}>
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
                    color="#FFC857"
                    fill={s <= a.estrelas ? '#FFC857' : 'transparent'}
                  />
                ))}
              </div>
            </div>

            {/* Comentário */}
            <p style={{ color: '#D6A8FF', fontSize: '14px', marginBottom: '16px' }}>
              "{a.comentario}"
            </p>

            {/* Botão */}
            {a.aprovado ? (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#2DFFB433',
                border: '1px solid #2DFFB44D',
                borderRadius: '8px',
                padding: '8px 16px',
                color: '#2DFFB4',
                fontSize: '13px',
                fontWeight: '600',
              }}>
                <CheckCircle size={14} color="#2DFFB4" />
                Aprovado
              </div>
            ) : (
              <button
                onClick={() => aprovar(a.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#2DFFB433',
                  border: '1px solid #2DFFB44D',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  color: '#2DFFB4',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}>
                <CheckCircle size={14} color="#2DFFB4" />
                Aprovar
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}