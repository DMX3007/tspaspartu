import '../styles/reset.scss'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </StrictMode>)
}
