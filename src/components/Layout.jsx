import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { APP_VERSION } from '../lib/version'
import logo from '../assets/logo.png'

export default function Layout({ children }) {
  const { profile, isAdmin, signOut } = useAuth()
  const [navOpen, setNavOpen] = useState(false)

  const links = isAdmin
    ? [
        { to: '/admin', label: 'Orders', end: true },
        { to: '/admin/techs', label: 'Technicians' },
        { to: '/admin/schedule', label: 'Schedule' },
        { to: '/admin/sop', label: 'SOP & notes' },
        { to: '/admin/my-orders', label: 'My orders (as tech)' },
        { to: '/admin/my-availability', label: 'My availability' },
      ]
    : [
        { to: '/tech', label: 'My orders', end: true },
        { to: '/tech/availability', label: 'My availability' },
        { to: '/tech/sop', label: 'SOP & notes' },
      ]

  const closeNav = () => setNavOpen(false)

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-topbar">
          <div className="sidebar-brand">
            <img
              src={logo}
              alt="EmailDone4U"
              style={{ width: '100%', maxWidth: 190, height: 'auto', display: 'block' }}
            />
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--blue)',
                marginTop: 6,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
              }}
            >
              {isAdmin ? 'Admin' : 'Tech'} Portal
            </div>
          </div>

          <button
            type="button"
            className="sidebar-toggle"
            aria-label={navOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={navOpen}
            onClick={() => setNavOpen(o => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className={`sidebar-body ${navOpen ? 'open' : ''}`}>
          <nav>
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={closeNav}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="sidebar-foot">
            <div style={{ color: 'var(--navy-900)', fontWeight: 600, marginBottom: 2 }}>
              {profile?.full_name}
            </div>
            <div style={{ marginBottom: 10 }}>{profile?.email}</div>
            <button
              onClick={signOut}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--blue)',
                fontSize: 12,
                fontWeight: 600,
                padding: 0,
                cursor: 'pointer',
              }}
            >
              Sign out
            </button>
            <div className="mono" style={{ marginTop: 10, color: 'var(--slate-500)' }}>
              {APP_VERSION}
            </div>
          </div>
        </div>
      </aside>

      <main className="main">{children}</main>
    </div>
  )
}
