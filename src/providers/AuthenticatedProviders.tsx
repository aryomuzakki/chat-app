'use client';

import { Authenticated } from 'convex/react';
import { ReactNode } from 'react';

export default function AuthenticatedProvider({ children }: { children: ReactNode }) {
  return <Authenticated>{children}</Authenticated>;
}
