import { Zap, MapPin, TrendingUp } from 'lucide-react';
import { relatorios } from '@/lib/data';

export default function Relatorios() {
  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>
        Relatórios Estratégicos
      </h1>
      <p style={{ color: '#6b7280', marginBottom: '32px' }}>Insights e análises da plataforma</p>

      {/* Card Recargas no Mês */}
      <div style={{
        backgroundColor: '#0d2e22',
        border: '1px solid #10b981',
        borderRadius: '16px',
        padding: '28px',
        marginBottom: '24px',
        display: 'inline-block',
        minWidth: '200px',
      }}>
        <Zap size={28} color="#10b981" style={{ marginBottom: '12px' }} />
        <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#fff', marginBottom: '4px' }}>
          {relatorios.recargasNoMes.toLocaleString('pt-BR')}
        </div>
        <div style={{ color: '#6b7280', fontSize: '14px' }}>Recargas no mês</div>
      </div>

      {/* Cards Inferiores */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {/* Regiões com Maior Demanda */}
        <div style={{
          flex: 1,
          minWidth: '280px',
          backgroundColor: '#1e1535',
          border: '1px solid #2a1d4a',
          borderRadius: '16px',
          padding: '24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <MapPin size={18} color="#a78bfa" />
            <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: '600' }}>Regiões com Maior Demanda</h3>
          </div>

          {relatorios.regioes.map((r, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#0d0a1a',
              borderRadius: '10px',
              padding: '14px 16px',
              marginBottom: '8px',
            }}>
              <div>
                <div style={{ color: '#fff', fontSize: '14px', fontWeight: '600' }}>{r.nome}</div>
                <div style={{ color: '#6b7280', fontSize: '12px' }}>{r.eletropostos} eletropostos</div>
              </div>
              <div style={{ color: '#fff', fontSize: '15px', fontWeight: '600' }}>
                {r.recargas.toLocaleString('pt-BR')}
              </div>
            </div>
          ))}
        </div>

        {/* Oportunidades de Expansão */}
        <div style={{
          flex: 1,
          minWidth: '280px',
          backgroundColor: '#1e1535',
          border: '1px solid #2a1d4a',
          borderRadius: '16px',
          padding: '24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <TrendingUp size={18} color="#a78bfa" />
            <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: '600' }}>Oportunidades de Expansão</h3>
          </div>

          {relatorios.oportunidades.map((o, i) => (
            <div key={i} style={{
              backgroundColor: '#0d0a1a',
              borderRadius: '10px',
              padding: '16px',
              marginBottom: '8px',
            }}>
              <div style={{ color: '#fff', fontSize: '14px', fontWeight: '600', marginBottom: '6px' }}>{o.regiao}</div>
              <div style={{ color: '#6b7280', fontSize: '13px', lineHeight: '1.5' }}>{o.descricao}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}