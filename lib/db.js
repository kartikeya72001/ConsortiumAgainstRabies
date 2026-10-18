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

const localApplicationsPath = path.join(process.cwd(), 'data', 'applications.json');

function readLocalApplications() {
  try {
    if (!fs.existsSync(localApplicationsPath)) {
      fs.writeFileSync(localApplicationsPath, '[]', 'utf8');
      return [];
    }
    const raw = fs.readFileSync(localApplicationsPath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading local applications:', err);
    return [];
  }
}

function writeLocalApplications(apps) {
  try {
    fs.writeFileSync(localApplicationsPath, JSON.stringify(apps, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing local applications:', err);
    return false;
  }
}

export async function getApplications() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('membership_applications')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        return { applications: data, source: 'supabase' };
      }
    } catch (e) {
      console.warn('Supabase fetch applications fallback:', e);
    }
  }
  return { applications: readLocalApplications(), source: 'local' };
}

export async function addApplication(appData) {
  const reference = 'CAR-APP-' + Math.floor(100000 + Math.random() * 900000);
  const newApp = {
    ...appData,
    reference,
    status: 'pending',
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('membership_applications')
        .insert([newApp])
        .select()
        .single();
      if (!error && data) {
        return { success: true, application: data, source: 'supabase' };
      }
    } catch (e) {
      console.warn('Supabase insert application fallback:', e);
    }
  }

  const all = readLocalApplications();
  newApp.id = all.length > 0 ? Math.max(...all.map((a) => a.id || 0)) + 1 : 1;
  all.unshift(newApp);
  writeLocalApplications(all);

  return { success: true, application: newApp, source: 'local' };
}

export async function updateApplication(id, updates) {
  const numId = Number(id);
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('membership_applications')
        .update(updates)
        .eq('id', numId)
        .select()
        .single();
      if (!error && data) {
        return { success: true, application: data, source: 'supabase' };
      }
    } catch (e) {
      console.warn('Supabase update application fallback:', e);
    }
  }

  const all = readLocalApplications();
  const index = all.findIndex((a) => a.id === numId || a.reference === id);
  if (index === -1) {
    return { success: false, error: 'Application not found' };
  }
  all[index] = { ...all[index], ...updates };
  writeLocalApplications(all);
  return { success: true, application: all[index], source: 'local' };
}

export async function approveApplication(id) {
  const appsResult = await getApplications();
  const app = appsResult.applications.find((a) => a.id === Number(id) || a.reference === id);
  if (!app) {
    return { success: false, error: 'Application not found' };
  }

  const stateCodeMap = {
    'Delhi': 'DL',
    'Uttar Pradesh': 'UP',
    'Uttarakhand': 'UK',
    'Haryana': 'HR',
    'Himachal Pradesh': 'HP',
    'Rajasthan': 'RJ',
    'Madhya Pradesh': 'MP',
    'Maharashtra': 'MH',
    'Karnataka': 'KA',
    'Tamil Nadu': 'TN',
    'West Bengal': 'WB',
    'Punjab': 'PB',
    'Jammu & Kashmir': 'JK',
  };
  const stCode = stateCodeMap[app.state] || 'IN';

  const membersRes = await getMembers({ limit: 1000 });
  const total = membersRes.total || 179;
  const nextNum = String(total + 1).padStart(3, '0');
  const membershipId = `${stCode}/CAR/${nextNum}`;

  const newMember = {
    membership_id: membershipId,
    name: app.fullName,
    designation: app.designation || 'Medical Officer',
    institution_location: `${app.institution ? app.institution + ', ' : ''}${app.city || ''}`,
    state_code: stCode,
    qualification: app.qualification || '',
    is_active: true
  };

  await addMember(newMember);

  await updateApplication(id, { 
    status: 'approved', 
    approved_membership_id: membershipId,
    approved_at: new Date().toISOString()
  });

  return { success: true, member: newMember, membershipId };
}

// ============================================================================
// LEADERSHIP & GOVERNING BODY DATA MANAGEMENT
// ============================================================================

const localLeadershipPath = path.join(process.cwd(), 'data', 'office_bearers.json');

function readLocalLeadership() {
  try {
    const raw = fs.readFileSync(localLeadershipPath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading local leadership:', err);
    return {
      currentExecutive: [],
      pastPresidents: [],
      pastTreasurers: [],
      pastVicePresidents: [],
      pastMembers: [],
      messages: []
    };
  }
}

function writeLocalLeadership(data) {
  try {
    fs.writeFileSync(localLeadershipPath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing local leadership:', err);
    return false;
  }
}

export async function getLeadership() {
  const localData = readLocalLeadership();

  if (isSupabaseConfigured && supabase) {
    try {
      const [leadRes, pastRes] = await Promise.all([
        supabase.from('leadership').select('*').order('display_order', { ascending: true }),
        supabase.from('past_leadership').select('*').order('display_order', { ascending: true })
      ]);

      if (!leadRes.error && leadRes.data && leadRes.data.length > 0) {
        const currentExecutive = leadRes.data.map((l) => ({
          id: l.id,
          name: l.name,
          role: l.role,
          image: l.image || null,
          display_order: l.display_order
        }));

        const pastData = pastRes.data || [];
        const pastPresidents = pastData
          .filter((p) => p.category === 'presidents')
          .map((p) => p.name);
        const pastTreasurers = pastData
          .filter((p) => p.category === 'treasurers')
          .map((p) => p.name);
        const pastVicePresidents = pastData
          .filter((p) => p.category === 'vice_presidents')
          .map((p) => p.name);
        const pastMembers = pastData
          .filter((p) => p.category === 'members' || !['presidents', 'treasurers', 'vice_presidents'].includes(p.category))
          .map((p) => p.former_role ? `${p.name} (${p.former_role})` : p.name);

        return {
          currentExecutive,
          pastPresidents: pastPresidents.length > 0 ? pastPresidents : (localData.pastPresidents || []),
          pastTreasurers: pastTreasurers.length > 0 ? pastTreasurers : (localData.pastTreasurers || []),
          pastVicePresidents: pastVicePresidents.length > 0 ? pastVicePresidents : (localData.pastVicePresidents || []),
          pastMembers: pastMembers.length > 0 ? pastMembers : (localData.pastMembers || []),
          messages: localData.messages || [],
          patron: localData.patron || {},
          source: 'supabase'
        };
      }
      if (leadRes.error) {
        console.warn('Supabase leadership query failed, fallback to local:', leadRes.error);
      }
    } catch (err) {
      console.warn('Supabase getLeadership error, fallback to local:', err);
    }
  }

  return {
    ...localData,
    source: 'local'
  };
}

export async function addLeader({ name, role, image }) {
  const trimmedName = (name || '').trim();
  const trimmedRole = (role || '').trim();
  const imgPath = image ? image.trim() : null;

  if (isSupabaseConfigured && supabase) {
    try {
      const { data: currentRows } = await supabase.from('leadership').select('display_order, id');
      const maxOrder = (currentRows || []).reduce((max, r) => Math.max(max, r.display_order || 0), 0);
      const nextOrder = maxOrder + 1;

      const { data, error } = await supabase
        .from('leadership')
        .insert([{
          name: trimmedName,
          role: trimmedRole,
          image: imgPath,
          display_order: nextOrder,
          is_active: true
        }])
        .select()
        .single();

      if (!error && data) {
        // Also sync local JSON
        const localData = readLocalLeadership();
        if (!localData.currentExecutive) localData.currentExecutive = [];
        localData.currentExecutive.push({
          id: data.id,
          name: data.name,
          role: data.role,
          image: data.image
        });
        writeLocalLeadership(localData);

        return { success: true, leader: data, source: 'supabase' };
      }
      console.warn('Supabase addLeader error, fallback to local:', error);
    } catch (err) {
      console.warn('Supabase addLeader exception:', err);
    }
  }

  // Local fallback
  const data = readLocalLeadership();
  const currentExecutive = data.currentExecutive || [];
  const maxId = currentExecutive.reduce((acc, curr) => Math.max(acc, Number(curr.id) || 0), 0);
  const newLeader = {
    id: maxId + 1,
    name: trimmedName,
    role: trimmedRole,
    image: imgPath
  };
  currentExecutive.push(newLeader);
  data.currentExecutive = currentExecutive;
  writeLocalLeadership(data);
  return { success: true, leader: newLeader, data, source: 'local' };
}

export async function updateLeader(id, { name, role, image }) {
  const numId = Number(id);
  const updates = {};
  if (name !== undefined) updates.name = name.trim();
  if (role !== undefined) updates.role = role.trim();
  if (image !== undefined) updates.image = image ? image.trim() : null;
  updates.updated_at = new Date().toISOString();

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('leadership')
        .update(updates)
        .eq('id', numId)
        .select()
        .single();

      if (!error && data) {
        const localData = readLocalLeadership();
        const currentExecutive = localData.currentExecutive || [];
        const idx = currentExecutive.findIndex((l) => Number(l.id) === numId);
        if (idx !== -1) {
          currentExecutive[idx] = { ...currentExecutive[idx], ...updates };
          localData.currentExecutive = currentExecutive;
          writeLocalLeadership(localData);
        }
        return { success: true, leader: data, source: 'supabase' };
      }
      console.warn('Supabase updateLeader failed:', error);
    } catch (err) {
      console.warn('Supabase updateLeader error:', err);
    }
  }

  // Local fallback
  const data = readLocalLeadership();
  const currentExecutive = data.currentExecutive || [];
  const index = currentExecutive.findIndex((l) => Number(l.id) === numId);
  if (index === -1) {
    return { success: false, error: 'Leader not found' };
  }
  currentExecutive[index] = { ...currentExecutive[index], ...updates };
  data.currentExecutive = currentExecutive;
  writeLocalLeadership(data);
  return { success: true, leader: currentExecutive[index], data, source: 'local' };
}

export async function removeLeader(id) {
  const numId = Number(id);
  let removedLeader = null;
  let category = 'members';
  let movedTo = 'Past Executive Members';

  if (isSupabaseConfigured && supabase) {
    try {
      const { data: leader } = await supabase
        .from('leadership')
        .select('*')
        .eq('id', numId)
        .single();

      if (leader) {
        removedLeader = leader;
        const roleLower = (leader.role || '').toLowerCase();
        if (roleLower.includes('president') && !roleLower.includes('vice')) {
          category = 'presidents';
          movedTo = 'Past Presidents';
        } else if (roleLower.includes('treasurer')) {
          category = 'treasurers';
          movedTo = 'Past Treasurers';
        } else if (roleLower.includes('vice')) {
          category = 'vice_presidents';
          movedTo = 'Past Vice-Presidents';
        } else {
          category = 'members';
          movedTo = 'Past Executive Members';
        }

        await supabase
          .from('past_leadership')
          .insert([{
            name: leader.name,
            category,
            former_role: leader.role,
            display_order: 99
          }]);

        await supabase
          .from('leadership')
          .delete()
          .eq('id', numId);
      }
    } catch (err) {
      console.warn('Supabase removeLeader exception:', err);
    }
  }

  // Sync / Fallback local
  const data = readLocalLeadership();
  const currentExecutive = data.currentExecutive || [];
  const index = currentExecutive.findIndex((l) => Number(l.id) === numId);
  if (index !== -1) {
    if (!removedLeader) removedLeader = currentExecutive[index];
    currentExecutive.splice(index, 1);
    data.currentExecutive = currentExecutive;

    const roleLower = (removedLeader.role || '').toLowerCase();
    const leaderName = removedLeader.name;

    if (roleLower.includes('president') && !roleLower.includes('vice')) {
      if (!data.pastPresidents) data.pastPresidents = [];
      if (!data.pastPresidents.includes(leaderName)) data.pastPresidents.push(leaderName);
      movedTo = 'Past Presidents';
    } else if (roleLower.includes('treasurer')) {
      if (!data.pastTreasurers) data.pastTreasurers = [];
      if (!data.pastTreasurers.includes(leaderName)) data.pastTreasurers.push(leaderName);
      movedTo = 'Past Treasurers';
    } else if (roleLower.includes('vice')) {
      if (!data.pastVicePresidents) data.pastVicePresidents = [];
      if (!data.pastVicePresidents.includes(leaderName)) data.pastVicePresidents.push(leaderName);
      movedTo = 'Past Vice-Presidents';
    } else {
      if (!data.pastMembers) data.pastMembers = [];
      const entry = `${leaderName} (${removedLeader.role})`;
      if (!data.pastMembers.includes(entry)) data.pastMembers.push(entry);
      movedTo = 'Past Executive Members';
    }

    writeLocalLeadership(data);
  }

  if (!removedLeader) {
    return { success: false, error: 'Leader not found' };
  }

  return { 
    success: true, 
    removedLeader, 
    movedTo,
    data,
    source: isSupabaseConfigured ? 'supabase' : 'local'
  };
}

