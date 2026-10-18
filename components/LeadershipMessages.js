'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Award, 
  UserCheck, 
  ShieldCheck, 
  Quote, 
  ChevronRight, 
  ChevronLeft, 
  BookOpen, 
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function LeadershipMessages({ messages }) {
  // Default to the first message or check URL hash
  const [activeTab, setActiveTab] = useState('president');

  useEffect(() => {
    // Check if URL has a hash matching one of the leaders
    const hash = window.location.hash.replace('#', '');
    if (hash === 'all') {
      setActiveTab('all');
    } else if (messages.some((m) => m.id === hash)) {
      setActiveTab(hash);
    }
  }, [messages]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${tabId}`);
    }
  };

  const currentIndex = messages.findIndex((m) => m.id === activeTab);
  const activeMessage = messages[currentIndex] || messages[0];

  const handlePrev = () => {
    const newIdx = (currentIndex - 1 + messages.length) % messages.length;
    handleTabChange(messages[newIdx].id);
  };

  const handleNext = () => {
    const newIdx = (currentIndex + 1) % messages.length;
    handleTabChange(messages[newIdx].id);
  };

  return (
    <div style={{ marginBottom: '4rem' }}>
      {/* Overview 4-Leader Snapshot Cards */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
          gap: '1.25rem', 
          marginBottom: '2.5rem' 
        }}
      >
        {messages.map((item) => {
          const isSelected = activeTab === item.id;
          return (
            <div
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className="card"
              style={{
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'all 200ms ease',
                border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                background: isSelected ? '#FFFFFF' : '#FAFAFA',
                boxShadow: isSelected ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                transform: isSelected ? 'translateY(-3px)' : 'none',
                position: 'relative'
              }}
            >
              {isSelected && (
                <div 
                  style={{ 
                    position: 'absolute', 
                    top: 10, 
                    right: 12, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px',
                    color: 'var(--primary)',
                    fontSize: '0.75rem',
                    fontWeight: 700 
                  }}
                >
                  <Sparkles size={13} /> Active
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.85rem' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: 58,
                    height: 58,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: isSelected ? '2px solid var(--primary)' : '2px solid #E2E8F0',
                    flexShrink: 0
                  }}
                  onError={(e) => {
                    e.currentTarget.src = '/Logo.jpg';
                  }}
                />
                <div style={{ minWidth: 0 }}>
                  <span 
                    className="badge badge-teal" 
                    style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', marginBottom: '0.25rem', display: 'inline-block' }}
                  >
                    {item.role}
                  </span>
                  <h3 
                    style={{ 
                      fontSize: '1.05rem', 
                      color: 'var(--primary-dark)', 
                      whiteSpace: 'nowrap', 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis',
                      fontWeight: 700 
                    }}
                  >
                    {item.name}
                  </h3>
                </div>
              </div>

              <p 
                style={{ 
                  fontSize: '0.825rem', 
                  color: 'var(--text-light)', 
                  lineHeight: '1.4', 
                  marginBottom: '0.85rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {item.designation}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                <span 
                  style={{ 
                    fontSize: '0.825rem', 
                    fontWeight: 600, 
                    color: isSelected ? 'var(--primary)' : 'var(--text-muted)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  {isSelected ? 'Reading message' : 'Read message'} →
                </span>
                <Quote size={15} color={isSelected ? 'var(--primary)' : '#CBD5E1'} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Mode / Quick Selector Pill Bar */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '1rem',
          marginBottom: '1.5rem',
          background: '#FFFFFF',
          padding: '0.75rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', marginRight: '0.25rem' }}>
            Select Message:
          </span>
          {messages.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => handleTabChange(m.id)}
              style={{
                border: 'none',
                background: activeTab === m.id ? 'var(--primary)' : '#F1F5F9',
                color: activeTab === m.id ? '#FFFFFF' : 'var(--text-main)',
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: activeTab === m.id ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 150ms ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <span>{m.role.split('&')[0].trim()}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => handleTabChange(activeTab === 'all' ? 'president' : 'all')}
          style={{
            border: activeTab === 'all' ? '1px solid var(--primary)' : '1px solid #CBD5E1',
            background: activeTab === 'all' ? 'var(--primary-subtle)' : '#FFFFFF',
            color: activeTab === 'all' ? 'var(--primary-dark)' : 'var(--text-muted)',
            padding: '0.45rem 1rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          <Layers size={14} />
          {activeTab === 'all' ? 'Switch to Spotlight View' : 'View All 4 Messages Stacked'}
        </button>
      </div>

      {/* Conditional Rendering: Spotlight View vs All Messages Stacked */}
      {activeTab === 'all' ? (
        /* ================= ALL 4 MESSAGES STACKED ================= */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {messages.map((item, idx) => (
            <div 
              key={item.id} 
              id={item.id}
              className="card"
              style={{
                padding: '2.5rem',
                background: '#FFFFFF',
                borderTop: idx % 2 === 0 ? '5px solid var(--primary)' : '5px solid var(--accent-teal)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'minmax(180px, 200px) 1fr', 
                  gap: '2.5rem', 
                  alignItems: 'flex-start' 
                }}
              >
                {/* Portrait Column */}
                <div style={{ textAlign: 'center' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '100%',
                      maxWidth: '180px',
                      borderRadius: 'var(--radius-lg)',
                      boxShadow: 'var(--shadow-md)',
                      border: '3px solid #FFFFFF',
                      marginBottom: '1rem',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      e.currentTarget.src = '/Logo.jpg';
                    }}
                  />
                  <span className="badge badge-blue" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>
                    {item.role}
                  </span>
                  <h4 style={{ fontSize: '1.15rem', color: 'var(--primary-dark)', marginBottom: '0.35rem' }}>
                    {item.name}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', lineHeight: '1.4' }}>
                    {item.designation}
                  </p>
                </div>

                {/* Message Body */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
                      <Quote size={20} />
                      <h3 style={{ fontSize: '1.35rem', color: 'var(--primary-dark)', fontWeight: 700 }}>
                        {item.role}'s Official Address
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleTabChange(item.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--primary)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.2rem'
                      }}
                    >
                      Focus view <ExternalLink size={13} />
                    </button>
                  </div>

                  <div 
                    style={{ 
                      fontSize: '1.025rem', 
                      color: 'var(--text-muted)', 
                      lineHeight: '1.8', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '1.15rem' 
                    }}
                  >
                    {item.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>
                        {pIdx === 0 && <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-dark)', marginRight: '0.25rem' }}>"</span>}
                        {p}
                        {pIdx === item.paragraphs.length - 1 && <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-dark)', marginLeft: '0.25rem' }}>"</span>}
                      </p>
                    ))}
                  </div>

                  <div 
                    style={{ 
                      marginTop: '2rem', 
                      paddingTop: '1.25rem', 
                      borderTop: '1px dashed var(--border-subtle)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.9rem'
                    }}
                  >
                    <div>
                      <strong style={{ color: 'var(--primary-dark)' }}>{item.name}</strong>
                      <span style={{ color: 'var(--text-light)', marginLeft: '0.5rem' }}>• {item.role}</span>
                    </div>
                    <span style={{ color: 'var(--text-light)' }}>Consortium Against Rabies (India)</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ================= SPOTLIGHT FEATURED MESSAGE ================= */
        <div 
          id={activeMessage.id}
          className="card" 
          style={{ 
            padding: '3rem', 
            background: '#FFFFFF', 
            borderTop: '5px solid var(--primary)',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'minmax(200px, 240px) 1fr', 
              gap: '3rem', 
              alignItems: 'flex-start' 
            }}
          >
            {/* Left Column: Leader Photo & Identity */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.25rem' }}>
                <img 
                  src={activeMessage.image} 
                  alt={activeMessage.name} 
                  style={{ 
                    width: '100%', 
                    maxWidth: '220px', 
                    borderRadius: 'var(--radius-lg)', 
                    boxShadow: 'var(--shadow-md)', 
                    border: '4px solid #FFFFFF',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = '/Logo.jpg';
                  }}
                />
                <div 
                  style={{
                    position: 'absolute',
                    bottom: -10,
                    right: '50%',
                    transform: 'translateX(50%)',
                    background: 'var(--primary)',
                    color: '#FFFFFF',
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    boxShadow: 'var(--shadow-sm)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Verified Leader
                </div>
              </div>

              <div style={{ marginTop: '0.75rem' }}>
                <span className="badge badge-blue" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>
                  {activeMessage.role}
                </span>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-dark)', marginBottom: '0.35rem', fontWeight: 800 }}>
                  {activeMessage.name}
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--accent-teal-dark)', fontWeight: 600, lineHeight: '1.4', marginBottom: '1.5rem' }}>
                  {activeMessage.designation}
                </p>

                {/* Cycler buttons */}
                <div 
                  style={{ 
                    display: 'flex', 
                    gap: '0.5rem', 
                    justifyContent: 'center', 
                    borderTop: '1px solid var(--border-subtle)', 
                    paddingTop: '1.25rem' 
                  }}
                >
                  <button
                    type="button"
                    onClick={handlePrev}
                    title="Previous message"
                    style={{
                      border: '1px solid var(--border-subtle)',
                      background: '#F8FAFC',
                      padding: '0.5rem 0.8rem',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)'
                    }}
                  >
                    <ChevronLeft size={16} /> Prev
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    title="Next message"
                    style={{
                      border: '1px solid var(--border-subtle)',
                      background: '#F8FAFC',
                      padding: '0.5rem 0.8rem',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)'
                    }}
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Complete Message Body */}
            <div>
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem', 
                  marginBottom: '1.5rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid var(--border-subtle)'
                }}
              >
                <div 
                  style={{ 
                    width: 44, 
                    height: 44, 
                    borderRadius: '50%', 
                    background: 'var(--primary-subtle)', 
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Quote size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-dark)', fontWeight: 800 }}>
                    {activeMessage.role}'s Official Address
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                    Published for the Consortium Against Rabies national registry & public advocacy
                  </p>
                </div>
              </div>

              {/* Lead highlight excerpt */}
              <div 
                style={{
                  background: 'var(--primary-subtle)',
                  borderLeft: '4px solid var(--primary)',
                  padding: '1.25rem 1.5rem',
                  borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                  marginBottom: '1.75rem',
                  fontStyle: 'italic',
                  fontSize: '1.05rem',
                  color: 'var(--primary-dark)',
                  lineHeight: '1.6'
                }}
              >
                "{activeMessage.paragraphs[0]}"
              </div>

              {/* Full Paragraphs */}
              <div 
                style={{ 
                  fontSize: '1.025rem', 
                  color: 'var(--text-muted)', 
                  lineHeight: '1.8', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '1.25rem' 
                }}
              >
                {activeMessage.paragraphs.slice(1).map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Formal Signature Block */}
              <div 
                style={{ 
                  marginTop: '2.5rem', 
                  paddingTop: '1.5rem', 
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '0.2rem' }}>With warm professional regards,</p>
                  <p style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-dark)' }}>{activeMessage.name}</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--accent-teal-dark)', fontWeight: 600 }}>{activeMessage.role}</p>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-light)' }}>Consortium Against Rabies (India)</p>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => handleTabChange('all')}
                    className="btn btn-outline btn-sm"
                  >
                    View All Messages Stacked
                  </button>
                  <Link href="/members" className="btn btn-primary btn-sm">
                    View Life Members Directory →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
