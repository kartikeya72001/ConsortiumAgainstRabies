'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  MapPin, 
  Download, 
  UserCheck, 
  Building, 
  Briefcase, 
  Filter, 
  LayoutGrid, 
  Table as TableIcon,
  PlusCircle,
  ExternalLink
} from 'lucide-react';
import initialMembers from '@/data/members.json';

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

  // Extract unique states and counts
  const stateCounts = useMemo(() => {
    const counts = { ALL: initialMembers.length };
    initialMembers.forEach((m) => {
      const code = m.state_code || 'OTHER';
      counts[code] = (counts[code] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter members
  const filteredMembers = useMemo(() => {
    return initialMembers.filter((m) => {
      const matchesState = selectedState === 'ALL' || m.state_code === selectedState;
      if (!matchesState) return false;

      if (!searchTerm) return true;
      const q = searchTerm.toLowerCase();
      return (
        (m.name && m.name.toLowerCase().includes(q)) ||
        (m.membership_id && m.membership_id.toLowerCase().includes(q)) ||
        (m.institution_location && m.institution_location.toLowerCase().includes(q)) ||
        (m.designation && m.designation.toLowerCase().includes(q)) ||
        (m.state_name && m.state_name.toLowerCase().includes(q))
      );
    });
  }, [searchTerm, selectedState]);

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Membership ID', 'State Code', 'Name', 'Designation', 'Institution / Location'];
    const rows = filteredMembers.map((m) => [
      m.id,
      `"${m.membership_id}"`,
      `"${m.state_code}"`,
      `"${m.name}"`,
      `"${m.designation || ''}"`,
      `"${(m.institution_location || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CAR_Life_Members_${selectedState}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const topStates = [
    { code: 'ALL', label: 'All India' },
    { code: 'DL', label: 'Delhi' },
    { code: 'UP', label: 'Uttar Pradesh' },
    { code: 'UK', label: 'Uttarakhand' },
    { code: 'HR', label: 'Haryana' },
    { code: 'HP', label: 'Himachal' },
    { code: 'RJ', label: 'Rajasthan' },
    { code: 'MP', label: 'Madhya Pradesh' },
  ];

  return (
    <div className="section" style={{ background: '#F8FAFC', minHeight: '80vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div>
            <span className="section-badge">Official Directory</span>
            <h1 style={{ fontSize: '2.4rem', marginBottom: '0.5rem' }}>Life Members Directory</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: 640 }}>
              Search across certified medical professionals, academicians, and health specialists enrolled in the Consortium Against Rabies.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Link href="/apply" className="btn btn-teal">
              <PlusCircle size={16} />
              Become a Life Member
            </Link>
            <button 
              type="button"
              onClick={handleExportCSV} 
              className="btn btn-outline"
              title="Export current list to CSV"
              id="export-members-csv-btn"
            >
              <Download size={16} />
              Export CSV
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="card" style={{ marginBottom: '2rem', padding: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center' }}>
            <div className="search-box-wrapper">
              <Search className="search-icon-pos" size={18} />
              <input
                type="text"
                className="search-box-input"
                placeholder="Search by doctor name (e.g. Dr. Kannan), CAR ID (e.g. DL/CAR/001), hospital, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                id="member-search-input"
              />
            </div>

            {/* View Mode Toggle */}
            <div style={{ display: 'flex', background: '#F1F5F9', padding: '0.25rem', borderRadius: 'var(--radius-md)' }}>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline'}`}
                style={{ border: 'none', boxShadow: viewMode === 'grid' ? 'var(--shadow-sm)' : 'none' }}
                title="Grid view"
                id="view-grid-btn"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`btn btn-sm ${viewMode === 'table' ? 'btn-primary' : 'btn-outline'}`}
                style={{ border: 'none', boxShadow: viewMode === 'table' ? 'var(--shadow-sm)' : 'none' }}
                title="Table view"
                id="view-table-btn"
              >
                <TableIcon size={16} />
              </button>
            </div>
          </div>

          {/* State Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginRight: '0.5rem' }}>
              <Filter size={14} /> Filter State:
            </span>
            {topStates.map((st) => {
              const isSelected = selectedState === st.code;
              const count = stateCounts[st.code] || 0;
              return (
                <button
                  type="button"
                  key={st.code}
                  onClick={() => setSelectedState(st.code)}
                  style={{
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--primary)' : 'var(--border-subtle)',
                    background: isSelected ? 'var(--primary)' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : 'var(--text-muted)',
                    transition: 'all 150ms ease',
                  }}
                  id={`filter-state-${st.code.toLowerCase()}`}
                >
                  {st.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Results summary */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Showing <strong>{filteredMembers.length}</strong> of <strong>{initialMembers.length}</strong> members
            {selectedState !== 'ALL' && ` in ${selectedState}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
          {searchTerm && (
            <button 
              type="button"
              onClick={() => setSearchTerm('')} 
              style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
            >
              Clear search
            </button>
          )}
        </div>

        {/* Content View */}
        {filteredMembers.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              No members found matching your search.
            </p>
            <button 
              type="button"
              onClick={() => { setSearchTerm(''); setSelectedState('ALL'); }} 
              className="btn btn-primary btn-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid-3">
            {filteredMembers.map((member) => (
              <div key={member.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <span className="badge badge-blue">
                    {member.membership_id}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-light)', background: '#F1F5F9', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
                    {member.state_name || member.state_code}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-dark)', marginBottom: '0.35rem' }}>
                  {member.name}
                </h3>

                {member.designation && (
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--accent-teal-dark)', fontWeight: 500, marginBottom: '0.5rem' }}>
                    <Briefcase size={14} style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                    <span>{member.designation}</span>
                  </div>
                )}

                {member.institution_location && (
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid #F1F5F9' }}>
                    <Building size={14} style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                    <span>{member.institution_location}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.9rem 1.25rem', fontWeight: 600 }}>CAR Reg. ID</th>
                  <th style={{ padding: '0.9rem 1.25rem', fontWeight: 600 }}>Doctor Name</th>
                  <th style={{ padding: '0.9rem 1.25rem', fontWeight: 600 }}>Designation</th>
                  <th style={{ padding: '0.9rem 1.25rem', fontWeight: 600 }}>Institution & Location</th>
                  <th style={{ padding: '0.9rem 1.25rem', fontWeight: 600 }}>State</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((m, idx) => (
                  <tr key={m.id} style={{ borderBottom: '1px solid var(--border-subtle)', background: idx % 2 === 0 ? '#FFFFFF' : '#FAFAFA' }}>
                    <td style={{ padding: '0.85rem 1.25rem', fontFamily: 'monospace', fontWeight: 600, color: 'var(--primary)' }}>
                      {m.membership_id}
                    </td>
                    <td style={{ padding: '0.85rem 1.25rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      {m.name}
                    </td>
                    <td style={{ padding: '0.85rem 1.25rem', color: 'var(--text-muted)' }}>
                      {m.designation || '—'}
                    </td>
                    <td style={{ padding: '0.85rem 1.25rem', color: 'var(--text-muted)' }}>
                      {m.institution_location || '—'}
                    </td>
                    <td style={{ padding: '0.85rem 1.25rem' }}>
                      <span className="badge badge-teal">{m.state_code}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
