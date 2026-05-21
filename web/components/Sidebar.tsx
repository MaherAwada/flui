'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, MapPin, Star, Car, FileText, Zap, Menu, X } from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: MapPin, label: 'Gestão de Pontos', href: '/dashboard/pontos' },
  { icon: Star, label: 'Avaliações', href: '/dashboard/avaliacoes' },
  { icon: Car, label: 'Gestão de EVs', href: '/dashboard/evs' },
  { icon: FileText, label: 'Relatórios', href: '/dashboard/relatorios' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div style={{ padding: '0 20px 32px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #7c3aed, #9d5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Zap size={20} color="#fff" />
          </div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#fff' }}>FLUI</div>
            <div style={{ fontSize: '11px', color: '#6b7280' }}>Admin Dashboard</div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav style={{ flex: 1, padding: '0 10px' }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 14px', borderRadius: '10px', marginBottom: '4px',
                backgroundColor: isActive ? '#7c3aed' : 'transparent',
                color: isActive ? '#fff' : '#B8B8C2',
                cursor: 'pointer', fontSize: '14px',
              }}>
                <Icon size={18} color={isActive ? '#fff' : '#B8B8C2'} />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Voltar ao Início */}
      <div style={{ padding: '16px 10px' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{
            backgroundColor: '#2A1240', borderRadius: '10px', padding: '10px',
            textAlign: 'center', color: '#D6A8FF', fontSize: '14px', cursor: 'pointer',
          }}>
            Voltar ao Início
          </div>
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Botão hamburguer — só aparece em telas pequenas */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{
          display: 'none',
          position: 'fixed', top: '16px', left: '16px', zIndex: 1000,
          backgroundColor: '#1B062D', border: '1px solid #B14DFF33',
          borderRadius: '10px', padding: '8px', cursor: 'pointer',
        }}
        className="mobile-menu-btn"
      >
        {mobileOpen ? <X size={22} color="#fff" /> : <Menu size={22} color="#fff" />}
      </button>

      {/* Overlay — fundo escuro ao abrir no mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 998, display: 'none',
          }}
          className="mobile-overlay"
        />
      )}

      {/* Sidebar Desktop */}
      <aside
        className="sidebar-desktop"
        style={{
          width: '240px', minHeight: '100vh',
          backgroundColor: '#1B062D', borderRight: '1px solid #B14DFF33',
          display: 'flex', flexDirection: 'column', padding: '20px 0',
          position: 'fixed', left: 0, top: 0, zIndex: 999,
        }}
      >
        <SidebarContent />
      </aside>

      {/* Sidebar Mobile */}
      <aside
        className="sidebar-mobile"
        style={{
          width: '240px', minHeight: '100vh',
          backgroundColor: '#1B062D', borderRight: '1px solid #B14DFF33',
          display: 'flex', flexDirection: 'column', padding: '20px 0',
          position: 'fixed', left: mobileOpen ? 0 : '-240px', top: 0, zIndex: 999,
          transition: 'left 0.3s ease',
        }}
      >
        <SidebarContent />
      </aside>

      <style>{`
        @media (max-width: 768px) {
          .sidebar-desktop { display: none !important; }
          .sidebar-mobile { display: flex !important; }
          .mobile-menu-btn { display: block !important; }
          .mobile-overlay { display: block !important; }
        }
        @media (min-width: 769px) {
          .sidebar-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}