'use client'

import { useState } from 'react'
import { ArrowRight, ChevronDown, Search, SlidersHorizontal } from 'lucide-react'

const Arrow = () => <ArrowRight aria-hidden="true" className="arrow" size={17} strokeWidth={2.2} />

function Logo() {
  return <div className="brand" aria-label="Vaiket Developers home">
    <span>Vaiket Developers</span>
  </div>
}

function Icon({ type }: { type: 'whatsapp' | 'phone' | 'chat' }) {
  if (type === 'whatsapp') return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3.5A12.5 12.5 0 0 0 5.2 22.3L3.5 28.5l6.4-1.7A12.5 12.5 0 1 0 16 3.5Z"/><path d="M11.1 10.2c.3-.7.6-.7 1.1-.7h.8c.3 0 .6.1.8.6l1 2.5c.1.3.1.6-.1.8l-.7.9c-.2.2-.3.4-.1.7.7 1.2 1.7 2.2 3 2.8.3.1.5.1.7-.1l.9-1c.2-.2.5-.3.8-.2l2.5 1.2c.3.2.5.4.4.8-.2 1.1-1.1 2.1-2 2.4-1 .3-2.2-.1-3.1-.5-1.9-.9-3.5-2.2-4.8-3.8-1-1.2-2.1-2.9-2.2-4.5 0-.8.4-1.5 1-1.9Z"/></svg>
  if (type === 'phone') return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8.5 5.5 12 4l3.2 7.2-3.1 1.7a19.2 19.2 0 0 0 7 7l1.7-3.1L28 20l-1.5 3.5c-.5 1.2-1.7 2-3 1.9C12.2 24.7 7.3 19.8 6.6 8.5c-.1-1.3.7-2.5 1.9-3Z"/></svg>
  return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 7.5h22v15H14l-7 5v-5H5v-15Z"/><path d="M10 13h12M10 17h8"/></svg>
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  return <main>
    <header className="site-header">
      <a className="logo-link" href="#top"><Logo /></a>
      <button className="mobile-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '×' : '☰'}</button>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
        <a className="active" href="#top">Home</a>
        <a href="#apis">API <ChevronDown aria-hidden="true" size={15} /></a>
        <a href="#docs">Docs <ChevronDown aria-hidden="true" size={15} /></a>
        <a href="#resources">Resources <ChevronDown aria-hidden="true" size={15} /></a>
      </nav>
      <div className="header-actions">
        <a className="dashboard-button" href="https://app.vaiket.com/dashboard/settings?view=api-credentials">Developer Dashboard <Arrow /></a>
        <button className="icon-button" aria-label="Search"><Search size={20} strokeWidth={2} /></button>
        <button className="filter-button" aria-label="Settings"><SlidersHorizontal size={20} strokeWidth={1.8} /></button>
      </div>
    </header>

    <div className="page-shell" id="top">
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-copy">
          <h1>Build with <em>Vaiket</em></h1>
          <p>APIs, SDKs, and documentation to integrate WhatsApp Business,<br className="desktop" /> AI Telecalling, and RCS into your products.</p>
        </div>
        <a className="light-button" href="#apis">Get Started <Arrow /></a>
      </section>

      <section className="api-grid" id="apis">
        <a className="api-card" href="/docs#whatsapp-api"><Icon type="whatsapp" /><h2>WhatsApp Business API</h2><p>Integrate WhatsApp for business communication, notifications, automation, and more.</p></a>
        <article className="api-card coming-soon"><span className="coming-badge">COMING SOON</span><Icon type="phone" /><h2>AI Telecalling API</h2><p>Add intelligent, human-like voice calling with automation, IVR, and real-time workflows.</p></article>
        <article className="api-card coming-soon"><span className="coming-badge">COMING SOON</span><Icon type="chat" /><h2>RCS Business Messaging</h2><p>Build rich, interactive, and branded conversations with RCS.</p></article>
      </section>

      <section className="feature-grid" id="docs">
        <article className="feature-card">
          <div className="feature-copy"><h2>Use cases</h2><p>See how developers build real solutions<br className="desktop" /> on top of Vaiket APIs.</p><a href="#resources" className="dark-button">Explore use cases <Arrow /></a></div>
          <div className="visual code-visual"><div className="window-dots"><i /><i /><i /></div><div className="code-lines"><b>&lt;/&gt;</b><span /><span /><span className="short" /></div></div>
        </article>
        <article className="feature-card">
          <div className="feature-copy"><h2>Quickstart</h2><p>Get up and running with sample code,<br className="desktop" /> SDKs, and step-by-step guides.</p><a href="/docs" className="dark-button">View docs <Arrow /></a></div>
          <div className="visual docs-visual"><div className="doc-back" /><div className="doc-mid" /><div className="doc-front"><span>▶</span><i /></div></div>
        </article>
      </section>
      <section className="sr-only" id="resources"><h2>Resources</h2></section>
      <section className="sr-only" id="dashboard"><h2>Developer Dashboard</h2></section>
    </div>
  </main>
}
