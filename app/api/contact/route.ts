import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

// From address — update to a verified domain once set up in Resend dashboard
const FROM = 'Portfolio Contact <onboarding@resend.dev>'
const TO   = 'enricsneelamkavil@gmail.com'

export async function POST(req: Request) {
  console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY)
  const body = await req.json()
  const { name, email, company, role, budget, when, brief, services } = body

  if (!name || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const html = buildHtml({ name, email, company, role, budget, when, brief, services })

  try {
    await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Enquiry from ${name}`,
      html,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] resend error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}

// ─── Email template ──────────────────────────────────────────────────────────

interface Fields {
  name: string
  email: string
  company?: string
  role?: string
  budget?: string
  when?: string
  brief?: string
  services?: string[]
}

function buildHtml(f: Fields) {
  const row = (label: string, value?: string) =>
    value
      ? `<tr>
           <td style="padding:8px 12px;font-weight:600;color:#5c5c5c;white-space:nowrap;vertical-align:top">${label}</td>
           <td style="padding:8px 12px;color:#171717">${value}</td>
         </tr>`
      : ''

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#f7f7f7;font-family:sans-serif">
  <div style="max-width:560px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e0e0e0">
    <div style="background:#171717;padding:24px 32px">
      <p style="margin:0;color:#a3a3a3;font-size:11px;letter-spacing:0.08em;text-transform:uppercase">New Enquiry</p>
      <h1 style="margin:4px 0 0;color:#fff;font-size:24px;font-weight:400">${f.name}</h1>
    </div>
    <div style="padding:24px 32px">
      <table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.6">
        ${row('Email', `<a href="mailto:${f.email}" style="color:#e8342a">${f.email}</a>`)}
        ${row('Company', f.company)}
        ${row('Role', f.role)}
        ${row('Budget', f.budget)}
        ${row('When', f.when)}
        ${f.services?.length ? row('Services', f.services.join(', ')) : ''}
      </table>
      ${f.brief ? `
      <div style="margin-top:24px;border-top:1px solid #e0e0e0;padding-top:20px">
        <p style="margin:0 0 8px;font-size:11px;font-weight:600;color:#5c5c5c;text-transform:uppercase;letter-spacing:0.08em">Brief</p>
        <p style="margin:0;font-size:14px;line-height:1.7;color:#171717;white-space:pre-line">${f.brief}</p>
      </div>` : ''}
    </div>
    <div style="padding:12px 32px;background:#f7f7f7;border-top:1px solid #e0e0e0">
      <p style="margin:0;font-size:11px;color:#a3a3a3">Sent from your portfolio contact form · Reply goes to ${f.email}</p>
    </div>
  </div>
</body>
</html>`
}
