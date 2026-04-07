import type { Json } from '../types/database.types';
import { supabase } from './supabase/client';

const ANON_USER_ID_KEY = 'anon_user_id';

function generateUuid(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  // RFC4122-ish fallback for older browsers.
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0;
    const value = char === 'x' ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}

export function getOrCreateAnonymousUserId(): string | null {
  if (typeof window === 'undefined') return null;

  const existing = localStorage.getItem(ANON_USER_ID_KEY);
  if (existing) return existing;

  const newId = generateUuid();
  localStorage.setItem(ANON_USER_ID_KEY, newId);
  return newId;
}

type TrackEventPayload = {
  eventType: string;
  relatedId?: string | null;
  relatedType?: string | null;
  metadata?: Json;
};

export async function trackEngagementEvent({
  eventType,
  relatedId = null,
  relatedType = null,
  metadata,
}: TrackEventPayload): Promise<void> {
  const anonymousUserId = getOrCreateAnonymousUserId();

  const metadataObject = metadata && typeof metadata === 'object' && !Array.isArray(metadata)
    ? (metadata as Record<string, Json | undefined>)
    : {};

  const mergedMetadata = {
    ...metadataObject,
    anon_user_id: anonymousUserId,
  } as Json;

  const { error } = await supabase.from('user_engagement').insert({
    user_id: null,
    event_type: eventType,
    related_id: relatedId,
    related_type: relatedType,
    metadata: mergedMetadata,
  });

  if (error) {
    // Keep this non-blocking for the user experience.
    console.error('Failed to record engagement event', error);
  }
}
