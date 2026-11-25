'use client'

import { useState } from 'react'
import { ArrowRight, ChevronDown, Search, SlidersHorizontal } from 'lucide-react'

const groups = [
  ['Get started', [['Quick start', 'quick-start'], ['Authentication', 'authentication']]],
  ['WhatsApp API', [['Accounts', 'accounts'], ['Contacts', 'contacts'], ['Conversations', 'conversations'], ['Read messages', 'messages'], ['Analytics', 'analytics'], ['Templates', 'templates'], ['Send template', 'send-template'], ['Idempotency', 'idempotency'], ['Errors & pagination', 'errors'], ['Message lifecycle', 'lifecycle'], ['Webhooks', 'webhooks']]],
  ['Integrations', [['Vaiket AI walkthrough', 'ai-walkthrough'], ['CRM API', 'crm-api'], ['Create leads', 'create-leads'], ['Web forms', 'web-forms']]],
  ['Coming soon', [['AI Telecalling API', 'ai-telecalling'], ['RCS Business Messaging', 'rcs-messaging']]],
] as const

const accountsCode = `curl https://app.vaiket.com/api/v1/whatsapp/accounts \\
  -H "Authorization: Bearer YOUR_VAIKET_API_KEY"`

function CodeBlock({ children, language = 'curl' }: { children: string; language?: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => { await navigator.clipboard?.writeText(children); setCopied(true); setTimeout(() => setCopied(false), 1400) }
  return <div className="docs-code"><div className="code-toolbar"><span>{language}</span><button onClick={copy}>{copied ? 'Copied' : 'Copy'}</button></div><pre><code>{children}</code></pre></div>
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return <section className="doc-section" id={id}><h2>{title}</h2>{children}</section>
}

function Endpoint({ method, path }: { method: string; path: string }) {
  return <div className="endpoint"><span className={method === 'POST' ? 'method post' : 'method'}>{method}</span><code>{path}</code></div>
}

export default function DocsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return <main className="docs-page">
    <header className="site-header docs-header">
      <a className="logo-link" href="/"><div className="brand"><span>Vaiket Developers</span></div></a>
      <nav className="docs-main-nav"><a href="/">Home</a><a className="active" href="/docs">API <ChevronDown aria-hidden="true" size={15} /></a><a href="#api-reference">Resources <ChevronDown aria-hidden="true" size={15} /></a></nav>
      <div className="header-actions"><a className="dashboard-button" href="https://app.vaiket.com/dashboard/settings?view=api-credentials">Developer Dashboard <ArrowRight aria-hidden="true" size={17} strokeWidth={2.2} /></a><button className="icon-button" aria-label="Search"><Search size={20} strokeWidth={2} /></button><button className="filter-button" aria-label="Settings"><SlidersHorizontal size={20} strokeWidth={1.8} /></button></div>
    </header>
    <div className="docs-tabs"><a className="active" href="#overview">Overview</a><a href="#whatsapp-api">WhatsApp API</a><a href="#crm-api">CRM API</a><a href="#ai-walkthrough">AI integration</a><a href="#api-reference">API reference</a></div>
    <button className="docs-mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>{sidebarOpen ? 'Close navigation' : 'Open documentation menu'}</button>
    <div className="docs-layout">
      <aside className={sidebarOpen ? 'docs-sidebar open' : 'docs-sidebar'}>
        <a className="sidebar-home" href="/docs">Overview</a>
        {groups.map(([title, items]) => <div className="sidebar-group" key={title}><h3>{title}</h3>{items.map(([label, id]) => <a href={`#${id}`} key={id} onClick={() => setSidebarOpen(false)}>{label}</a>)}</div>)}
        <div className="sidebar-group"><h3>Reference</h3><a href="#api-reference">All endpoints</a><a href="#security-note">Security note</a></div>
      </aside>
      <article className="docs-content" id="overview">
        <div className="eyebrow">VAIKET DEVELOPER DOCS</div><h1>Connect your product to Vaiket.</h1><p className="lede">One documentation home for WhatsApp messaging and CRM lead capture. Build reliable workflows with server-side credentials and clear, tenant-scoped APIs.</p>
        <div className="quickstart-panel" id="quick-start"><div className="quickstart-copy"><span className="pill">START HERE</span><h2>Developer quickstart</h2><p>Make your first WhatsApp API request in minutes. Discover an account, then read contacts and conversations.</p><div className="quick-actions"><a className="dark-button" href="#authentication">Get started <span className="arrow">→</span></a><a className="soft-button" href="#accounts">Explore accounts</a></div></div><CodeBlock>{accountsCode}</CodeBlock></div>
        <div className="notice-card"><div><strong>Build with the Vaiket API</strong><p>Use Vaiket IDs and server-side API keys to safely connect WhatsApp accounts, conversations, analytics, and CRM lead capture.</p></div><a href="#authentication" className="soft-button">Read authentication</a></div>
        <h2 className="content-heading">Build paths</h2><div className="path-grid"><a href="#whatsapp-api"><strong>WhatsApp Business API</strong><p>Read contacts, conversations, messages, analytics, and send approved templates.</p><span>Start with WhatsApp <b>↗</b></span></a><a href="#crm-api"><strong>CRM API</strong><p>Create leads from your website, application, or advertising workflow.</p><span>Start with CRM <b>↗</b></span></a></div><div className="coming-grid"><div className="coming-doc-card" id="ai-telecalling"><span className="coming-badge">COMING SOON</span><strong>AI Telecalling API</strong><p>Intelligent voice calling, IVR automation, and real-time workflows are being prepared for the next API release.</p></div><div className="coming-doc-card" id="rcs-messaging"><span className="coming-badge">COMING SOON</span><strong>RCS Business Messaging</strong><p>Rich, interactive, branded conversations with RCS will be added in a future documentation update.</p></div></div><div className="content-divider" />
        <Section id="authentication" title="Authentication"><p>Every WhatsApp API request uses a Vaiket Bearer API key. Keep keys in server-side secret storage. The API enforces tenant and account ownership and never returns Meta credentials.</p><CodeBlock language="http">Authorization: Bearer YOUR_VAIKET_API_KEY</CodeBlock></Section>
        <Section id="whatsapp-api" title="WhatsApp API"><p>Vaiket resolves the connected WhatsApp account, Phone Number ID, WABA ID, and provider credentials server-side. Read APIs use tenant-owned persisted WhatsApp data.</p></Section>
        <Section id="accounts" title="Accounts"><Endpoint method="GET" path="/api/v1/whatsapp/accounts" /><p>Returns safe account fields for the authenticated tenant. <code>accounts[].id</code> is the Vaiket account ID, not a Meta ID.</p></Section>
        <Section id="contacts" title="Read contacts"><Endpoint method="GET" path="/api/v1/whatsapp/accounts/{account_id}/contacts" /><p>Optional <code>search</code>, <code>limit</code> (default 50, max 100), and <code>cursor</code>. Search matches name or phone digits. Results include contact ID, name, phone, opt-in state, last message time, and account conversation count.</p><CodeBlock>{`curl "https://app.vaiket.com/api/v1/whatsapp/accounts/ACCOUNT_ID/contacts?search=415555&limit=50" \\
  -H "Authorization: Bearer YOUR_VAIKET_API_KEY"`}</CodeBlock></Section>
        <Section id="conversations" title="Read conversations"><Endpoint method="GET" path="/api/v1/whatsapp/accounts/{account_id}/conversations" /><p>Filter by <code>status</code>, <code>search</code>, <code>date_from</code>, <code>date_to</code>, <code>limit</code>, and <code>cursor</code>. Results include unread count, contact summary, and latest message preview.</p><CodeBlock language="json">{`{
  "success": true,
  "conversations": [{ "id": "CONVERSATION_ID", "status": "open", "unreadCount": 1,
    "contact": { "id": "CONTACT_ID", "name": "CUSTOMER_NAME", "phone": "PHONE_DIGITS" },
    "latest_message": { "text": "MESSAGE_TEXT", "direction": "inbound" } }],
  "next_cursor": null
}`}</CodeBlock></Section>
        <Section id="messages" title="Read message history"><Endpoint method="GET" path="/api/v1/whatsapp/conversations/{conversation_id}/messages" /><p>Returns inbound and outbound messages chronologically with direction, type, text, status, timestamps, and safe media URLs only for the platform-managed uploads path.</p></Section>
        <Section id="analytics" title="Account analytics"><Endpoint method="GET" path="/api/v1/whatsapp/accounts/{account_id}/analytics" /><p>Use paired <code>date_from</code> and <code>date_to</code> filters. Analytics includes conversation totals, current open/unread state, inbound/outbound message totals, and sent, delivered, read, or failed status counts.</p></Section>
        <Section id="templates" title="Templates"><Endpoint method="GET" path="/api/v1/whatsapp/accounts/{account_id}/templates" /><p>Templates are tenant- and account-scoped. Use an approved template with its exact name and language.</p></Section>
        <Section id="send-template" title="Send template"><Endpoint method="POST" path="/api/v1/whatsapp/messages" /><p>Send <code>whatsapp_account_id</code>, <code>to</code>, and template name/language with matching body, header, and button parameter arrays. Include an <code>Idempotency-Key</code> for safe retries.</p></Section>
        <Section id="idempotency" title="Idempotency"><p>Use a stable <code>Idempotency-Key</code>. Reusing the same key and payload replays the logical request; an active request returns <code>request_in_flight</code>.</p></Section>
        <Section id="errors" title="Errors and pagination"><p>Responses include <code>request_id</code>. Errors use a sanitized code and message. Paginated reads default to 50 and accept 1–100. Pass <code>next_cursor</code> unchanged until it is null. Invalid cursors or missing IDs return a 400 or 404, and rate limits return 429 with <code>Retry-After</code>.</p><CodeBlock language="json">{`{ "success": false, "error": { "code": "invalid_query", "message": "Query parameters are invalid.", "request_id": "req_PLACEHOLDER" } }`}</CodeBlock></Section>
        <Section id="lifecycle" title="Message lifecycle"><p><code>sent</code> confirms provider acceptance, not delivery. Later processing may record <code>delivered</code>, <code>read</code>, or <code>failed</code>.</p></Section>
        <Section id="webhooks" title="Webhooks"><p>The existing Meta webhook processes inbound messages and delivery status events internally. A customer-configurable external WhatsApp status webhook is not exposed by this API.</p></Section>
        <Section id="ai-walkthrough" title="Vaiket AI integration walkthrough"><p>Use a server-side secret for the API key. Discover the tenant account, page through contacts and conversations, retrieve message history, then query analytics.</p><CodeBlock language="javascript">{`const base = "https://app.vaiket.com/api/v1/whatsapp";
const headers = { Authorization: \`Bearer \${process.env.VAIKET_API_KEY}\` };
const { accounts } = await fetch(\`${'${base}'}/accounts\`, { headers }).then(r => r.json());
const accountId = accounts[0].id;
const chats = await fetch(\`${'${base}'}/accounts/\${accountId}/conversations?limit=50\`, { headers }).then(r => r.json());`}</CodeBlock></Section>
        <Section id="crm-api" title="CRM API"><p>This segment is separate from WhatsApp. Use the CRM base URL <code>https://api.vaiket.com/v1</code> for lead and form integrations.</p></Section>
        <Section id="create-leads" title="Create CRM leads"><Endpoint method="POST" path="/v1/crm/leads/create" /><p>Create a lead from your website, application, or advertising workflow using the Vaiket Bearer API key.</p><CodeBlock>{`curl -X POST "https://api.vaiket.com/v1/crm/leads/create" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"name":"CUSTOMER_NAME","phone":"RECIPIENT_PHONE","email":"CUSTOMER_EMAIL","source":"website"}'`}</CodeBlock></Section>
        <Section id="web-forms" title="Web form submissions"><Endpoint method="POST" path="/v1/forms/submit" /><p>Submit a configured form using its form ID. The endpoint accepts a public form payload with server-side validation and rate limiting.</p></Section>
        <Section id="api-reference" title="API reference"><p>WhatsApp endpoints include accounts, contacts, conversations, analytics, message history, account templates, and template sending. CRM endpoints include lead creation and form submission.</p></Section>
        <div className="security-callout" id="security-note"><strong>Security note</strong><p>Never put API keys or Meta credentials in client applications. Keep credentials in server-side environment variables or your secret manager.</p></div>
      </article>
    </div>
  </main>
}
