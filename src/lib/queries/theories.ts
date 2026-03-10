import { supabase } from '../supabase/client';
import type { Theory } from '../../types/theory';
import type { Database } from '../../types/database.types';


type TheoryRow = Database['public']['Tables']['theories']['Row'];

function asStringArray(value: TheoryRow['key_points']): string[] | null {
  if (!Array.isArray(value)) return null;
  const allStrings = value.every((entry) => typeof entry === 'string');
  return allStrings ? (value as string[]) : null;
}

function toTheory(row: TheoryRow): Theory {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    overview: row.overview,
    history: row.history,
    key_points: asStringArray(row.key_points),
    key_thinkers: asStringArray(row.key_thinkers),
    representative_films: asStringArray(row.representative_films),
    citations: asStringArray(row.citations),
    status: row.status === 'published' ? 'published' : 'draft',
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export async function fetchTheories(params: { q?: string; category?: string }): Promise<Theory[]> {
  let query = supabase.from('theories').select('*').eq('status', 'published');

  if (params.category) {
    query = query.eq('category', params.category);
  }

  if (params.q) {
    query = query.ilike('title', `%${params.q}%`);
  }

  const { data, error } = await query.order('title');
  if (error) throw error;
  const rows = (data ?? []) as TheoryRow[];
  return rows.map(toTheory);
}

export async function fetchTheoryBySlug(slug: string): Promise<Theory> {
  const { data, error } = await supabase
    .from('theories')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) throw error;
  return toTheory(data as TheoryRow);
}
