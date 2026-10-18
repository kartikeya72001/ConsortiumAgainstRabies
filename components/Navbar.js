'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ShieldAlert, 
  Users, 
  Calendar, 
  Download, 
  Image as ImageIcon, 
  Lock, 
  Award, 
  HeartPulse, 
  Mail, 
  ChevronDown, 
  Home,
  FileText
} from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Primary top-level navigation items
  const primaryLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/members', label: 'Life Members', icon: Users },
    { href: '/conferences', label: 'CARCON', icon: Calendar },
    { href: '/guidelines', label: 'Guidelines', icon: ShieldAlert },
    { href: '/leadership', label: 'Leadership', icon: Award },
  ];

  // Secondary items grouped into "Resources" dropdown
  const resourceLinks = [
    { href: '/downloads', label: 'Downloads & WHO Papers', icon: Download },
    { href: '/gallery', label: 'Photo Gallery', icon: ImageIcon },
    { href: '/contact', label: 'Contact Secretariat', icon: Mail },
  ];

  const isResourceActive = resourceLinks.some((l) => pathname === l.href);

  return (
    <header className="header-wrapper">
      {/* Top Banner Bar */}
      <div className="top-bar">
        <div className="header-container top-bar-content">
          <div className="top-bar-tag">
            <span className="top-bar-pulse"></span>
            <span>Consortium Against Rabies (India) • Committed to Zero Human Rabies Deaths</span>
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <span style={{ color: '#94A3B8' }}>Animal Bite Emergency?</span>
            <Link href="/guidelines" style={{ color: '#38BDF8', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              PEP Clinical Protocol →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="header-container">
        <nav className="nav-container" aria-label="Main Navigation">
          {/* Brand Logo & Title */}
          <Link href="/" className="brand-link" id="site-logo-link">
            <img 
              src="/Logo.jpg" 
              alt="Consortium Against Rabies" 
              className="brand-logo-img" 
              width={44}
              height={44}
            />
            <div className="brand-text-col">
              <span className="brand-title">CONSORTIUM AGAINST RABIES</span>
              <span className="brand-sub">National Medical Network • India</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="nav-menu">
            {primaryLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href} className="nav-item">
                  <Link 
                    href={item.href} 
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    id={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}

            {/* Resources Dropdown */}
            <li className="nav-item" ref={dropdownRef}>
              <button
                type="button"
                className={`nav-link ${isResourceActive ? 'active' : ''}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
                id="nav-resources-dropdown"
              >
                <span>Resources</span>
                <ChevronDown 
                  size={14} 
                  style={{ 
                    transition: 'transform 150ms ease',
                    transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' 
                  }} 
                />
              </button>

              {dropdownOpen && (
                <div className="nav-dropdown-menu">
                  {resourceLinks.map((sub) => {
                    const isSubActive = pathname === sub.href;
                    return (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setDropdownOpen(false)}
                        className={`dropdown-item ${isSubActive ? 'active' : ''}`}
                      >
                        <sub.icon size={15} color="var(--primary)" />
                        <span>{sub.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </li>
          </ul>

          {/* Right Action Area */}
          <div className="nav-actions">
            <Link 
              href="/apply" 
              className="btn-nav-cta"
              id="nav-join-car-btn"
            >
              <HeartPulse size={15} />
              Join CAR
            </Link>

            <Link 
              href="/admin" 
              className={`btn-nav-admin ${pathname === '/admin' ? 'active' : ''}`}
              title="Admin Portal"
              id="nav-admin-btn"
            >
              <Lock size={13} />
              Admin
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            type="button"
            className="mobile-toggle" 
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-drawer" onClick={() => setMobileOpen(false)}>
          <div className="mobile-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <img src="/Logo.jpg" alt="CAR Logo" width={32} height={32} style={{ borderRadius: '50%' }} />
                <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--primary-dark)' }}>Consortium Against Rabies</span>
              </div>
              <button 
                type="button"
                onClick={() => setMobileOpen(false)} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={22} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {[...primaryLinks, ...resourceLinks].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`nav-link ${pathname === item.href ? 'active' : ''}`}
                  style={{ padding: '0.75rem 0.6rem', fontSize: '0.95rem' }}
                >
                  <item.icon size={17} />
                  {item.label}
                </Link>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
              <Link
                href="/apply"
                onClick={() => setMobileOpen(false)}
                className="btn-nav-cta"
                style={{ justifyContent: 'center', width: '100%', padding: '0.7rem' }}
              >
                <HeartPulse size={16} />
                Join Consortium
              </Link>

              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className="btn-nav-admin"
                style={{ justifyContent: 'center', width: '100%', padding: '0.6rem' }}
              >
                <Lock size={14} />
                Admin Portal
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
