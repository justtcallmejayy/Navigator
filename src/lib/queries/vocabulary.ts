import type { Database } from '../../types/database.types';
import { supabase } from '../supabase/client';

type VocabularyRow = Database['public']['Tables']['vocabulary_terms']['Row'];

export type VocabularyTerm = {
  id: string;
  term: string;
  definition: string;
  example_usage: string | null;
  difficulty: string | null;
  tags: string[];
  related_terms: string[];
  pronunciation: string | null;
  etymology: string | null;
  related_theories: string[];
  featured: boolean;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
};

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string');
}

function toVocabularyTerm(row: VocabularyRow): VocabularyTerm {
  return {
    id: row.id,
    term: row.term,
    definition: row.definition,
    example_usage: row.example_usage,
    difficulty: row.difficulty,
    tags: asStringArray(row.tags),
    related_terms: asStringArray(row.related_terms),
    pronunciation: row.pronunciation,
    etymology: row.etymology,
    related_theories: Array.isArray(row.related_theories)
      ? row.related_theories.filter((item): item is string => typeof item === 'string')
      : [],
    featured: Boolean(row.featured),
    status: row.status === 'published' ? 'published' : 'draft',
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}