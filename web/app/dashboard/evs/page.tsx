import { Car, Battery } from 'lucide-react';
import { evs } from '@/lib/data';

export default function GestaoEVs() {
  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>
        Gestão de Comparativos EV
      </h1>
      <p style={{ color: '#6b7280', marginBottom: '32px' }}>Cadastro e gerenciamento de modelos elétricos</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {evs.map((ev) => (
          <div key={ev.id} style={{
            backgroundColor: '#1e1535',
            border: '1px solid #2a1d4a',
            borderRadius: '16px',
            padding: '24px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              {/* Ícone + Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  backgroundColor: '#2a1d4a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Car size={24} color="#a78bfa" />
                </div>
                <div>
                  <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                    {ev.modelo}
                  </h3>
                  <span style={{ color: '#6b7280', fontSize: '13px' }}>{ev.ano}</span>
                </div>
              </div>

              {/* Preço + Score */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#a78bfa', fontSize: '20px', fontWeight: 'bold', marginBottom: '4px' }}>
                  R$ {ev.preco.toLocaleString('pt-BR')}
                </div>
                <div style={{ color: '#6b7280', fontSize: '13px' }}>Score: {ev.score}</div>
              </div>
            </div>

            {/* Specs */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{
                flex: 1,
                backgroundColor: '#0d0a1a',
                border: '1px solid #2a1d4a',
                borderRadius: '10px',
                padding: '12px 16px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <Battery size={14} color="#10b981" />
                  <span style={{ color: '#6b7280', fontSize: '12px' }}>Bateria</span>
                </div>
                <span style={{ color: '#fff', fontSize: '15px', fontWeight: '600' }}>{ev.bateria} kWh</span>
              </div>

              <div style={{
                flex: 1,
                backgroundColor: '#0d0a1a',
                border: '1px solid #2a1d4a',
                borderRadius: '10px',
                padding: '12px 16px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <span style={{ color: '#6b7280', fontSize: '12px' }}>Autonomia</span>
                </div>
                <span style={{ color: '#fff', fontSize: '15px', fontWeight: '600' }}>{ev.autonomia} km</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}