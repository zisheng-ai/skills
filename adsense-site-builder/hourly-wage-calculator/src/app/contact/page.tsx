import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact HourlyCalc',
  description: 'Send feedback, report a bug, or suggest a new feature for HourlyCalc.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="section-title mb-4">Contact</h1>
      <p className="text-gray-600 mb-8">
        Use this form to send feedback, report a calculation error, or suggest a new feature.
        We read every message and try to respond within a few business days.
      </p>

      {/* Static form — requires a form endpoint (Formspree, Netlify Forms, etc.) to work */}
      <form
        action="https://formspree.io/f/YOUR_FORM_ID"
        method="POST"
        className="space-y-5"
      >
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="input-field"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="input-field"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="subject" className="mb-1 block text-sm font-medium text-gray-700">Subject</label>
          <select id="subject" name="subject" className="input-field">
            <option value="feedback">General feedback</option>
            <option value="bug">Calculation error or bug</option>
            <option value="feature">Feature request</option>
            <option value="data">Data correction</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">Message</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="input-field resize-y"
            placeholder="Describe your question or feedback..."
          />
        </div>

        <button type="submit" className="btn-primary w-full">
          Send Message
        </button>
      </form>

      <p className="mt-6 text-xs text-gray-400">
        {/* Replace YOUR_FORM_ID with a real Formspree or equivalent endpoint before deploying */}
        We do not sell or share your email address. See our{' '}
        <a href="/privacy-policy" className="underline">privacy policy</a>.
      </p>
    </div>
  )
}
