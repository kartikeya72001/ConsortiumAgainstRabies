'use client';

import { useState } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState('CARCON');
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryData = {
    CARCON: [
      { src: '/gallery/Gallery/Carcon0003.jpg', title: 'CARCON Assembly Inauguration' },
      { src: '/gallery/Gallery/Carcon0017.jpg', title: 'Scientific Panel on IDRV' },
      { src: '/gallery/Gallery/Carcon0020.jpg', title: 'Executive Council Deliberation' },
      { src: '/gallery/Gallery/Carcon0032.jpg', title: 'Keynote Lecture by Dr. A.T. Kannan' },
      { src: '/gallery/Gallery/Carcon0044.jpg', title: 'Delegate Interactive Q&A' },
      { src: '/gallery/Gallery/Carcon0050.jpg', title: 'CME Presentation' },
      { src: '/gallery/Gallery/Carcon0064.jpg', title: 'Award Ceremony' },
      { src: '/gallery/Gallery/Carcon0070.jpg', title: 'Poster Session on Bite Management' },
      { src: '/gallery/Gallery/Carcon0086.jpg', title: 'Group Photograph of Life Members' },
    ],
    Mewat: [
      { src: '/gallery/MewatMedicalCollege/IMG_20161025_135303.jpg', title: 'Mewat Outreach Camp' },
      { src: '/gallery/MewatMedicalCollege/IMG_20161025_135244.jpg', title: 'Public Awareness Session' },
      { src: '/gallery/MewatMedicalCollege/IMG_20161025_135352.jpg', title: 'Medical College Training' },
      { src: '/gallery/MewatMedicalCollege/IMG-20161025-WA0033.jpg', title: 'Field Vaccination Demonstration' },
      { src: '/gallery/MewatMedicalCollege/IMG-20161026-WA0004.jpg', title: 'Student Health Interaction' },
    ],
    NORC: [
      { src: '/gallery/NORC/IMG-20190811-WA0081.jpg', title: 'National One Health Coalition' },
      { src: '/gallery/NORC/IMG-20190811-WA0082.jpg', title: 'Epidemiology Working Group' },
      { src: '/gallery/NORC/IMG-20190811-WA0034.jpg', title: 'Stakeholder Consultation' },
      { src: '/gallery/NORC/IMG-20190912-WA0051.jpg', title: 'Policy Recommendation Briefing' },
    ],
    Apricon: [
      { src: '/gallery/Apricon/IMG-20170711-WA0075.jpg', title: 'APRICON National Convention' },
      { src: '/gallery/Apricon/IMG-20170711-WA0074.jpg', title: 'International Speaker Address' },
      { src: '/gallery/Apricon/IMG-20170711-WA0089.jpg', title: 'Clinical Consensus Workshop' },
      { src: '/gallery/Apricon/IMG-20170711-WA0076.jpg', title: 'Expert Symposium on Rabies Control' },
    ],
  };

  const currentImages = galleryData[activeTab] || [];

  return (
    <div className="section" style={{ background: '#F8FAFC' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-badge">
            <ImageIcon size={14} /> Field & Academic Archives
          </span>
          <h1 className="section-title">Photo Gallery</h1>
          <p className="section-subtitle">
            Visual highlights from National CARCON conferences, CME workshops, community awareness camps, and academic conventions.
          </p>
        </div>

        {/* Tab Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {[
            { key: 'CARCON', label: 'CARCON Conferences' },
            { key: 'Mewat', label: 'Mewat Outreach' },
            { key: 'NORC', label: 'One Health (NORC)' },
            { key: 'Apricon', label: 'APRICON Convention' },
          ].map((tab) => (
            <button
              type="button"
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                border: '1px solid',
                borderColor: activeTab === tab.key ? 'var(--primary)' : 'var(--border-subtle)',
                background: activeTab === tab.key ? 'var(--primary)' : '#FFFFFF',
                color: activeTab === tab.key ? '#FFFFFF' : 'var(--text-muted)',
                boxShadow: activeTab === tab.key ? 'var(--shadow-sm)' : 'none',
                transition: 'all 150ms ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid-3" style={{ gap: '1.5rem' }}>
          {currentImages.map((img, idx) => (
            <div 
              key={idx} 
              className="card" 
              style={{ padding: '0.5rem', cursor: 'pointer', overflow: 'hidden' }}
              onClick={() => setSelectedImage(img)}
            >
              <div style={{ width: '100%', height: 240, overflow: 'hidden', borderRadius: 'calc(var(--radius-lg) - 6px)', background: '#E2E8F0' }}>
                <img 
                  src={img.src} 
                  alt={img.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 300ms ease' }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                />
              </div>
              <p style={{ padding: '0.75rem 0.5rem 0.25rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-dark)', margin: 0 }}>
                {img.title}
              </p>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(10, 25, 48, 0.9)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
            onClick={() => setSelectedImage(null)}
          >
            <div style={{ maxWidth: 840, width: '100%', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
              <button 
                type="button"
                onClick={() => setSelectedImage(null)} 
                style={{ position: 'absolute', top: -45, right: 0, background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}
              >
                <X size={32} />
              </button>
              <img 
                src={selectedImage.src} 
                alt={selectedImage.title}
                style={{ width: '100%', maxHeight: '78vh', objectFit: 'contain', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-xl)' }}
              />
              <p style={{ color: '#FFFFFF', textAlign: 'center', marginTop: '1rem', fontSize: '1.05rem', fontWeight: 500 }}>
                {selectedImage.title}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
