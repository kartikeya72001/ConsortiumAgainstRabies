import Link from 'next/link';
import { 
  Activity, 
  Calendar, 
  MapPin, 
  Users, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  HeartPulse,
  BookOpen
} from 'lucide-react';

export const metadata = {
  title: 'Activities & National CMEs | Consortium Against Rabies',
  description: 'Explore CARCON 2024 Jammu, World Rabies Day campaigns, pediatric workshops, and state CMEs organized by the Consortium Against Rabies.',
};

export default function ActivitiesPage() {
  const activities = [
    {
      id: 'carcon-2024',
      badge: 'Latest National Conference',
      badgeColor: 'badge-teal',
      title: 'CARCON 2024 — 12th Annual National Conference of Consortium Against Rabies',
      date: '28th & 29th September 2024',
      venue: 'Govt. Medical College (GMC), Jammu',
      host: 'Prof. Rajiv Gupta (Head, Dept. of Community Medicine, GMC Jammu)',
      keyAttendees: 'Dr. Rajnish (President), Dr. Anurag Agarwal (Gen. Secretary), Dr. Khan Amir Maroof (Secretary)',
      description: 'More than 200 medical delegates, clinicians, and researchers from across India gathered in Jammu. The prestigious Dr. A.T. Kannan & Dr. Omesh Bharti Oration was awarded to Dr. G. Sampath. The One Health approach was the central scientific highlight, alongside paper presentations, expert panels on intradermal rabies vaccination, and policy roadmaps towards Zero Rabies Deaths 2030.',
      imageCount: 22,
      previewImages: [
        '/activities/Carcon2024/10.webp',
        '/activities/Carcon2024/11.webp',
        '/activities/Carcon2024/12.webp',
        '/activities/Carcon2024/13.webp',
      ],
      galleryCategory: 'CARCON2024'
    },
    {
      id: 'world-rabies-day',
      badge: 'Public Health Campaign',
      badgeColor: 'badge-blue',
      title: 'World Rabies Day — National Awareness Rallies & School Outreach',
      date: 'Annually on 28th September',
      venue: 'Multi-State Initiatives (Delhi, UP, Haryana, J&K)',
      host: 'CAR Secretariat & State Chapters',
      description: 'Every year, the Consortium engages schools, medical colleges, and community centers with animal bite education, short video contests, and poster competitions. The emphasis is on immediate 15-minute wound washing with soap and water, timely vaccination, and dispelling dangerous myths like applying chili or lime.',
      imageCount: 18,
      previewImages: [
        '/activities/WorldRabiesDay/WRD0000.jpeg',
        '/activities/WorldRabiesDay/WRD0001.jpeg',
        '/activities/WorldRabiesDay/WRD0002.jpeg',
        '/activities/WorldRabiesDay/WRD0003.jpeg',
      ],
      galleryCategory: 'WORLD_RABIES_DAY'
    },
    {
      id: 'awareness-summit',
      badge: 'Policy & Advocacy',
      badgeColor: 'badge-teal',
      title: 'Rabies Awareness Summit & Multi-Sectoral Stakeholder Dialogue',
      date: 'Special Academic Summit',
      venue: 'New Delhi & Regional Centres',
      host: 'Consortium Against Rabies & Academic Partners',
      description: 'A landmark multi-sectoral symposium uniting human healthcare doctors, veterinarians, municipal health officers, and civil society representatives. The summit explored rabies surveillance, municipal dog bite mitigation, and expanding Intradermal Rabies Vaccination (IDRV) clinics into rural primary healthcare centers.',
      imageCount: 14,
      previewImages: [
        '/activities/RabiesAwarenessSummit/ras0000.jpeg',
        '/activities/RabiesAwarenessSummit/ras0001.jpeg',
        '/activities/RabiesAwarenessSummit/ras0002.jpeg',
        '/activities/RabiesAwarenessSummit/ras0003.jpeg',
      ],
      galleryCategory: 'AWARENESS_SUMMIT'
    },
    {
      id: 'newer-dimensions',
      badge: 'Clinical Workshop',
      badgeColor: 'badge-blue',
      title: 'Newer Dimensions in Rabies Prevention & Control',
      date: 'National CME Series',
      venue: 'Medical Colleges across Northern India',
      host: 'Executive Council of CAR',
      description: 'Focused CME sessions for casualty doctors, pediatricians, and interns on modern rabies biologicals, monoclonal antibodies, and post-exposure prophylaxis protocols for immunocompromised patients.',
      imageCount: 7,
      previewImages: [
        '/gallery/Apricon/IMG-20170711-WA0075.jpg',
        '/gallery/Apricon/IMG-20170711-WA0074.jpg',
        '/gallery/Apricon/IMG-20170711-WA0089.jpg',
      ],
      galleryCategory: 'APRICON'
    },
    {
      id: 'mewat-camps',
      badge: 'Grassroots Community Health',
      badgeColor: 'badge-coral',
      title: 'Mewat Outreach Camps & Primary Health Centre Training',
      date: 'Field Initiative',
      venue: 'Shaheed Hasan Khan Mewati Govt. Medical College, Nalhar, Haryana',
      host: 'CAR Field Research Team',
      description: 'Hands-on training of primary care medical officers in high animal bite burden rural districts. Demonstrated proper intradermal technique raising a visible pea-sized induration (wheal) and localized wound infiltration of immunoglobulin.',
      imageCount: 8,
      previewImages: [
        '/gallery/MewatMedicalCollege/IMG_20161025_135303.jpg',
        '/gallery/MewatMedicalCollege/IMG_20161025_135244.jpg',
        '/gallery/MewatMedicalCollege/IMG_20161025_135352.jpg',
      ],
      galleryCategory: 'MEWAT_OUTREACH'
    }
  ];

  return (
    <div className="section" style={{ background: '#F8FAFC', paddingTop: '3.5rem', paddingBottom: '5rem' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ marginBottom: '3.5rem' }}>
          <span className="section-badge">
            <Activity size={14} /> National Impact & Field Programs
          </span>
          <h1 className="section-title">Consortium Activities & CMEs</h1>
          <p className="section-subtitle">
            Documenting CARCON annual conferences, community awareness initiatives, clinical training programs, and multi-sectoral One Health symposiums across India.
          </p>
        </div>

        {/* Activities List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {activities.map((act) => (
            <div 
              key={act.id} 
              id={act.id}
              className="card" 
              style={{ 
                padding: '2.5rem', 
                background: '#FFFFFF',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <span className={`badge ${act.badgeColor}`} style={{ marginBottom: '0.5rem', display: 'inline-block' }}>
                    {act.badge}
                  </span>
                  <h2 style={{ fontSize: '1.65rem', color: 'var(--primary-dark)', fontWeight: 800 }}>
                    {act.title}
                  </h2>
                </div>
                <Link 
                  href={`/gallery`} 
                  className="btn btn-outline btn-sm"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  View All {act.imageCount} Photos in Gallery →
                </Link>
              </div>

              {/* Meta details */}
              <div 
                style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '1.5rem', 
                  fontSize: '0.875rem', 
                  color: 'var(--text-muted)',
                  background: '#F8FAFC',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1.5rem',
                  border: '1px solid #E2E8F0'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Calendar size={15} color="var(--primary)" />
                  <strong>Date:</strong> <span>{act.date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <MapPin size={15} color="#0D9488" />
                  <strong>Venue:</strong> <span>{act.venue}</span>
                </div>
                {act.host && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Users size={15} color="#D97706" />
                    <strong>Host:</strong> <span>{act.host}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p style={{ fontSize: '1.025rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.75rem' }}>
                {act.description}
              </p>

              {/* Image Preview Strip */}
              {act.previewImages && act.previewImages.length > 0 && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-dark)' }}>
                      Photo Highlights ({act.imageCount} total photographs)
                    </span>
                    <Link 
                      href="/gallery" 
                      style={{ fontSize: '0.825rem', color: 'var(--primary)', fontWeight: 600 }}
                    >
                      Browse full album →
                    </Link>
                  </div>
                  <div 
                    style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
                      gap: '0.75rem' 
                    }}
                  >
                    {act.previewImages.map((src, i) => (
                      <div 
                        key={i} 
                        style={{ 
                          height: 150, 
                          borderRadius: 'var(--radius-md)', 
                          overflow: 'hidden', 
                          background: '#E2E8F0',
                          boxShadow: 'var(--shadow-sm)'
                        }}
                      >
                        <img 
                          src={src} 
                          alt={`${act.title} photo ${i + 1}`}
                          loading="lazy"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div 
          style={{ 
            marginTop: '4rem', 
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
              Want CAR to Host a Rabies CME in Your Medical College?
            </h3>
            <p style={{ color: '#E2E8F0', maxWidth: '620px', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Our executive council faculties regularly travel to regional medical colleges across India to conduct expert CMEs on IDRV and animal bite management.
            </p>
          </div>
          <Link href="/contact" className="btn btn-secondary">
            Contact Secretariat for CME
          </Link>
        </div>
      </div>
    </div>
  );
}
