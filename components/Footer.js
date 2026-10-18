import Link from 'next/link';
import { ShieldCheck, Heart, Mail, MapPin, ExternalLink, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="grid-4" style={{ gap: '3rem' }}>
          {/* Brand Info */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <img 
                src="/Logo.jpg" 
                alt="CAR Logo" 
                width={40} 
                height={40} 
                style={{ borderRadius: '50%', border: '2px solid rgba(255, 255, 255, 0.2)' }} 
              />
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#FFFFFF' }}>
                Consortium Against Rabies
              </span>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              A national consortium of medical professionals, pediatricians, epidemiologists, and community health specialists dedicated to rabies control and prevention in India.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.05)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <ShieldCheck size={16} color="#34D399" />
              <span style={{ fontSize: '0.8rem', color: '#E2E8F0' }}>Non-Profit Medical Consortium</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4>Directory & Science</h4>
            <Link href="/members">Life Members Directory</Link>
            <Link href="/guidelines">Clinical Guidelines (PEP)</Link>
            <Link href="/conferences">CARCON Conferences</Link>
            <Link href="/leadership">Executive Leadership</Link>
            <Link href="/downloads">WHO & CAR Resource Center</Link>
            <Link href="/gallery">Field & Conference Gallery</Link>
          </div>

          {/* Membership & CME */}
          <div>
            <h4>Get Involved</h4>
            <Link href="/apply">Become a Life Member</Link>
            <Link href="/downloads">Download Application Form</Link>
            <Link href="/guidelines">Intradermal Route (IDRV)</Link>
            <Link href="/conferences">Next National CARCON</Link>
            <Link href="/contact">Contact Secretariat</Link>
            <Link href="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#38BDF8', marginTop: '0.5rem' }}>
              <Lock size={13} />
              Admin Portal
            </Link>
          </div>

          {/* Emergency Animal Bite Protocol */}
          <div>
            <h4>Emergency Protocol</h4>
            <div style={{ background: 'rgba(225, 29, 72, 0.12)', border: '1px solid rgba(225, 29, 72, 0.3)', borderRadius: 'var(--radius-md)', padding: '1rem', color: '#FECDD3', fontSize: '0.85rem', lineHeight: '1.5' }}>
              <strong style={{ color: '#FDA4AF', display: 'block', marginBottom: '0.4rem' }}>
                Immediate Animal Bite First Aid:
              </strong>
              Wash wound thoroughly with running water and soap for at least 15 minutes immediately. Apply antiseptic and visit the nearest rabies vaccination clinic without delay.
            </div>
            <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#64748B' }}>
              Consortium Secretariat: New Delhi, India
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} Consortium Against Rabies (consortiumagainstrabies.in). All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <span>Hosted on Vercel</span>
            <span>•</span>
            <span>Zero-Cost Serverless & Database Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
