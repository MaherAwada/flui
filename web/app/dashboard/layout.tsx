import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0d0a1a' }}>
      <Sidebar />
      <main style={{
        marginLeft: '200px',
        flex: 1,
        padding: '40px',
        minHeight: '100vh',
      }}>
        {children}
      </main>
    </div>
  );
}