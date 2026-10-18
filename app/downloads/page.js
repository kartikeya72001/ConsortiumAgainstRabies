'use client';

import { useState } from 'react';
import { Download, FileText, FileSpreadsheet, Presentation, ShieldCheck, Filter } from 'lucide-react';
import downloadsData from '@/data/downloads.json';

export default function DownloadsPage() {
  const [selectedCat, setSelectedCat] = useState('ALL');

  const categories = ['ALL', 'Membership', 'Guidelines', 'Clinical', 'CME & Lectures', 'Education', 'Presentations'];

  const filtered = selectedCat === 'ALL' 
    ? downloadsData 
    : downloadsData.filter((d) => d.category === selectedCat);

  const getIcon = (type) => {
    switch (type) {
      case 'PDF': return <FileText size={24} color="#E11D48" />;
      case 'DOC': return <FileText size={24} color="#0284C7" />;
      case 'PPT': return <Presentation size={24} color="#D97706" />;
      default: return <FileText size={24} color="#0D9488" />;
    }
  };

  return (
    <div className="section" style={{ background: '#F8FAFC' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-badge">Academic & Clinical Assets</span>
          <h1 className="section-title">Resource Center & Downloads</h1>
          <p className="section-subtitle">
            Access official membership forms, clinical guidelines, WHO position documents, and CME presentations directly.
          </p>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setSelectedCat(cat)}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: '1px solid',
                borderColor: selectedCat === cat ? 'var(--primary)' : 'var(--border-subtle)',
                background: selectedCat === cat ? 'var(--primary)' : '#FFFFFF',
                color: selectedCat === cat ? '#FFFFFF' : 'var(--text-muted)',
                transition: 'all 150ms ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid-2" style={{ gap: '1.75rem' }}>
          {filtered.map((item) => (
            <div key={item.id} className="card" style={{ display: 'flex', flexDirection: 'column', padding: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {getIcon(item.type)}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span className="badge badge-blue">{item.type}</span>
                  <span className="badge badge-teal">{item.category}</span>
                </div>
              </div>

              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem', flexGrow: 1 }}>
                {item.description}
              </p>

              <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                <a 
                  href={item.file} 
                  download 
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%' }}
                >
                  <Download size={15} />
                  Download Document
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
