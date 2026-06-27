import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use | HourlyCalc',
  description: 'HourlyCalc terms of use — how you may use this site and its calculators.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="section-title mb-2">Terms of Use</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: January 2025</p>

      <div className="prose-custom space-y-6 text-sm">
        <p>
          By using HourlyCalc, you agree to these terms. If you do not agree, do not use this site.
        </p>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">1. Informational Use Only</h2>
          <p>
            All calculators, tables, and guides on HourlyCalc are for <strong>informational and estimation purposes only</strong>. They do not constitute financial, tax, legal, or employment advice. Results are estimates based on the inputs you provide and general assumptions.
          </p>
          <p className="mt-2">
            Always verify calculations with your employer, HR department, payroll provider, or a licensed professional before making financial or employment decisions.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">2. No Warranty</h2>
          <p>
            This site is provided &quot;as is&quot; without warranty of any kind. We make no guarantees that the calculations are accurate, complete, or current. Laws, minimum wages, and tax rates change — data on this site may not reflect the latest updates.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">3. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, HourlyCalc and its operators are not liable for any direct, indirect, incidental, or consequential damages arising from your use of this site or reliance on its outputs.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">4. Acceptable Use</h2>
          <p>You may use this site for personal, educational, or business reference purposes. You may not:</p>
          <ul className="mt-2 space-y-1 list-disc pl-5">
            <li>Scrape or systematically copy site content for republication</li>
            <li>Use automated tools to overload or attack our servers</li>
            <li>Reproduce calculation tools or content as your own without attribution</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">5. Third-Party Content</h2>
          <p>
            Links to external sources (BLS, DOL, etc.) are provided for reference only. We are not responsible for the accuracy or availability of third-party content.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">6. Changes</h2>
          <p>
            We may update these terms at any time. Continued use of the site after changes are posted constitutes acceptance.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-2">7. Contact</h2>
          <p>
            Questions? Use the <a href="/contact" className="text-brand-600 hover:underline">contact form</a>.
          </p>
        </section>
      </div>
    </div>
  )
}
