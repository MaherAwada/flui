'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap } from 'lucide-react';
import { login } from '@/lib/api';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setErro('');
    try {
      const data = await login(email, senha);
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));
      router.push('/dashboard');
    } catch (err) {
      setErro('Email ou senha incorretos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#0A0514',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        backgroundColor: '#1B062D',
        border: '1px solid #B14DFF33',
        borderRadius: '20px',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', justifyContent: 'center' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #7c3aed, #9d5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Zap size={22} color="#fff" />
          </div>
          <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff' }}>FLUI</span>
        </div>

        <h1 style={{ color: '#fff', fontSize: '20px', fontWeight: '400', marginBottom: '8px', textAlign: 'center' }}>
          Acesso Administrativo
        </h1>
        <p style={{ color: '#B8B8C2', fontSize: '14px', textAlign: 'center', marginBottom: '32px' }}>
          Entre com suas credenciais para acessar o painel
        </p>

        {/* Email */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ color: '#B8B8C2', fontSize: '13px', marginBottom: '8px', display: 'block' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@flui.com"
            style={{
              width: '100%', backgroundColor: '#0A0514', border: '1px solid #B14DFF33',
              borderRadius: '10px', padding: '12px 16px', color: '#fff', fontSize: '14px',
              outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Senha */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ color: '#B8B8C2', fontSize: '13px', marginBottom: '8px', display: 'block' }}>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="••••••••"
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            style={{
              width: '100%', backgroundColor: '#0A0514', border: '1px solid #B14DFF33',
              borderRadius: '10px', padding: '12px 16px', color: '#fff', fontSize: '14px',
              outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Erro */}
        {erro && (
          <div style={{
            backgroundColor: '#2d0a0a', border: '1px solid #ff4444',
            borderRadius: '8px', padding: '10px 14px', marginBottom: '16px',
            color: '#ff6b6b', fontSize: '13px',
          }}>
            {erro}
          </div>
        )}

        {/* Botão */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%', backgroundColor: '#7c3aed', border: 'none',
            borderRadius: '10px', padding: '14px', color: '#fff',
            fontSize: '15px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        <p style={{ color: '#6b7280', fontSize: '12px', textAlign: 'center', marginTop: '16px' }}>
          Credenciais de teste: admin@flui.com / password
        </p>
      </div>
    </main>
  );
}