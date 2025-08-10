import { checkEnvVars } from '@/lib/utils/checkEnvVars';
import type { NextConfig } from 'next';

checkEnvVars([
  'CONVEX_DEPLOYMENT',
  'NEXT_PUBLIC_CONVEX_URL',
  'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
  'CLERK_SECRET_KEY',
  'CLERK_WEBHOOK_SECRET',
  'NEXT_PUBLIC_CLERK_FRONTEND_API_URL',
]);

const isProd = process.env.NEXT_PUBLIC_APP_URL
  ? process.env.NEXT_PUBLIC_APP_URL.startsWith('https://') && process.env.NODE_ENV === 'production'
  : process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    removeConsole: process.env.HIDE_CONSOLE === 'true' || isProd,
  },
};

export default nextConfig;
