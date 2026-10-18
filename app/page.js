import Link from 'next/link';
import { 
  ShieldCheck, 
  Users, 
  Calendar, 
  FileText, 
  ArrowRight, 
  Download, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Award,
  BookOpen,
  MapPin
} from 'lucide-react';
import conferences from '@/data/conferences.json';
import officeBearers from '@/data/office_bearers.json';

export default function HomePage() {
  const latestConference = conferences[0]; // CARCON 2023

  return (
    <div>
      {/* ================= HERO SECTION ================= */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="section-badge">
                <Activity size={14} />
                <span>National Anti-Rabies Initiative • India</span>
              </div>
              <h1 className="hero-heading">
                Let Us Strive to Make India <span className="hero-highlight">Rabies Free</span>
              </h1>
              <p className="hero-lead">
                Consortium Against Rabies (CAR) is India's leading multidisciplinary medical body uniting physicians, pediatricians, epidemiologists, and community health leaders to eliminate human rabies deaths through science, advocacy, and education.
              </p>

              <div className="hero-actions">
                <Link href="/members" className="btn btn-primary btn-lg" id="hero-find-members-btn">
                  <Users size={18} />
                  Find a Life Member
                </Link>
                <Link href="/apply" className="btn btn-teal btn-lg" id="hero-join-car-btn">
                  Join the Consortium
                  <ArrowRight size={18} />
                </Link>
                <Link href="/guidelines" className="btn btn-outline" id="hero-guidelines-btn">
                  <FileText size={18} />
                  PEP Guidelines
                </Link>
              </div>

              {/* Statistics */}
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-num">179+</span>
                  <span className="stat-label">Certified Life Members</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">20+</span>
                  <span className="stat-label">States & UTs Across India</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">6</span>
                  <span className="stat-label">National CARCON Editions</span>
                </div>
              </div>
            </div>

            {/* Visual Card / Emergency Bite Protocol */}
            <div className="hero-visual">
              <div className="hero-card-main">
                {/* Emergency Advisory */}
                <div className="emergency-strip">
                  <div className="emergency-title">
                    <AlertTriangle size={18} />
                    <span>Animal Bite Emergency Protocol</span>
                  </div>
                  <p className="emergency-desc">
                    <strong>Rule #1:</strong> Immediately wash all bite wounds with running water and soap for 15 minutes. Never apply lime, chili, or traditional irritants.
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)' }}>
                  <img 
                    src="/Dog1.jpg" 
                    alt="Animal Bite Education" 
                    style={{ width: 80, height: 80, borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                  />
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--primary-dark)', marginBottom: '0.2rem' }}>
                      Post-Exposure Prophylaxis
                    </h4>
                    <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                      Intradermal route (IDRV) saves up to 80% vaccine cost while providing identical protection.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem' }}>
                    <CheckCircle2 size={16} color="#0D9488" />
                    <span>WHO 2018 Updated PEP Algorithm Guidance</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem' }}>
                    <CheckCircle2 size={16} color="#0D9488" />
                    <span>Standardized Intramuscular & Intradermal Protocols</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem' }}>
                    <CheckCircle2 size={16} color="#0D9488" />
                    <span>Local Wound Infiltration with Immunoglobulins (RIG)</span>
                  </div>
                </div>

                <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <Link href="/guidelines" className="btn btn-outline" style={{ width: '100%', fontSize: '0.875rem' }}>
                    View Full Clinical Guidelines →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CORE PILLARS ================= */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Key Missions</span>
            <h2 className="section-title">Our Strategic Focus Areas</h2>
            <p className="section-subtitle">
              Bridging clinical expertise and national public policy to eradicate a 100% preventable fatal disease.
            </p>
          </div>

          <div className="grid-3">
            <div className="card">
              <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'var(--primary-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '1.25rem' }}>
                <Activity size={24} />
              </div>
              <h3 style={{ marginBottom: '0.6rem' }}>Clinical Guidelines & CME</h3>
              <p style={{ fontSize: '0.925rem', lineHeight: '1.6' }}>
                Training clinicians and duty doctors in correct bite wound classification (Category I, II, III), modern cell-culture vaccines, and rational immunoglobulin usage.
              </p>
              <Link href="/guidelines" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem', marginTop: '1.25rem' }}>
                Read Guidelines →
              </Link>
            </div>

            <div className="card">
              <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'var(--accent-teal-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-teal)', marginBottom: '1.25rem' }}>
                <Users size={24} />
              </div>
              <h3 style={{ marginBottom: '0.6rem' }}>Nationwide Member Network</h3>
              <p style={{ fontSize: '0.925rem', lineHeight: '1.6' }}>
                Over 179 esteemed life members spanning government medical colleges, tertiary hospitals, state health departments, and private pediatric practices.
              </p>
              <Link href="/members" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-teal)', fontWeight: 600, fontSize: '0.875rem', marginTop: '1.25rem' }}>
                Search Directory →
              </Link>
            </div>

            <div className="card">
              <div style={{ width: 48, height: 48, borderRadius: '12px', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706', marginBottom: '1.25rem' }}>
                <Calendar size={24} />
              </div>
              <h3 style={{ marginBottom: '0.6rem' }}>National CARCON Conferences</h3>
              <p style={{ fontSize: '0.925rem', lineHeight: '1.6' }}>
                Organizing annual national conferences to present original research, debate policy frameworks, and align state initiatives with WHO 2030 elimination targets.
              </p>
              <Link href="/conferences" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#D97706', fontWeight: 600, fontSize: '0.875rem', marginTop: '1.25rem' }}>
                Conference Archive →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PATRON MESSAGE HIGHLIGHT ================= */}
      <section className="section">
        <div className="container">
          <div className="card" style={{ padding: '3rem', background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)', border: '1px solid #CBD5E1' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '2.5rem', alignItems: 'center' }}>
              <img 
                src="/Patron.jpg" 
                alt="Dr. A.T. Kannan" 
                style={{ width: 140, height: 160, objectFit: 'cover', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '3px solid #FFFFFF' }}
              />
              <div>
                <span className="badge badge-blue" style={{ marginBottom: '0.5rem' }}>
                  Founder & Patron's Message
                </span>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
                  Dr. A.T. Kannan
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '1rem', fontWeight: 500 }}>
                  Formerly Prof & Head, Department of Community Medicine, UCMS & GTB Hospital, Delhi
                </p>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.7', fontStyle: 'italic', marginBottom: '1.25rem' }}>
                  "Rabies is an often neglected disease in India, yet it claims thousands of preventable lives every year. The introduction of the intradermal route for rabies vaccine is a huge welcome step in drastically reducing costs. I welcome all doctors, researchers, and public health advocates to join our movement."
                </p>
                <Link href="/leadership" className="btn btn-outline btn-sm">
                  Read Full Leadership Messages →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LATEST CONFERENCE ================= */}
      <section className="section section-dark">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <span className="badge badge-teal" style={{ marginBottom: '0.75rem', color: '#042F2E', background: '#99F6E4' }}>
                Featured Event
              </span>
              <h2 style={{ fontSize: '2.25rem', color: '#FFFFFF', marginBottom: '1rem' }}>
                {latestConference.name}: {latestConference.title}
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#CBD5E1', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                {latestConference.description}
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={18} color="#38BDF8" />
                  <span style={{ color: '#E2E8F0' }}>{latestConference.dates}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Award size={18} color="#38BDF8" />
                  <span style={{ color: '#E2E8F0' }}>National Medical Accreditation</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a 
                  href={latestConference.brochureUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-teal"
                  id="carcon-brochure-link"
                >
                  <Download size={16} />
                  Download Conference Brochure
                </a>
                <Link href="/conferences" className="btn btn-outline-white">
                  View Past CARCON Editions
                </Link>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <img 
                src={latestConference.image} 
                alt={latestConference.name} 
                style={{ maxWidth: '100%', maxHeight: 360, borderRadius: 'var(--radius-lg)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)', border: '2px solid rgba(255, 255, 255, 0.1)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <span className="section-badge">Join The Movement</span>
            <h2 style={{ marginBottom: '1rem' }}>Are You a Doctor or Public Health Specialist?</h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
              Join 179+ certified life members fighting rabies across India. Gain access to national CMEs, consensus guidelines, and our professional medical community.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/apply" className="btn btn-primary btn-lg">
                Submit Online Membership Application
              </Link>
              <a 
                href="/downloads/life_membership_application_form_car_2019.doc" 
                download 
                className="btn btn-outline btn-lg"
              >
                <Download size={18} />
                Download Application Form (.doc)
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
