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
  const data = readLocalLeadership();
  return {
    ...data,
    source: 'local'
  };
}

export async function addLeader({ name, role }) {
  const data = readLocalLeadership();
  const currentExecutive = data.currentExecutive || [];
  const maxId = currentExecutive.reduce((acc, curr) => Math.max(acc, Number(curr.id) || 0), 0);
  const newLeader = {
    id: maxId + 1,
    name: name.trim(),
    role: role.trim()
  };
  currentExecutive.push(newLeader);
  data.currentExecutive = currentExecutive;
  writeLocalLeadership(data);
  return { success: true, leader: newLeader, data };
}

export async function updateLeader(id, { name, role }) {
  const data = readLocalLeadership();
  const currentExecutive = data.currentExecutive || [];
  const index = currentExecutive.findIndex((l) => Number(l.id) === Number(id));
  if (index === -1) {
    return { success: false, error: 'Leader not found' };
  }
  if (name) currentExecutive[index].name = name.trim();
  if (role) currentExecutive[index].role = role.trim();
  data.currentExecutive = currentExecutive;
  writeLocalLeadership(data);
  return { success: true, leader: currentExecutive[index], data };
}

export async function removeLeader(id) {
  const data = readLocalLeadership();
  const currentExecutive = data.currentExecutive || [];
  const index = currentExecutive.findIndex((l) => Number(l.id) === Number(id));
  if (index === -1) {
    return { success: false, error: 'Leader not found' };
  }

  const removedLeader = currentExecutive[index];
  currentExecutive.splice(index, 1);
  data.currentExecutive = currentExecutive;

  // Move leader to appropriate past list per Consortium rules
  const roleLower = (removedLeader.role || '').toLowerCase();
  const leaderName = removedLeader.name;

  let movedTo = 'Past Executive Members';
  if (roleLower.includes('president') && !roleLower.includes('vice')) {
    if (!data.pastPresidents) data.pastPresidents = [];
    if (!data.pastPresidents.includes(leaderName)) {
      data.pastPresidents.push(leaderName);
    }
    movedTo = 'Past Presidents';
  } else if (roleLower.includes('treasurer')) {
    if (!data.pastTreasurers) data.pastTreasurers = [];
    if (!data.pastTreasurers.includes(leaderName)) {
      data.pastTreasurers.push(leaderName);
    }
    movedTo = 'Past Treasurers';
  } else if (roleLower.includes('vice')) {
    if (!data.pastVicePresidents) data.pastVicePresidents = [];
    if (!data.pastVicePresidents.includes(leaderName)) {
      data.pastVicePresidents.push(leaderName);
    }
    movedTo = 'Past Vice-Presidents';
  } else {
    if (!data.pastMembers) data.pastMembers = [];
    const formattedEntry = `${leaderName} (${removedLeader.role})`;
    if (!data.pastMembers.includes(formattedEntry) && !data.pastMembers.includes(leaderName)) {
      data.pastMembers.push(formattedEntry);
    }
    movedTo = 'Past Executive Members';
  }

  writeLocalLeadership(data);
  return { 
    success: true, 
    removedLeader, 
    movedTo,
    data 
  };
}

