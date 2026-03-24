import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
}

const supabase = createClient(
  supabaseUrl,
  supabaseServiceRoleKey
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function publish() {
  const rawData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../src/data/raw_data.json'), 'utf8'));

  console.log('Publishing to Supabase...');

  const theoriesPayload = rawData.theories.map((t: any) => ({
    title: t.title ?? t.name,
    slug: t.slug ?? t.id,
    category: t.category ?? null,
    overview: t.overview ?? t.summary ?? null,
    history: t.history ?? t.historicalContext ?? null,
    description: t.description ?? null,
    color: t.color ?? null,
    key_points: t.key_points ?? t.keyPoints ?? null,
    key_thinkers: t.key_thinkers ?? t.keyThinkers ?? null,
    representative_films: t.representative_films ?? t.representativeFilms ?? null,
    citations: t.citations ?? null,
    status: 'published',
  }));

  const vocabularyPayload = rawData.vocabulary.map((v: any) => ({
    term: v.term,
    definition: v.definition,
    pronunciation: v.pronunciation ?? null,
    etymology: v.etymology ?? null,
    example_usage: v.example_usage ?? v.usageExample ?? null,
    difficulty: v.difficulty ?? null,
    tags: v.tags ?? v.categories ?? null,
    related_terms: v.related_terms ?? v.relatedTerms ?? null,
    related_theories: v.related_theories ?? v.relatedTheories ?? null,
    featured: v.featured ?? false,
    status: 'published',
  }));

  const filmsPayload = rawData.films.map((f: any) => ({
    title: f.title,
    film_id: f.id ?? null,
    year: f.year ?? null,
    director: f.director ?? null,
    synopsis: f.synopsis ?? f.description ?? null,
    poster_url: f.poster ?? null,
    relevant_theories: f.relevant_theories ?? f.relevantTheories ?? null,
  }));

  const theoristsPayload = (rawData.theorists ?? []).map((th: any) => ({
    id: th.id,
    name: th.name,
    birth_year: th.birthYear ?? null,
    death_year: th.deathYear ?? null,
    nationality: th.nationality ?? null,
    bio: th.bio ?? null,
    key_works: th.key_works ?? th.keyWorks ?? null,
    associated_theories: th.associated_theories ?? th.associatedTheories ?? null,
    image: th.image ?? null,
    key_contributions: th.key_contributions ?? th.keyContributions ?? null,
    status: 'published',
  }));

  const citationsPayload = (rawData.citations ?? []).map((c: any) => ({
    id: c.id,
    type: c.type ?? null,
    title: c.title,
    author: c.author ?? null,
    theory_ids: c.theory_ids ?? c.theoryIds ?? null,
    description: c.description ?? null,
    academic_significance: c.academic_significance ?? c.academicSignificance ?? null,
    key_quotes: c.key_quotes ?? c.keyQuotes ?? null,
    critiques: c.critiques ?? null,
    key_concepts_explained: c.key_concepts_explained ?? c.keyConceptsExplained ?? null,
    status: 'published',
  }));

  // 1. Theories
  const { error: tErr } = await supabase.from('theories').upsert(
    theoriesPayload,
    { onConflict: 'slug' }
  ) as { data: any[] | null; error: any };
  console.log('Theories:', tErr ? `Error: ${tErr.message}` : `${theoriesPayload.length} rows processed`);
  if (tErr) console.error(tErr);

  // 2. Vocabulary
  const { error: vErr } = await supabase.from('vocabulary_terms').upsert(
    vocabularyPayload,
    { onConflict: 'term' }
  ) as { data: any[] | null; error: any };
  console.log('Vocabulary:', vErr ? `Error: ${vErr.message}` : `${vocabularyPayload.length} rows processed`);
  if (vErr) console.error(vErr);

  // 3. Films (upsert so re-running the script does not violate unique film_id)
  const { error: fErr } = await supabase.from('films').upsert(
    filmsPayload,
    { onConflict: 'film_id' }
  );
  console.log('Films:', fErr ? `Error: ${fErr.message}` : `${filmsPayload.length} rows processed`);
  if (fErr) console.error(fErr);

  // 4. Theorists
  if (theoristsPayload.length > 0) {
    const { error: thErr } = await supabase.from('theorists').upsert(
      theoristsPayload,
      { onConflict: 'id' }
    );
    console.log('Theorists:', thErr ? `Error: ${thErr.message}` : `${theoristsPayload.length} rows processed`);
    if (thErr) console.error(thErr);
  }

  // 5. Citations
  if (citationsPayload.length > 0) {
    const { error: cErr } = await supabase.from('citations').upsert(
      citationsPayload,
      { onConflict: 'id' }
    );
    console.log('Citations:', cErr ? `Error: ${cErr.message}` : `${citationsPayload.length} rows processed`);
    if (cErr) console.error(cErr);
  }

  console.log('\n✅ Data publishing complete!');
}

publish();