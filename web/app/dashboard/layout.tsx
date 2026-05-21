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
      }}
        className="dashboard-main"
      >
        {children}
      </main>
      <style>{`
        @media (max-width: 768px) {
          .dashboard-main {
            margin-left: 0 !important;
            padding: 20px !important;
            padding-top: 64px !important;
          }
        }
      `}</style>
    </div>
  );
}