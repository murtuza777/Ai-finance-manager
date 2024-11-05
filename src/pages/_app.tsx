import { AuthProvider } from '@/contexts/AuthContext';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { Toaster } from '@/components/ui/toaster';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <Toaster />
    </AuthProvider>
  );
}

export default MyApp; 