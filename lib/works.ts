/*
  ─────────────────────────────────────────────────────────────
  SQL — run once in the Supabase SQL editor to create the table
  ─────────────────────────────────────────────────────────────

  create extension if not exists "pgcrypto";

  create table if not exists projects (
    id               uuid primary key default gen_random_uuid(),
    title            text        not null,
    description      text        not null default '',
    long_description text,
    tagline          text,
    role             text,
    timeline         text,
    tags             text[]      not null default '{}',
    type             text        not null check (type in ('case-study', 'landing', 'brand-identity')),
    featured         boolean     not null default false,
    cover_image_url  text,
    logo_url         text,
    cta_label        text,
    cta_url          text,
    sort_order       integer     not null default 0,
    created_at       timestamptz not null default now()
  );

  -- Only one row should ever have featured = true.
  -- Enforce it with a partial unique index:
  create unique index if not exists projects_one_featured
    on projects (featured)
    where featured = true;

  -- RLS: allow public read access (portfolio is public)
  alter table projects enable row level security;

  create policy "Public read" on projects
    for select using (true);

  ─────────────────────────────────────────────────────────────
*/

import { supabase } from './supabase'
import type { Project, ProjectType } from '@/types/project'

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) throw new Error(error.message)
  return (data ?? []) as Project[]
}

export async function getFeaturedProject(): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .single()

  if (error) {
    // .single() throws PGRST116 when no rows found — treat as null
    if (error.code === 'PGRST116') return null
    throw new Error(error.message)
  }
  return data as Project
}

export async function getProjectsByType(type: ProjectType): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('type', type)
    .order('sort_order', { ascending: true })

  if (error) throw new Error(error.message)
  return (data ?? []) as Project[]
}
