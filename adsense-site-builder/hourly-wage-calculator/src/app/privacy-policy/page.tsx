import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | HourlyCalc',
  description: 'HourlyCalc privacy policy — what data we collect, how we use it, and your rights.',
  alternates: { canonical: '/privacy-policy' },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="section-title mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: January 2025</p>

      <div className="prose-custom space-y-6 text-sm">
        <p>
          HourlyCalc (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates this website. This policy explains what information we collect, how we use it, and your choices.
        </p>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">1. Information We Collect</h2>
          <p className="mb-2"><strong>Calculator inputs:</strong> All calculations run entirely in your browser. We do not send your salary, hourly rate, or schedule inputs to our servers.</p>
          <p className="mb-2"><strong>Analytics:</strong> We may use a privacy-first analytics tool (such as Plausible or Fathom) to understand aggregate page traffic. These tools do not use cookies and do not track individual users.</p>
          <p><strong>Contact form:</strong> If you submit the contact form, we collect your name, email address, and message to respond to your inquiry.</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">2. Cookies</h2>
          <p>
            HourlyCalc does not use cookies for tracking or advertising. If we add third-party tools (such as Google AdSense) that set cookies, we will update this policy and display a cookie notice where required by law.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">3. Advertising</h2>
          <p>
            This site may display ads served by Google AdSense or similar networks. These ad networks may use cookies or device identifiers to serve relevant ads based on your interests. You can opt out of interest-based advertising at <a href="https://optout.aboutads.info" className="text-brand-600 hover:underline" target="_blank" rel="noopener noreferrer">aboutads.info</a> or <a href="https://optout.networkadvertising.org" className="text-brand-600 hover:underline" target="_blank" rel="noopener noreferrer">networkadvertising.org</a>.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">4. Third-Party Links</h2>
          <p>
            This site links to external sources (BLS, Department of Labor, etc.) for reference. We are not responsible for the privacy practices of third-party websites.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">5. Data Retention</h2>
          <p>
            Contact form submissions are retained for up to 12 months to allow us to follow up on recurring issues, then deleted.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">6. Children&apos;s Privacy</h2>
          <p>
            This site is not directed at children under 13. We do not knowingly collect personal information from children.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">7. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. Continued use of the site after changes are posted means you accept the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">8. Contact</h2>
          <p>
            Questions about this policy? Use the <a href="/contact" className="text-brand-600 hover:underline">contact form</a>.
          </p>
        </section>
      </div>
    </div>
  )
}
