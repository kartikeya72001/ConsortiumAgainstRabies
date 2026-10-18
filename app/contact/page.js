'use client';

import { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="section" style={{ background: '#F8FAFC' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-badge">Get in Touch</span>
          <h1 className="section-title">Contact Secretariat</h1>
          <p className="section-subtitle">
            Have questions regarding life membership, conference registrations, or clinical guidelines? Reach out to our honorary executive team.
          </p>
        </div>

        <div className="grid-2" style={{ gap: '3rem', alignItems: 'flex-start' }}>
          {/* Contact Details */}
          <div>
            <div className="card" style={{ marginBottom: '1.5rem', padding: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-dark)', marginBottom: '1.25rem' }}>
                Consortium Against Rabies (CAR)
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--primary-subtle)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--text-main)' }}>Secretariat Office</strong>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5', display: 'block' }}>
                      Department of Community Medicine,<br />
                      UCMS & GTB Hospital,<br />
                      Dilshad Garden, Delhi - 110095, India
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent-teal-subtle)', color: 'var(--accent-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--text-main)' }}>Official Email</strong>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      secretariat@consortiumagainstrabies.in
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--text-main)' }}>Secretariat Response</strong>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      Inquiries processed within 48–72 working hours by the honorary team.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Notice */}
            <div className="card" style={{ background: '#FFF1F2', borderLeft: '4px solid var(--accent-coral)', padding: '1.5rem' }}>
              <strong style={{ color: '#9F1239', display: 'block', marginBottom: '0.35rem' }}>
                Note for Acute Animal Bite Patients:
              </strong>
              <p style={{ fontSize: '0.875rem', color: '#881337', margin: 0, lineHeight: '1.5' }}>
                CAR is an academic and public health advocacy consortium. If you or someone you know has suffered a fresh animal bite, immediately wash the wound with soap and water and report to the 24/7 Anti-Rabies Clinic at the nearest government medical college or district hospital.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card" style={{ padding: '2.5rem', background: '#FFFFFF' }}>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-dark)', marginBottom: '1.5rem' }}>
              Send an Inquiry to Secretariat
            </h3>

            {sent ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <CheckCircle2 size={48} color="#16A34A" style={{ margin: '0 auto 1rem' }} />
                <h4 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Message Dispatched!</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                  Thank you for reaching out. The honorary secretariat has received your inquiry.
                </p>
                <button 
                  type="button"
                  onClick={() => setSent(false)} 
                  className="btn btn-primary btn-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="Dr. / Mr. / Ms."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="form-control"
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Subject *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="Membership Status / CARCON Registration / Guidelines"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message Details *</label>
                  <textarea
                    required
                    rows={4}
                    className="form-control"
                    placeholder="Write your inquiry here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ width: '100%', marginTop: '0.5rem' }}
                  id="submit-contact-btn"
                >
                  <Send size={16} />
                  Send Inquiry to Secretariat
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
