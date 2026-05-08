import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Zero Homeless Initiative Hub',
  description: "California's unified platform connecting people experiencing homelessness with every resource, service, and support they need — in real time.",
  keywords: ['homeless', 'housing', 'california', 'resources', 'shelter', 'case management'],
  openGraph: {
    title: 'The Zero Homeless Initiative Hub',
    description: 'Real-time resource matching for California communities',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#020617' }}>
        {children}
      </body>
    </html>
  );
}
