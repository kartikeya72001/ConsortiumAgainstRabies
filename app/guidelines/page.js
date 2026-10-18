import Link from 'next/link';
import { 
  ShieldAlert, 
  CheckCircle, 
  XCircle, 
  Download, 
  FileText, 
  AlertTriangle, 
  Activity,
  HeartPulse,
  Info
} from 'lucide-react';

export const metadata = {
  title: 'Clinical Guidelines for Rabies Post-Exposure Prophylaxis (PEP) | CAR',
  description: 'Evidence-based clinical guidelines on animal bite wound management, Category I, II, III risk triage, Intradermal Rabies Vaccine (IDRV), and Rabies Immunoglobulin (RIG).',
};

export default function GuidelinesPage() {
  return (
    <div className="section" style={{ background: '#F8FAFC' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-badge">
            <ShieldAlert size={14} /> Clinical Protocols
          </span>
          <h1 className="section-title">National Guidelines for Rabies Prophylaxis</h1>
          <p className="section-subtitle">
            Standardized evidence-based consensus guidelines developed by the Consortium Against Rabies adhering to WHO expert consultation standards.
          </p>
        </div>

        {/* Golden Rule Alert */}
        <div className="card" style={{ background: 'linear-gradient(135deg, #FFF1F2 0%, #FFFFFF 100%)', borderLeft: '6px solid var(--accent-coral)', marginBottom: '3rem', padding: '2rem' }}>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
            <div style={{ background: '#FFE4E6', color: '#BE123C', padding: '0.75rem', borderRadius: '50%', flexShrink: 0 }}>
              <AlertTriangle size={28} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', color: '#9F1239', marginBottom: '0.5rem' }}>
                The Golden Rule: Immediate First Aid Saves Lives
              </h2>
              <p style={{ color: '#881337', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                Immediate vigorous washing of all animal bite wounds and scratches with <strong>running tap water and soap for at least 15 minutes</strong> physically removes up to 90% of the viral inoculate. This single measure drastically reduces rabies transmission risk.
              </p>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', fontSize: '0.9rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#166534', fontWeight: 600 }}>
                  <CheckCircle size={16} /> Wash thoroughly with soap & water
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#166534', fontWeight: 600 }}>
                  <CheckCircle size={16} /> Apply povidone iodine or alcohol antiseptic
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#991B1B', fontWeight: 600 }}>
                  <XCircle size={16} /> DO NOT suture wounds immediately
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#991B1B', fontWeight: 600 }}>
                  <XCircle size={16} /> DO NOT apply lime, chili, oil or mud
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* WHO Bite Category Triage Table */}
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.25rem', color: 'var(--primary-dark)' }}>
          Risk Assessment & Category Triage
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3.5rem' }}>
          {/* Category I */}
          <div className="card" style={{ borderTop: '4px solid #10B981' }}>
            <span className="badge badge-teal" style={{ marginBottom: '0.75rem' }}>Category I</span>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Touching or Feeding Animals</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: '1.5' }}>
              Touching, feeding suspected animals, or licks on intact skin without open wounds.
            </p>
            <div style={{ background: '#F0FDF4', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #DCFCE7' }}>
              <strong style={{ display: 'block', color: '#166534', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Required Action:</strong>
              <p style={{ fontSize: '0.85rem', color: '#15803D', margin: 0 }}>
                Wash exposed skin surfaces. <strong>No vaccine</strong> or immunoglobulin required if history is reliable.
              </p>
            </div>
          </div>

          {/* Category II */}
          <div className="card" style={{ borderTop: '4px solid #F59E0B' }}>
            <span className="badge badge-amber" style={{ marginBottom: '0.75rem' }}>Category II</span>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Minor Scratches / Nibbling</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: '1.5' }}>
              Nibbling of uncovered skin, minor scratches or abrasions without bleeding.
            </p>
            <div style={{ background: '#FEF3C7', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #FDE68A' }}>
              <strong style={{ display: 'block', color: '#92400E', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Required Action:</strong>
              <p style={{ fontSize: '0.85rem', color: '#B45309', margin: 0 }}>
                Immediate wound washing + <strong>Complete Anti-Rabies Vaccine (ARV) course</strong>. RIG is not routinely required unless immunocompromised.
              </p>
            </div>
          </div>

          {/* Category III */}
          <div className="card" style={{ borderTop: '4px solid #E11D48' }}>
            <span className="badge badge-coral" style={{ marginBottom: '0.75rem' }}>Category III</span>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Transdermal Bites / Bleeding</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: '1.5' }}>
              Single or multiple transdermal bites or scratches, licks on broken skin, contamination of mucous membranes.
            </p>
            <div style={{ background: '#FFF1F2', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #FECDD3' }}>
              <strong style={{ display: 'block', color: '#9F1239', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Required Action:</strong>
              <p style={{ fontSize: '0.85rem', color: '#BE123C', margin: 0 }}>
                Immediate washing + <strong>Full Anti-Rabies Vaccine course</strong> + <strong>Rabies Immunoglobulin (RIG)</strong> thoroughly infiltrated into all wounds.
              </p>
            </div>
          </div>
        </div>

        {/* Intradermal Route (IDRV) Feature */}
        <div className="card" style={{ padding: '2.5rem', background: '#FFFFFF', marginBottom: '3.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span className="badge badge-blue" style={{ marginBottom: '0.5rem' }}>Clinical Update</span>
              <h2 style={{ fontSize: '1.8rem', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
                Intradermal Rabies Vaccination (IDRV)
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                CAR has been at the forefront of popularizing the Intradermal Route in India. Instead of using 1 full vial (0.5ml or 1.0ml) per visit via intramuscular route, the intradermal route uses just <strong>0.1 ml per site</strong>.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={18} color="#0D9488" />
                  <strong>Up to 80% Cost Reduction:</strong> Allows 1 vaccine vial to treat multiple bite patients.
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={18} color="#0D9488" />
                  <strong>Identical Seroconversion:</strong> Triggers equivalent or superior protective neutralising antibodies.
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={18} color="#0D9488" />
                  <strong>Updated 2-Site Schedule:</strong> 2 sites (0.1 ml each deltoid) on Days 0, 3, and 7.
                </li>
              </ul>
            </div>

            <div style={{ background: 'var(--primary-subtle)', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
                Rabies Immunoglobulin (RIG) Dosages
              </h3>
              <div style={{ marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(15, 62, 109, 0.15)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <strong style={{ color: 'var(--primary)' }}>Equine Rabies Immunoglobulin (ERIG)</strong>
                  <span className="badge badge-teal">40 IU / kg body wt</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Skin sensitivity testing is no longer mandated by WHO guidelines; have adrenaline on standby.
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <strong style={{ color: 'var(--primary)' }}>Human Rabies Immunoglobulin (HRIG)</strong>
                  <span className="badge badge-blue">20 IU / kg body wt</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  As much of the calculated dose as anatomically feasible should be infiltrated locally into and around the wound(s).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Download Guideline Documents */}
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>Download Official Protocols & CMEs</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a 
              href="/downloads/WER9316.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary"
            >
              <Download size={16} />
              WHO Rabies Position Paper (PDF)
            </a>
            <a 
              href="/downloads/PostExposureProphylaxis.png" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline"
            >
              <Download size={16} />
              PEP Algorithm Wall Chart (PNG)
            </a>
            <Link href="/downloads" className="btn btn-teal">
              View All CME Lectures & Booklets →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
