import Link from 'next/link';
import { Award, UserCheck, ShieldCheck, Mail, BookOpen } from 'lucide-react';
import officeBearers from '@/data/office_bearers.json';

export const metadata = {
  title: 'Executive Leadership & Office Bearers | Consortium Against Rabies',
  description: 'Meet the executive committee, founder patron, past presidents, and advisors leading the Consortium Against Rabies across India.',
};

export default function LeadershipPage() {
  const { patron, currentExecutive, pastPresidents, pastTreasurers, pastVicePresidents } = officeBearers;

  return (
    <div className="section" style={{ background: '#F8FAFC' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-badge">
            <Award size={14} /> Governance
          </span>
          <h1 className="section-title">Leadership & Executive Council</h1>
          <p className="section-subtitle">
            Eminent medical professors, clinicians, and researchers guiding the Consortium's national vision and academic mission.
          </p>
        </div>

        {/* Patron Message Card */}
        <div className="card" style={{ padding: '3rem', marginBottom: '3.5rem', background: '#FFFFFF', borderTop: '5px solid var(--primary)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '2.5rem', alignItems: 'flex-start' }}>
            <img 
              src={patron.image} 
              alt={patron.name} 
              style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '4px solid #FFFFFF' }}
            />
            <div>
              <span className="badge badge-blue" style={{ marginBottom: '0.4rem' }}>{patron.title}</span>
              <h2 style={{ fontSize: '1.8rem', color: 'var(--primary-dark)', marginBottom: '0.25rem' }}>
                {patron.name}
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--accent-teal-dark)', fontWeight: 600, marginBottom: '1.25rem' }}>
                {patron.designation}
              </p>
              <div style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p>
                  "It is a great honour to take on this endeavour of making India Rabies free with the inception of Consortium Against Rabies. The aim of this consortium is to focus squarely on the issues related to Rabies, which is an often neglected public health disease."
                </p>
                <p>
                  "In India, nearly 15 million people are bitten by animals every year and require prompt post-exposure prophylaxis. The introduction and advocacy of the intradermal route for rabies vaccine has been a huge welcome step in drastically reducing the economic burden on poor families. I welcome every doctor, student, and researcher to join our ranks."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Executive Committee */}
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>
          Current Executive Council
        </h2>

        <div className="grid-4" style={{ marginBottom: '4rem' }}>
          {currentExecutive.map((person, idx) => (
            <div key={idx} className="card" style={{ textAlign: 'center', padding: '1.75rem 1.25rem' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--primary-subtle)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <UserCheck size={32} />
              </div>
              <span className="badge badge-teal" style={{ marginBottom: '0.5rem', fontSize: '0.725rem' }}>
                {person.role}
              </span>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-dark)', marginTop: '0.35rem' }}>
                {person.name}
              </h3>
            </div>
          ))}
        </div>

        {/* Honor Roll: Past Leadership */}
        <div className="card" style={{ padding: '2.5rem', background: '#FFFFFF' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-dark)', marginBottom: '1.5rem' }}>
            Honor Roll & Past Leadership
          </h2>

          <div className="grid-3" style={{ gap: '2rem' }}>
            <div>
              <h4 style={{ color: 'var(--primary)', borderBottom: '2px solid var(--primary-subtle)', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
                Past Presidents
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                {pastPresidents.map((name, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldCheck size={15} color="#0D9488" /> {name}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ color: 'var(--primary)', borderBottom: '2px solid var(--primary-subtle)', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
                Past Treasurers
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                {pastTreasurers.map((name, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldCheck size={15} color="#0D9488" /> {name}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ color: 'var(--primary)', borderBottom: '2px solid var(--primary-subtle)', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
                Past Vice Presidents
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                {pastVicePresidents.map((name, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldCheck size={15} color="#0D9488" /> {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
