import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0A0514' }}>
      <Sidebar />
      <main style={{
        marginLeft: '240px',
        flex: 1,
        padding: '40px',
        minHeight: '100vh',
        backgroundColor: '#0A0514',
      }}>
        {children}
      </main>
    </div>
  );
}