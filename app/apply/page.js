'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  HeartPulse, 
  CheckCircle2, 
  Download, 
  FileCheck, 
  ShieldCheck, 
  Award, 
  User, 
  Mail, 
  Phone, 
  Building, 
  Send 
} from 'lucide-react';

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    qualification: '',
    speciality: 'Community Medicine',
    designation: '',
    institution: '',
    city: '',
    state: 'Delhi',
    registrationNumber: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate submission / can call /api/apply
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="section" style={{ background: '#F8FAFC' }}>
      <div className="container" style={{ maxWidth: 860 }}>
        {/* Header */}
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <span className="section-badge">
            <HeartPulse size={14} /> Medical Community
          </span>
          <h1 className="section-title">Apply for Life Membership</h1>
          <p className="section-subtitle">
            Join 179+ certified medical professionals, academicians, and health specialists across India committed to the eradication of human rabies.
          </p>
        </div>

        {/* Benefits bar */}
        <div className="grid-3" style={{ marginBottom: '2.5rem' }}>
          <div className="card" style={{ padding: '1.25rem', textAlign: 'center' }}>
            <Award size={24} color="#0F3E6D" style={{ margin: '0 auto 0.5rem' }} />
            <strong style={{ display: 'block', fontSize: '0.95rem' }}>National CARCON</strong>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Priority delegate registration & CME credits</span>
          </div>
          <div className="card" style={{ padding: '1.25rem', textAlign: 'center' }}>
            <ShieldCheck size={24} color="#0D9488" style={{ margin: '0 auto 0.5rem' }} />
            <strong style={{ display: 'block', fontSize: '0.95rem' }}>Official Life Member ID</strong>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Listed on national public registry</span>
          </div>
          <div className="card" style={{ padding: '1.25rem', textAlign: 'center' }}>
            <FileCheck size={24} color="#D97706" style={{ margin: '0 auto 0.5rem' }} />
            <strong style={{ display: 'block', fontSize: '0.95rem' }}>Research & Guidelines</strong>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Access to clinical consensus drafts</span>
          </div>
        </div>

        {submitted ? (
          <div className="card" style={{ padding: '3.5rem 2rem', textAlign: 'center', background: '#FFFFFF' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <CheckCircle2 size={36} />
            </div>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--primary-dark)', marginBottom: '0.75rem' }}>
              Application Successfully Received!
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: 540, margin: '0 auto 1.5rem', lineHeight: '1.6' }}>
              Thank you, <strong>{formData.fullName}</strong>. Your provisional membership reference number is <strong>CAR-APP-{Math.floor(1000 + Math.random() * 9000)}</strong>.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: 540, margin: '0 auto 2rem' }}>
              The CAR Honorary Secretariat will review your credentials and reach out to you via email ({formData.email}) with the certificate and registration onboarding details.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link href="/members" className="btn btn-primary">
                Browse Members Directory
              </Link>
              <button 
                type="button"
                onClick={() => setSubmitted(false)} 
                className="btn btn-outline"
              >
                Submit Another Application
              </button>
            </div>
          </div>
        ) : (
          <div className="card" style={{ padding: '2.5rem', background: '#FFFFFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', flexWrap: 'wrap', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-dark)' }}>Online Application Form</h3>
              <a 
                href="/downloads/life_membership_application_form_car_2019.doc" 
                download 
                className="btn btn-outline btn-sm"
              >
                <Download size={14} />
                Download Offline Form (.doc)
              </a>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Full Name with Title (e.g. Dr. John Doe) *</label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    className="form-control"
                    placeholder="Dr. Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    name="email"
                    className="form-control"
                    placeholder="doctor@hospital.org"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    className="form-control"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Medical / Veterinary Council Reg. No. *</label>
                  <input
                    type="text"
                    required
                    name="registrationNumber"
                    className="form-control"
                    placeholder="MCI / State Council / VCI Reg. No."
                    value={formData.registrationNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Highest Qualification *</label>
                  <input
                    type="text"
                    required
                    name="qualification"
                    className="form-control"
                    placeholder="MBBS, MD, DNB, PhD, MVSc..."
                    value={formData.qualification}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Speciality / Department</label>
                  <select
                    name="speciality"
                    className="form-control"
                    value={formData.speciality}
                    onChange={handleChange}
                  >
                    <option value="Community Medicine">Community Medicine / Public Health</option>
                    <option value="Paediatrics">Paediatrics</option>
                    <option value="General Medicine">General Medicine</option>
                    <option value="Veterinary Sciences">Veterinary Sciences / One Health</option>
                    <option value="Microbiology">Microbiology / Virology</option>
                    <option value="Emergency Medicine">Emergency Medicine</option>
                    <option value="Other">Other Medical Speciality</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Current Designation *</label>
                  <input
                    type="text"
                    required
                    name="designation"
                    className="form-control"
                    placeholder="Professor, Associate Prof, Medical Officer..."
                    value={formData.designation}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Institution / Hospital / Clinic *</label>
                  <input
                    type="text"
                    required
                    name="institution"
                    className="form-control"
                    placeholder="AIIMS, Medical College, Hospital Name..."
                    value={formData.institution}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input
                    type="text"
                    required
                    name="city"
                    className="form-control"
                    placeholder="New Delhi, Lucknow, Jaipur..."
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">State / Union Territory *</label>
                  <select
                    name="state"
                    className="form-control"
                    value={formData.state}
                    onChange={handleChange}
                  >
                    <option value="Delhi">Delhi</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Jammu & Kashmir">Jammu & Kashmir</option>
                    <option value="Other">Other State</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem', alignItems: 'center' }}>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-light)', margin: 0 }}>
                  By applying, you agree to adhere to CAR academic and clinical objectives.
                </p>
                <button 
                  type="submit" 
                  disabled={submitting} 
                  className="btn btn-teal btn-lg"
                  id="submit-application-btn"
                >
                  <Send size={16} />
                  {submitting ? 'Submitting Application...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
