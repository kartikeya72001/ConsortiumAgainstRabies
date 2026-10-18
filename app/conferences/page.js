import Link from 'next/link';
import { Calendar, MapPin, Download, Award, ArrowRight, ExternalLink } from 'lucide-react';
import conferences from '@/data/conferences.json';

export const metadata = {
  title: 'CARCON National Conferences | Consortium Against Rabies',
  description: 'Chronicle of National Conferences of Consortium Against Rabies (CARCON 2014 - 2023). Download scientific brochures and CME presentations.',
};

export default function ConferencesPage() {
  return (
    <div className="section" style={{ background: '#F8FAFC' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-badge">Scientific Assemblies</span>
          <h1 className="section-title">National CARCON Conferences</h1>
          <p className="section-subtitle">
            The premier national academic platform for rabies control, animal bite research, post-exposure prophylaxis innovations, and public health policy consensus.
          </p>
        </div>

        {/* Conference Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {conferences.map((conf, index) => (
            <div 
              key={conf.year} 
              className="card responsive-card" 
              style={{ 
                borderLeft: index === 0 ? '6px solid var(--accent-teal)' : '1px solid var(--border-subtle)',
                background: '#FFFFFF'
              }}
            >
              <div className="responsive-conf-grid">
                {/* Conference Banner / Photo */}
                <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#F1F5F9', maxHeight: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img 
                    src={conf.image} 
                    alt={conf.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Details */}
                <div>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <span className="badge badge-blue" style={{ fontSize: '0.85rem' }}>
                      {conf.name}
                    </span>
                    {index === 0 && (
                      <span className="badge badge-teal">
                        Latest Edition
                      </span>
                    )}
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <Calendar size={14} /> {conf.dates}
                    </span>
                    {conf.venue && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <MapPin size={14} /> {conf.venue}
                      </span>
                    )}
                  </div>

                  <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-dark)', marginBottom: '0.75rem' }}>
                    {conf.title}
                  </h2>

                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                    {conf.description}
                  </p>

                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {conf.brochureUrl && conf.brochureUrl !== '#' && (
                      <a 
                        href={conf.brochureUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-primary btn-sm"
                      >
                        <Download size={15} />
                        View / Download Brochure
                      </a>
                    )}
                    <Link href="/gallery" className="btn btn-outline btn-sm">
                      View Event Photos →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
