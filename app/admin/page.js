'use client';

import { useState, useEffect } from 'react';
import { 
  Lock, 
  Users, 
  PlusCircle, 
  Edit2, 
  Trash2, 
  Search, 
  CheckCircle2, 
  Database, 
  Cloud, 
  Copy, 
  LogOut, 
  Save, 
  X,
  AlertCircle,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import initialMembers from '@/data/members.json';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  const [authError, setAuthError] = useState('');
  
  // Data state
  const [adminTab, setAdminTab] = useState('members'); // 'members' | 'applications'
  const [members, setMembers] = useState(initialMembers);
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [storageSource, setStorageSource] = useState('local'); // 'supabase' or 'local'
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [testingDb, setTestingDb] = useState(false);
  const [dbDiag, setDbDiag] = useState(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    membership_id: '',
    name: '',
    designation: '',
    institution_location: '',
    state_code: 'DL',
    state_name: 'Delhi'
  });

  // Check stored auth
  useEffect(() => {
    const savedToken = localStorage.getItem('car_admin_token');
    if (savedToken) {
      setIsAuthenticated(true);
      fetchMembers(savedToken);
      fetchApplications(savedToken);
    }
  }, []);

  const showNotify = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: secretKey }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('car_admin_token', data.token);
        setIsAuthenticated(true);
        fetchMembers(data.token);
        fetchApplications(data.token);
      } else {
        setAuthError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setAuthError('Connection error during login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('car_admin_token');
    setIsAuthenticated(false);
    setSecretKey('');
  };

  const fetchMembers = async (token) => {
    setLoading(true);
    try {
      const res = await fetch('/api/members?limit=1000');
      if (res.ok) {
        const data = await res.json();
        setMembers(data.members || initialMembers);
        setStorageSource(data.source || 'local');
      }
    } catch (err) {
      console.warn('Using local fallback members:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async (token) => {
    const adminToken = token || localStorage.getItem('car_admin_token');
    if (!adminToken) return;
    try {
      const res = await fetch('/api/apply', {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        setApplications(data.applications || []);
      }
    } catch (err) {
      console.warn('Failed to fetch applications:', err);
    }
  };

  const checkDbConnection = async () => {
    setTestingDb(true);
    try {
      const res = await fetch('/api/db-status');
      const data = await res.json();
      setDbDiag(data);
      if (data.status === 'connected') {
        setStorageSource('supabase');
        showNotify(`Supabase connected! Total records in DB: ${data.queryResult?.totalCount || 0}`);
        fetchMembers();
      } else {
        showNotify('Supabase not connected. Review diagnostics below.', 'error');
      }
    } catch (err) {
      showNotify('Failed to reach db-status API', 'error');
    } finally {
      setTestingDb(false);
    }
  };

  const handleApprove = async (appId) => {
    const token = localStorage.getItem('car_admin_token') || 'car_admin_2026_secure';
    try {
      const res = await fetch('/api/apply', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id: appId, action: 'approve' })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showNotify(data.message || 'Applicant approved and enrolled as Life Member!');
        fetchMembers(token);
        fetchApplications(token);
      } else {
        showNotify(data.error || 'Approval failed', 'error');
      }
    } catch (err) {
      showNotify('Network error during approval', 'error');
    }
  };

  const handleReject = async (appId) => {
    if (!confirm('Reject this application?')) return;
    const token = localStorage.getItem('car_admin_token') || 'car_admin_2026_secure';
    try {
      const res = await fetch('/api/apply', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id: appId, status: 'rejected' })
      });
      if (res.ok) {
        showNotify('Application archived/rejected');
        fetchApplications(token);
      }
    } catch (err) {
      showNotify('Network error', 'error');
    }
  };

  const handleOpenAdd = () => {
    // Generate next provisional membership ID
    const nextNum = String(members.length + 1).padStart(3, '0');
    setEditingMember(null);
    setFormData({
      membership_id: `DL/CAR/${nextNum}`,
      name: '',
      designation: '',
      institution_location: '',
      state_code: 'DL',
      state_name: 'Delhi'
    });
    setShowModal(true);
  };

  const handleOpenEdit = (m) => {
    setEditingMember(m);
    setFormData({
      membership_id: m.membership_id,
      name: m.name,
      designation: m.designation || '',
      institution_location: m.institution_location || '',
      state_code: m.state_code || 'DL',
      state_name: m.state_name || 'Delhi'
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to remove this member?')) return;
    const token = localStorage.getItem('car_admin_token') || 'car_admin_2026_secure';
    try {
      const res = await fetch(`/api/members?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setMembers(members.filter((m) => m.id !== id));
        showNotify('Member successfully deleted');
      } else {
        showNotify('Failed to delete member', 'error');
      }
    } catch (err) {
      showNotify('Error connecting to backend', 'error');
    }
  };

  const handleSaveMember = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('car_admin_token') || 'car_admin_2026_secure';

    try {
      if (editingMember) {
        // Update
        const res = await fetch('/api/members', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ id: editingMember.id, ...formData })
        });
        if (res.ok) {
          const data = await res.json();
          setMembers(members.map((m) => (m.id === editingMember.id ? data.member : m)));
          showNotify('Member updated successfully');
          setShowModal(false);
        } else {
          showNotify('Failed to update member', 'error');
        }
      } else {
        // Create
        const res = await fetch('/api/members', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          const data = await res.json();
          setMembers([data.member, ...members]);
          showNotify('New life member added successfully');
          setShowModal(false);
        } else {
          showNotify('Failed to add member', 'error');
        }
      }
    } catch (err) {
      showNotify('Error connecting to backend API', 'error');
    }
  };

  // Filter members
  const filtered = members.filter((m) => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      (m.name && m.name.toLowerCase().includes(q)) ||
      (m.membership_id && m.membership_id.toLowerCase().includes(q)) ||
      (m.institution_location && m.institution_location.toLowerCase().includes(q)) ||
      (m.designation && m.designation.toLowerCase().includes(q))
    );
  });

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', background: '#F8FAFC' }}>
        <div className="container" style={{ maxWidth: 460 }}>
          <div className="card" style={{ padding: '2.5rem', background: '#FFFFFF', boxShadow: 'var(--shadow-xl)' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--primary-subtle)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <Lock size={26} />
              </div>
              <h1 style={{ fontSize: '1.75rem', color: 'var(--primary-dark)', marginBottom: '0.4rem' }}>
                CAR Admin Portal
              </h1>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Protected management panel for Consortium Against Rabies secretariat.
              </p>
            </div>

            {authError && (
              <div style={{ background: '#FFF1F2', color: '#9F1239', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={16} /> {authError}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">Admin Secret Passphrase</label>
                <input
                  type="password"
                  required
                  className="form-control"
                  placeholder="Enter admin secret key"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  id="admin-secret-key-input"
                />
                <span style={{ fontSize: '0.775rem', color: 'var(--text-light)', marginTop: '0.3rem' }}>
                  Default local key: <code>car_admin_2026_secure</code> (set in <code>.env.local</code> / Vercel Env)
                </span>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: '0.75rem' }}
                id="admin-login-submit-btn"
              >
                Unlock Admin Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="section" style={{ background: '#F8FAFC', minHeight: '85vh', padding: '2.5rem 0' }}>
      <div className="container">
        {/* Notification Toast */}
        {notification && (
          <div style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 1000,
            background: notification.type === 'error' ? '#E11D48' : '#0D9488',
            color: '#FFFFFF',
            padding: '0.85rem 1.4rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: 600
          }}>
            <CheckCircle2 size={18} />
            {notification.msg}
          </div>
        )}

        {/* Dashboard Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge badge-teal" style={{ marginBottom: '0.4rem' }}>
              Secretariat Portal
            </span>
            <h1 style={{ fontSize: '2.2rem' }}>Administration Dashboard</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Manage life members, verify database connections, and update consortium records.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button 
              type="button"
              onClick={handleOpenAdd} 
              className="btn btn-teal"
              id="admin-add-member-btn"
            >
              <PlusCircle size={16} />
              Add New Life Member
            </button>
            <button 
              type="button"
              onClick={handleLogout} 
              className="btn btn-outline"
              id="admin-logout-btn"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {/* System & Architecture Status Strip */}
        <div className="grid-3" style={{ marginBottom: '2.5rem' }}>
          {/* Storage Status */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)' }}>Database Engine</span>
              <Database size={18} color="var(--primary)" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: storageSource === 'supabase' ? '#10B981' : '#F59E0B' }}></span>
                <strong style={{ fontSize: '1.05rem', color: 'var(--primary-dark)' }}>
                  {storageSource === 'supabase' ? 'Supabase PostgreSQL' : 'Local / Git Persistence'}
                </strong>
              </div>
              <button
                type="button"
                onClick={checkDbConnection}
                disabled={testingDb}
                className="btn btn-sm btn-outline"
                style={{ fontSize: '0.75rem', padding: '0.2rem 0.55rem', height: 'auto' }}
                title="Test Supabase connection"
              >
                {testingDb ? 'Testing...' : 'Test Connection'}
              </button>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.35rem' }}>
              {storageSource === 'supabase' 
                ? 'Connected to live Supabase PostgreSQL database' 
                : 'Using local store. Click Test Connection to verify Supabase in Vercel.'}
            </p>
            {dbDiag && (
              <div style={{ marginTop: '0.75rem', padding: '0.6rem', background: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <strong>Diagnostic Status:</strong>
                  <span style={{ color: dbDiag.status === 'connected' ? '#10B981' : '#EF4444', fontWeight: 600 }}>
                    {dbDiag.status.toUpperCase()}
                  </span>
                </div>
                <div>Detected Keys: {dbDiag.diagnostics?.activeKeys?.join(', ') || 'None found'}</div>
                {dbDiag.queryError && (
                  <div style={{ color: '#EF4444', marginTop: '0.25rem' }}>
                    Error: {dbDiag.queryError.message} (Code: {dbDiag.queryError.code || 'N/A'})
                  </div>
                )}
                {dbDiag.troubleshooting && (
                  <ul style={{ margin: '0.5rem 0 0 1rem', padding: 0, color: 'var(--text-muted)' }}>
                    {dbDiag.troubleshooting.map((tip, idx) => (
                      <li key={idx} style={{ marginBottom: '0.2rem' }}>{tip}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Members Counter */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)' }}>Active Members</span>
              <Users size={18} color="#0D9488" />
            </div>
            <strong style={{ fontSize: '1.75rem', color: 'var(--primary-dark)', display: 'block', lineHeight: 1.1 }}>
              {members.length}
            </strong>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.35rem' }}>
              Spanning 20+ States and Union Territories
            </p>
          </div>

          {/* Cloud Media / S3-Free Mode */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)' }}>Zero-Cost Cloud Assets</span>
              <Cloud size={18} color="#0284C7" />
            </div>
            <strong style={{ fontSize: '1.1rem', color: 'var(--primary-dark)', display: 'block' }}>
              No S3 Required ($0)
            </strong>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.35rem' }}>
              Supabase (1GB Free) & Cloudinary (25GB Free)
            </p>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setAdminTab('members')}
            style={{
              padding: '0.65rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              border: adminTab === 'members' ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
              background: adminTab === 'members' ? 'var(--primary)' : '#FFFFFF',
              color: adminTab === 'members' ? '#FFFFFF' : 'var(--text-main)',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <Users size={16} />
            Life Members Directory ({members.length})
          </button>

          <button
            type="button"
            onClick={() => setAdminTab('applications')}
            style={{
              padding: '0.65rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              border: adminTab === 'applications' ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
              background: adminTab === 'applications' ? 'var(--primary)' : '#FFFFFF',
              color: adminTab === 'applications' ? '#FFFFFF' : 'var(--text-main)',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <ShieldCheck size={16} />
            Membership Applications
            {applications.filter((a) => a.status === 'pending').length > 0 && (
              <span style={{ 
                background: '#E11D48', 
                color: '#FFFFFF', 
                borderRadius: 'var(--radius-full)', 
                padding: '0.15rem 0.5rem', 
                fontSize: '0.75rem', 
                fontWeight: 800 
              }}>
                {applications.filter((a) => a.status === 'pending').length} New
              </span>
            )}
          </button>
        </div>

        {adminTab === 'applications' ? (
          /* ================= APPLICATIONS MANAGEMENT ================= */
          <div className="card" style={{ padding: '1.5rem', background: '#FFFFFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-dark)' }}>
                  Pending & Received Membership Applications ({applications.length})
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Review applicants submitted via the online Apply form. Approving an applicant automatically generates their official CAR Life Member ID and enrolls them into the national registry.
                </p>
              </div>
            </div>

            {applications.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-light)' }}>
                <ShieldCheck size={48} color="#CBD5E1" style={{ margin: '0 auto 1rem' }} />
                <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-muted)' }}>No membership applications received yet.</p>
                <p style={{ fontSize: '0.85rem' }}>When doctors apply at <code>/apply</code>, their applications appear here for executive approval.</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Reference</th>
                      <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Doctor Details</th>
                      <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Council Reg #</th>
                      <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Hospital / Institution</th>
                      <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Location</th>
                      <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Status</th>
                      <th style={{ padding: '0.75rem 1rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr key={app.id || app.reference} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace', fontWeight: 600, color: 'var(--primary)' }}>
                          {app.reference}
                        </td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <strong style={{ color: 'var(--primary-dark)', display: 'block' }}>{app.fullName}</strong>
                          <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                            {app.qualification || 'MBBS'} • {app.speciality || 'General'}
                          </span>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.2rem' }}>
                            {app.email} • {app.phone}
                          </div>
                        </td>
                        <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace', fontSize: '0.825rem' }}>
                          {app.registrationNumber}
                        </td>
                        <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>
                          <span style={{ fontWeight: 500 }}>{app.designation}</span>
                          <div style={{ fontSize: '0.775rem', color: 'var(--text-light)' }}>{app.institution}</div>
                        </td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          {app.city}, <span className="badge badge-teal" style={{ fontSize: '0.7rem' }}>{app.state}</span>
                        </td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          {app.status === 'approved' ? (
                            <div>
                              <span className="badge badge-green" style={{ background: '#DCFCE7', color: '#16A34A' }}>
                                Enrolled
                              </span>
                              <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--primary)', marginTop: '0.25rem', fontWeight: 600 }}>
                                {app.approved_membership_id}
                              </div>
                            </div>
                          ) : app.status === 'rejected' ? (
                            <span className="badge badge-coral" style={{ background: '#FEE2E2', color: '#DC2626' }}>
                              Rejected
                            </span>
                          ) : (
                            <span className="badge badge-blue" style={{ background: '#EFF6FF', color: '#2563EB' }}>
                              Pending Review
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                          {app.status === 'pending' ? (
                            <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                              <button
                                type="button"
                                onClick={() => handleApprove(app.id)}
                                className="btn btn-teal btn-sm"
                                style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                                title="Approve applicant and enroll as Life Member"
                              >
                                Approve & Enroll
                              </button>
                              <button
                                type="button"
                                onClick={() => handleReject(app.id)}
                                className="btn btn-outline btn-sm"
                                style={{ padding: '0.35rem 0.6rem', color: '#E11D48', fontSize: '0.8rem' }}
                                title="Reject"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Processed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          /* ================= MEMBERS MANAGEMENT TABLE ================= */
          <div className="card" style={{ padding: '1.5rem', background: '#FFFFFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-dark)' }}>
                Manage Life Members ({filtered.length})
              </h2>

            <div className="search-box-wrapper" style={{ minWidth: 280 }}>
              <Search className="search-icon-pos" size={16} />
              <input
                type="text"
                className="search-box-input"
                style={{ padding: '0.65rem 1rem 0.65rem 2.6rem', fontSize: '0.875rem' }}
                placeholder="Search name, ID, hospital..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>CAR ID</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Doctor Name</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Designation</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Institution & Location</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>State</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((m) => (
                  <tr key={m.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace', fontWeight: 600, color: 'var(--primary)' }}>
                      {m.membership_id}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>
                      {m.name}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>
                      {m.designation || '—'}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)', maxWidth: 260, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {m.institution_location || '—'}
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span className="badge badge-teal">{m.state_code}</span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(m)}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '0.3rem 0.6rem' }}
                          title="Edit member"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(m.id)}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '0.3rem 0.6rem', color: '#E11D48' }}
                          title="Delete member"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        )}

        {/* Modal for Add / Edit */}
        {showModal && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
            <div className="card" style={{ maxWidth: 560, width: '100%', padding: '2rem', background: '#FFFFFF' }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-dark)' }}>
                  {editingMember ? 'Edit Life Member' : 'Add New Life Member'}
                </h3>
                <button 
                  type="button"
                  onClick={() => setShowModal(false)} 
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveMember}>
                <div className="form-group">
                  <label className="form-label">CAR Registration / Membership ID *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. DL/CAR/001"
                    value={formData.membership_id}
                    onChange={(e) => setFormData({ ...formData, membership_id: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Doctor's Full Name *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Dr. A.T. Kannan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Designation / Role</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Professor & Head, Paediatrics"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Institution, Department & City</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Maulana Azad Medical College, Delhi"
                    value={formData.institution_location}
                    onChange={(e) => setFormData({ ...formData, institution_location: e.target.value })}
                  />
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">State Code *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      placeholder="DL, UP, UK, HR, etc."
                      value={formData.state_code}
                      onChange={(e) => setFormData({ ...formData, state_code: e.target.value.toUpperCase() })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">State Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Delhi, Uttar Pradesh, etc."
                      value={formData.state_name}
                      onChange={(e) => setFormData({ ...formData, state_name: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <button 
                    type="button" 
                    onClick={() => setShowModal(false)} 
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    id="save-member-modal-submit-btn"
                  >
                    <Save size={15} />
                    {editingMember ? 'Save Changes' : 'Create Member'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
