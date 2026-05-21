'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, MapPin, Star, Car, FileText } from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: MapPin, label: 'Gestão de Pontos', href: '/dashboard/pontos' },
  { icon: Star, label: 'Avaliações', href: '/dashboard/avaliacoes' },
  { icon: Car, label: 'Gestão de EVs', href: '/dashboard/evs' },
  { icon: FileText, label: 'Relatórios', href: '/dashboard/relatorios' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      width: '200px',
      minHeight: '100vh',
      backgroundColor: '#0d0a1a',
      borderRight: '1px solid #2a1d4a',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 0',
      position: 'fixed',
      left: 0,
      top: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '0 16px 32px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #7c3aed, #9d5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
          }}>⚡</div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#fff' }}>FLUI</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>Admin Dashboard</div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav style={{ flex: 1, padding: '0 8px' }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '10px',
                marginBottom: '4px',
                backgroundColor: isActive ? '#7c3aed' : 'transparent',
                color: isActive ? '#fff' : '#a78bfa',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '14px',
              }}>
                <Icon size={18} />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Voltar ao Início */}
      <div style={{ padding: '16px' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{
            backgroundColor: '#1e1535',
            border: '1px solid #2a1d4a',
            borderRadius: '10px',
            padding: '10px',
            textAlign: 'center',
            color: '#a78bfa',
            fontSize: '14px',
            cursor: 'pointer',
          }}>
            Voltar ao Início
          </div>
        </Link>
      </div>
    </aside>
  );
}