import Link from 'next/link';
import { Award, UserCheck, ShieldCheck, HeartPulse, FileText, ArrowRight } from 'lucide-react';
import { getLeadership } from '@/lib/db';
import LeadershipMessages from '@/components/LeadershipMessages';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Executive Leadership & Messages | Consortium Against Rabies',
  description: 'Read official addresses from the President, Founder Patron, and Honorary Secretaries guiding the Consortium Against Rabies across India.',
};

export default async function LeadershipPage() {
  const officeBearers = await getLeadership();
  const { 
    messages = [], 
    currentExecutive = [], 
    pastPresidents = [], 
    pastTreasurers = [], 
    pastVicePresidents = [],
    pastMembers = []
  } = officeBearers;

  return (
    <div className="section" style={{ background: '#F8FAFC', paddingTop: '3.5rem', paddingBottom: '5rem' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ marginBottom: '3rem' }}>
          <span className="section-badge">
            <Award size={14} /> Governance & Leadership Messages
          </span>
          <h1 className="section-title">Leadership & Executive Council</h1>
          <p className="section-subtitle">
            Eminent medical professors, paediatricians, and researchers guiding the Consortium's national vision towards zero human rabies deaths in India.
          </p>
        </div>

        {/* Interactive Leadership Messages Section (All 4 Leaders) */}
        <LeadershipMessages messages={messages} />

        {/* Current Executive Committee */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-teal" style={{ marginBottom: '0.4rem', display: 'inline-block' }}>
                Governing Body
              </span>
              <h2 style={{ fontSize: '1.85rem', color: 'var(--primary-dark)', fontWeight: 800 }}>
                Current Executive Council
              </h2>
            </div>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
              Consortium Against Rabies (India)
            </p>
          </div>

          <div className="grid-4">
            {currentExecutive.map((person, idx) => (
              <div 
                key={person.id || idx} 
                className="card" 
                style={{ 
                  textAlign: 'center', 
                  padding: '2rem 1.25rem',
                  background: '#FFFFFF',
                  border: '1px solid var(--border-subtle)',
                  transition: 'transform 200ms ease, box-shadow 200ms ease'
                }}
              >
                <div 
                  style={{ 
                    width: 60, 
                    height: 60, 
                    borderRadius: '50%', 
                    background: 'var(--primary-subtle)', 
                    color: 'var(--primary)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 1.25rem',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <UserCheck size={28} />
                </div>
                <span 
                  className="badge badge-teal" 
                  style={{ marginBottom: '0.65rem', fontSize: '0.725rem', display: 'inline-block' }}
                >
                  {person.role}
                </span>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-dark)', fontWeight: 700 }}>
                  {person.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

        <div className="card responsive-card" style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', marginBottom: '3.5rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <span className="badge badge-blue" style={{ marginBottom: '0.4rem', display: 'inline-block' }}>
              Legacy & Service
            </span>
            <h2 style={{ fontSize: '1.7rem', color: 'var(--primary-dark)', fontWeight: 800 }}>
              Honor Roll & Past Leadership
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Recognizing the founders, past presidents, and executive officers who shaped the national rabies prevention movement.
            </p>
          </div>

          <div className="grid-3" style={{ gap: '2.5rem' }}>
            <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
              <h4 style={{ color: 'var(--primary-dark)', borderBottom: '2px solid var(--primary)', paddingBottom: '0.65rem', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 700 }}>
                Past Presidents
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                {pastPresidents.map((name, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <ShieldCheck size={16} color="#0D9488" style={{ flexShrink: 0 }} /> 
                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
              <h4 style={{ color: 'var(--primary-dark)', borderBottom: '2px solid var(--accent-teal)', paddingBottom: '0.65rem', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 700 }}>
                Past Treasurers
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                {pastTreasurers.map((name, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <ShieldCheck size={16} color="#0D9488" style={{ flexShrink: 0 }} /> 
                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
              <h4 style={{ color: 'var(--primary-dark)', borderBottom: '2px solid var(--accent-coral)', paddingBottom: '0.65rem', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 700 }}>
                Past Vice Presidents
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                {pastVicePresidents.map((name, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <ShieldCheck size={16} color="#0D9488" style={{ flexShrink: 0 }} /> 
                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {pastMembers && pastMembers.length > 0 && (
            <div style={{ marginTop: '2rem', background: '#F8FAFC', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0' }}>
              <h4 style={{ color: 'var(--primary-dark)', borderBottom: '2px solid #D97706', paddingBottom: '0.65rem', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 700 }}>
                Past Executive Council Members
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.75rem' }}>
                {pastMembers.map((entry, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem' }}>
                    <ShieldCheck size={16} color="#D97706" style={{ flexShrink: 0 }} />
                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{typeof entry === 'object' ? `${entry.name} (${entry.role})` : entry}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Callout */}
        <div 
          style={{ 
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)', 
            borderRadius: 'var(--radius-lg)', 
            padding: '2.5rem 3rem',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem', color: '#FFFFFF' }}>
              Join Our National Movement Against Rabies
            </h3>
            <p style={{ color: '#E2E8F0', maxWidth: '600px', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Become a Life Member of CAR to contribute to national guidelines, participate in annual CARCON conferences, and advocate for zero human rabies deaths in India.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/apply" className="btn btn-secondary">
              <HeartPulse size={16} /> Apply for Life Membership
            </Link>
            <Link href="/guidelines" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#FFFFFF' }}>
              <FileText size={16} /> PEP Guidelines
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
