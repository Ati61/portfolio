import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google'; // Using next/font is also an option

// If you want to use next/font instead of a stylesheet link:
// const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '600', '700'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Remove any Head component with font stylesheets */}
      <Component {...pageProps} />
    </>
  );
}
