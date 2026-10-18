import { supabase, isSupabaseConfigured } from './supabase';
import fs from 'fs';
import path from 'path';

const localDataPath = path.join(process.cwd(), 'data', 'members.json');

function readLocalMembers() {
  try {
    const raw = fs.readFileSync(localDataPath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading local members:', err);
    return [];
  }
}

function writeLocalMembers(members) {
  try {
    fs.writeFileSync(localDataPath, JSON.stringify(members, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing local members:', err);
    return false;
  }
}

export async function getMembers({ search = '', state = 'ALL', page = 1, limit = 50 } = {}) {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('members').select('*', { count: 'exact' });

      if (state && state !== 'ALL') {
        query = query.eq('state_code', state);
      }

      if (search) {
        query = query.or(
          `name.ilike.%${search}%,membership_id.ilike.%${search}%,institution_location.ilike.%${search}%,designation.ilike.%${search}%`
        );
      }

      const from = (page - 1) * limit;
      const to = from + limit - 1;

      const { data, count, error } = await query
        .order('id', { ascending: true })
        .range(from, to);

      if (!error && data) {
        return {
          members: data,
          total: count || 0,
          page,
          totalPages: Math.ceil((count || 0) / limit),
          source: 'supabase',
        };
      }
      console.warn('Supabase query failed, falling back to local:', error);
    } catch (err) {
      console.warn('Supabase fetch error, fallback to local:', err);
    }
  }

  // Fallback to local JSON
  const allMembers = readLocalMembers();

  let filtered = allMembers;
  if (state && state !== 'ALL') {
    filtered = filtered.filter((m) => m.state_code === state);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (m) =>
        (m.name && m.name.toLowerCase().includes(q)) ||
        (m.membership_id && m.membership_id.toLowerCase().includes(q)) ||
        (m.institution_location && m.institution_location.toLowerCase().includes(q)) ||
        (m.designation && m.designation.toLowerCase().includes(q))
    );
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return {
    members: paginated,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    source: 'local',
  };
}

export async function addMember(member) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('members').insert([member]).select().single();
      if (!error && data) {
        return { success: true, member: data, source: 'supabase' };
      }
      console.warn('Supabase insert failed, fallback to local:', error);
    } catch (err) {
      console.warn('Supabase insert error, fallback to local:', err);
    }
  }

  const allMembers = readLocalMembers();
  const newId = allMembers.length > 0 ? Math.max(...allMembers.map((m) => m.id || 0)) + 1 : 1;
  const newMember = {
    ...member,
    id: newId,
    is_active: true,
    created_at: new Date().toISOString(),
  };

  allMembers.push(newMember);
  writeLocalMembers(allMembers);

  return { success: true, member: newMember, source: 'local' };
}

export async function updateMember(id, updates) {
  const numId = Number(id);

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('members')
        .update(updates)
        .eq('id', numId)
        .select()
        .single();
      if (!error && data) {
        return { success: true, member: data, source: 'supabase' };
      }
      console.warn('Supabase update failed, fallback to local:', error);
    } catch (err) {
      console.warn('Supabase update error, fallback to local:', err);
    }
  }

  const allMembers = readLocalMembers();
  const index = allMembers.findIndex((m) => m.id === numId);
  if (index === -1) {
    return { success: false, error: 'Member not found' };
  }

  allMembers[index] = { ...allMembers[index], ...updates };
  writeLocalMembers(allMembers);

  return { success: true, member: allMembers[index], source: 'local' };
}

export async function deleteMember(id) {
  const numId = Number(id);

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('members').delete().eq('id', numId);
      if (!error) {
        return { success: true, source: 'supabase' };
      }
      console.warn('Supabase delete failed, fallback to local:', error);
    } catch (err) {
      console.warn('Supabase delete error, fallback to local:', err);
    }
  }

  const allMembers = readLocalMembers();
  const filtered = allMembers.filter((m) => m.id !== numId);
  if (filtered.length === allMembers.length) {
    return { success: false, error: 'Member not found' };
  }

  writeLocalMembers(filtered);
  return { success: true, source: 'local' };
}
