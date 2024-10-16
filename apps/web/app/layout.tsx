'use client';

import './global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@ui-kit/ui';

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
