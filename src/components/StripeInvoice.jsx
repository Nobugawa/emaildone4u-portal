import { useState } from 'react'
import { supabase } from '../lib/supabase'

function formatSent(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}

export default function StripeInvoice({ order, onUpdated }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(null) // { amount_display, tier_label, client_email, description, ... }

  const runPreview = async () => {
    setBusy(true)
    setError('')
    const { data, error: err } = await supabase.functions.invoke('create-stripe-invoice', {
      body: { order_id: order.id },
    })
    setBusy(false)
    if (err) {
      setError('Could not load invoice preview — try again in a moment.')
      return
    }
    if (data?.error === 'stripe_not_configured') {
      setError("Stripe isn't set up yet — see SETUP_REQUIRED.txt.")
      return
    }
    if (data?.error) {
      setError(data.detail || 'Could not load invoice preview.')
      return
    }
    setPreview(data)
  }

  const confirmAndSend = async () => {
    setBusy(true)
    setError('')
    const { data, error: err } = await supabase.functions.invoke('create-stripe-invoice', {
      body: { order_id: order.id, confirm: true },
    })
    setBusy(false)
    if (err) {
      setError('Invoice creation failed — try again in a moment.')
      return
    }
    if (data?.error === 'stripe_not_configured') {
      setError("Stripe isn't set up yet — see SETUP_REQUIRED.txt.")
      return
    }
    if (data?.error) {
      setError(data.detail || 'Invoice creation failed.')
      return
    }
    setPreview(null)
    onUpdated({ stripe_invoice_url: data.invoice_url, invoice_sent_at: new Date().toISOString() })
  }

  return (
    <div className="card" style={{ padding: 16, marginBottom: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <strong style={{ fontSize: 14 }}>Stripe invoice</strong>
          {order.invoice_sent_at && (
            <div style={{ fontSize: 12, color: 'var(--slate-500)', marginTop: 2 }}>
              Sent {formatSent(order.invoice_sent_at)}
              {order.stripe_invoice_url && (
                <>
                  {' · '}
                  <a href={order.stripe_invoice_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)' }}>
                    View invoice
                  </a>
                </>
              )}
            </div>
          )}
        </div>

        {!preview && (
          <button
            className="btn btn-secondary btn-sm"
            onClick={runPreview}
            disabled={busy}
          >
            {busy ? 'Loading…' : order.invoice_sent_at ? 'Send another' : 'Preview invoice'}
          </button>
        )}
      </div>

      {/* Preview / confirm step: nothing is created in Stripe and nothing is
          emailed to the client until "Confirm & send" is clicked. This is
          what was missing before -- the old button created and sent an
          invoice in one click, with no chance to catch a wrong amount first. */}
      {preview && (
        <div
          style={{
            marginTop: 14,
            padding: 14,
            borderRadius: 'var(--radius)',
            border: '1px solid var(--slate-300)',
            background: 'var(--paper)',
          }}
        >
          <div style={{ fontSize: 13, marginBottom: 10 }}>
            <div style={{ marginBottom: 6 }}>
              <strong>{preview.amount_display}</strong> — {preview.description}
            </div>
            <div style={{ color: 'var(--slate-500)' }}>
              To: {preview.client_name ? `${preview.client_name} ` : ''}
              &lt;{preview.client_email}&gt; · Tier: {preview.tier_label}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-primary btn-sm" onClick={confirmAndSend} disabled={busy}>
              {busy ? 'Sending…' : 'Confirm & send'}
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => { setPreview(null); setError('') }}
              disabled={busy}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {error && <div className="auth-error" style={{ marginTop: 10 }}>{error}</div>}
    </div>
  )
}
