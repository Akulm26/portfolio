import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  // Check process.env first (for CI/CD), then fall back to .env files
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || env.GEMINI_API_KEY || env.API_KEY;

  // Debug logging
  console.log('Build mode:', mode);
  console.log('process.env.GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'SET' : 'NOT SET');
  console.log('process.env.API_KEY:', process.env.API_KEY ? 'SET' : 'NOT SET');
  console.log('env.GEMINI_API_KEY:', env.GEMINI_API_KEY ? 'SET' : 'NOT SET');
  console.log('env.API_KEY:', env.API_KEY ? 'SET' : 'NOT SET');
  console.log('Final apiKey:', apiKey ? `SET (length: ${apiKey.length})` : 'NOT SET');

  // Fail the build if API key is missing in production
  if (mode === 'production' && !apiKey) {
    console.error('❌ CRITICAL: GEMINI_API_KEY is not set for production build!');
    console.error('Please ensure the GitHub Secret is configured correctly.');
    throw new Error('GEMINI_API_KEY is required for production builds');
  }

  return {
    base: '/',
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(apiKey),
      'process.env.GEMINI_API_KEY': JSON.stringify(apiKey)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
