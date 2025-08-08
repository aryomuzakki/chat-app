'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';

export default function useChats() {
  const params = useParams();

  const chatId = useMemo(() => (params?.chatId as string) || '', [params?.chatId]);

  const isActive = useMemo(() => !!chatId, [chatId]);

  return { chatId, isActive };
}
