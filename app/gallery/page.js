'use client';

import { useState, useEffect } from 'react';
import { 
  Image as ImageIcon, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  Sparkles,
  Calendar,
  Eye,
  Maximize2
} from 'lucide-react';
import galleryData from '@/data/gallery.json';

const CATEGORIES = [
  { key: 'CARCON2024', label: 'CARCON 2024 (Jammu)', badge: 'Latest', desc: '12th Annual National Conference at Govt Medical College, Jammu' },
  { key: 'CARCON_ARCHIVES', label: 'CARCON National Archives', badge: '210 Photos', desc: 'Delegates, executive council meetings, CME sessions, and scientific assemblies' },
  { key: 'CARCON2017', label: 'CARCON 2017', badge: '85 Photos', desc: 'Scientific paper presentations, IDRV workshops, and interactive CMEs' },
  { key: 'WORLD_RABIES_DAY', label: 'World Rabies Day', badge: 'Community', desc: 'Grassroot school awareness, street rallies, and public health campaigns' },
  { key: 'AWARENESS_SUMMIT', label: 'Rabies Awareness Summit', badge: 'Advocacy', desc: 'Multi-sectoral stakeholder roundtables with clinicians & veterinary experts' },
  { key: 'APRICON', label: 'APRICON Convention', badge: 'Academic', desc: 'Clinical consensus and national academic conventions on zoonotic diseases' },
  { key: 'MEWAT_OUTREACH', label: 'Mewat Outreach Camp', badge: 'Field', desc: 'Field vaccination demonstrations and rural healthcare provider workshops' },
  { key: 'ONE_HEALTH_NORC', label: 'One Health (NORC)', badge: 'Policy', desc: 'National One Health coalition briefings and rabies control policy forums' },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('CARCON2024');
  const [visibleCount, setVisibleCount] = useState(24);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Reset pagination when switching tabs
  const handleCategoryChange = (key) => {
    setActiveCategory(key);
    setVisibleCount(24);
  };

  const currentCategoryObj = CATEGORIES.find((c) => c.key === activeCategory) || CATEGORIES[0];
  const images = galleryData[activeCategory] || [];
  const visibleImages = images.slice(0, visibleCount);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, images]);

  const handleNext = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex + 1) % images.length);
  };

  const handlePrev = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length);
  };

  const activeModalImage = selectedImageIndex !== null ? images[selectedImageIndex] : null;

  return (
    <div className="section" style={{ background: '#F8FAFC', minHeight: '85vh', paddingTop: '3.5rem', paddingBottom: '5rem' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <span className="section-badge">
            <ImageIcon size={14} /> Comprehensive Photo Archives ({Object.values(galleryData).reduce((a, b) => a + b.length, 0)} Photographs)
          </span>
          <h1 className="section-title">Consortium Photo Gallery</h1>
          <p className="section-subtitle">
            Visual record of National CARCON conferences, World Rabies Day campaigns, medical college CMEs, and field outreach programs across India.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '0.6rem', 
            flexWrap: 'wrap', 
            marginBottom: '2.5rem' 
          }}
        >
          {CATEGORIES.map((tab) => {
            const count = galleryData[tab.key]?.length || 0;
            const isSelected = activeCategory === tab.key;
            return (
              <button
                type="button"
                key={tab.key}
                onClick={() => handleCategoryChange(tab.key)}
                style={{
                  padding: '0.55rem 1.15rem',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                  background: isSelected ? 'var(--primary)' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : 'var(--text-main)',
                  boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  transition: 'all 150ms ease'
                }}
              >
                <span>{tab.label}</span>
                <span 
                  style={{ 
                    background: isSelected ? 'rgba(255, 255, 255, 0.25)' : '#E2E8F0', 
                    color: isSelected ? '#FFFFFF' : 'var(--text-muted)',
                    borderRadius: 'var(--radius-full)', 
                    padding: '0.1rem 0.45rem', 
                    fontSize: '0.725rem',
                    fontWeight: 700 
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category Description Banner */}
        <div 
          style={{ 
            background: '#FFFFFF', 
            borderRadius: 'var(--radius-md)', 
            padding: '1.25rem 1.75rem', 
            marginBottom: '2rem',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <strong style={{ fontSize: '1.15rem', color: 'var(--primary-dark)' }}>{currentCategoryObj.label}</strong>
              <span className="badge badge-teal" style={{ fontSize: '0.7rem' }}>{currentCategoryObj.badge}</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>
              {currentCategoryObj.desc}
            </p>
          </div>
          <span style={{ fontSize: '0.825rem', color: 'var(--text-light)', fontWeight: 600 }}>
            Showing {Math.min(visibleCount, images.length)} of {images.length} photos
          </span>
        </div>

        {/* Gallery Image Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '1.25rem',
            marginBottom: '3rem'
          }}
        >
          {visibleImages.map((img, idx) => (
            <div 
              key={idx} 
              className="card" 
              style={{ 
                padding: '0.5rem', 
                cursor: 'pointer', 
                overflow: 'hidden',
                background: '#FFFFFF',
                border: '1px solid var(--border-subtle)',
                transition: 'transform 200ms ease, box-shadow 200ms ease'
              }}
              onClick={() => setSelectedImageIndex(idx)}
            >
              <div 
                style={{ 
                  width: '100%', 
                  height: 220, 
                  overflow: 'hidden', 
                  borderRadius: 'calc(var(--radius-lg) - 6px)', 
                  background: '#E2E8F0',
                  position: 'relative'
                }}
              >
                <img 
                  src={img.src} 
                  alt={img.title}
                  loading="lazy"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    transition: 'transform 300ms ease' 
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div 
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    background: 'rgba(15, 23, 42, 0.65)',
                    color: '#FFFFFF',
                    borderRadius: 'var(--radius-full)',
                    padding: '0.3rem',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Maximize2 size={13} />
                </div>
              </div>
              <div style={{ padding: '0.75rem 0.5rem 0.35rem' }}>
                <span className="badge badge-blue" style={{ fontSize: '0.675rem', marginBottom: '0.35rem', display: 'inline-block' }}>
                  {img.category}
                </span>
                <p 
                  style={{ 
                    fontSize: '0.85rem', 
                    fontWeight: 600, 
                    color: 'var(--primary-dark)', 
                    margin: 0,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {img.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < images.length && (
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 24)}
              className="btn btn-outline"
              style={{ padding: '0.75rem 2rem', fontSize: '0.95rem' }}
            >
              Load More Photos ({images.length - visibleCount} Remaining)
            </button>
          </div>
        )}

        {/* Lightbox Modal */}
        {activeModalImage && (
          <div 
            style={{ 
              position: 'fixed', 
              inset: 0, 
              zIndex: 1000, 
              background: 'rgba(10, 25, 48, 0.94)', 
              backdropFilter: 'blur(10px)', 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              justifyContent: 'center', 
              padding: '2rem 1.5rem' 
            }}
            onClick={() => setSelectedImageIndex(null)}
          >
            {/* Top Toolbar */}
            <div 
              style={{ 
                maxWidth: 960, 
                width: '100%', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '1rem',
                color: '#FFFFFF'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <span className="badge badge-teal" style={{ marginRight: '0.5rem' }}>{activeModalImage.category}</span>
                <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
                  Photo {selectedImageIndex + 1} of {images.length}
                </span>
              </div>
              <button 
                type="button"
                onClick={() => setSelectedImageIndex(null)} 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)', 
                  border: 'none', 
                  color: '#FFFFFF', 
                  cursor: 'pointer',
                  borderRadius: '50%',
                  width: 36,
                  height: 36,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Close (Esc)"
              >
                <X size={20} />
              </button>
            </div>

            {/* Image Stage with Controls */}
            <div 
              style={{ 
                position: 'relative', 
                maxWidth: 960, 
                width: '100%', 
                maxHeight: '76vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                style={{
                  position: 'absolute',
                  left: -55,
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  width: 44,
                  height: 44,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 150ms ease'
                }}
                title="Previous (Left Arrow)"
              >
                <ChevronLeft size={24} />
              </button>

              <img 
                src={activeModalImage.src} 
                alt={activeModalImage.title}
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '74vh', 
                  objectFit: 'contain', 
                  borderRadius: 'var(--radius-md)', 
                  boxShadow: 'var(--shadow-xl)',
                  border: '1px solid rgba(255, 255, 255, 0.15)'
                }}
              />

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                style={{
                  position: 'absolute',
                  right: -55,
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  width: 44,
                  height: 44,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 150ms ease'
                }}
                title="Next (Right Arrow)"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bottom Caption */}
            <div style={{ maxWidth: 960, width: '100%', textAlign: 'center', marginTop: '1rem', color: '#FFFFFF' }} onClick={(e) => e.stopPropagation()}>
              <p style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600 }}>
                {activeModalImage.title}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
