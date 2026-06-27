import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Part-Time vs Full-Time Salary Comparison',
  description:
    'Side-by-side income comparison for 20h, 24h, 30h, 32h, and 40h work weeks at common hourly rates. Includes benefits impact and ACA full-time threshold notes.',
  alternates: { canonical: '/part-time-vs-full-time-salary' },
}

const rates = [15, 18, 20, 25, 30]
const hours = [20, 24, 30, 32, 40]
const fmt = (n: number) => '$' + Math.round(n).toLocaleString()

export default function PartTimeVsFullTimePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span className="mx-2">/</span>
        <span>Part-Time vs Full-Time Salary</span>
      </nav>

      <h1 className="section-title mb-4">Part-Time vs Full-Time Salary Comparison</h1>
      <p className="text-lg text-gray-600 mb-8">
        Annual income at common hourly rates across different weekly schedules. All figures are gross (before tax) and assume 52 weeks of work per year.
      </p>

      {/* Table */}
      {rates.map((rate) => (
        <div key={rate} className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">${rate}/hr — Annual Income by Schedule</h2>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Hours / Week</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">Annual</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">Monthly</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">Weekly</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {hours.map((h) => (
                  <tr key={h} className={h === 40 ? 'bg-brand-50 font-semibold' : 'hover:bg-gray-50'}>
                    <td className="px-4 py-2.5 text-gray-700">
                      {h}h{h === 40 ? ' (full-time)' : h === 30 ? ' (ACA threshold)' : ''}
                    </td>
                    <td className="px-4 py-2.5 text-right text-gray-900">{fmt(rate * h * 52)}</td>
                    <td className="px-4 py-2.5 text-right text-gray-600">{fmt(rate * h * 52 / 12)}</td>
                    <td className="px-4 py-2.5 text-right text-gray-600">{fmt(rate * h)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* ACA note */}
      <div className="card bg-amber-50 border-amber-200 mb-8">
        <h2 className="font-bold text-amber-900 mb-2">ACA Full-Time Threshold: 30 Hours/Week</h2>
        <p className="text-sm text-amber-800">
          Under the Affordable Care Act (ACA), employers with 50+ full-time equivalent employees must offer health coverage to employees working <strong>30+ hours per week</strong> (or 130+ hours/month). Working below 30h/week may affect your benefits eligibility — check with your employer.
        </p>
      </div>

      <div className="card bg-blue-50 border-blue-200 mb-8">
        <h2 className="font-bold text-blue-900 mb-2">Income Isn&apos;t the Whole Story</h2>
        <ul className="space-y-1 text-sm text-blue-800">
          <li>• Part-time workers often receive fewer or no employer benefits (health insurance, 401k, PTO).</li>
          <li>• Full-time salaried employees may actually work more than 40h/week without overtime pay.</li>
          <li>• A 32-hour week at $25/hr ($41,600/yr) can equal or exceed a 40h week at $20/hr ($41,600/yr) in gross pay.</li>
        </ul>
      </div>

      <div className="rounded-xl bg-brand-50 p-6 text-center border border-brand-100">
        <p className="text-gray-700 mb-3 font-medium">Calculate your exact pay for any schedule.</p>
        <Link href="/" className="btn-primary">Open the Calculator</Link>
      </div>

      <div className="mt-10 pt-8 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Related</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { href: '/hourly-vs-salary', label: 'Hourly vs Salary' },
            { href: '/how-many-working-hours-in-a-year', label: 'Working Hours in a Year' },
            { href: '/minimum-wage-to-annual-salary', label: 'Minimum Wage by State' },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-brand-600 hover:underline">{l.label} →</Link>
          ))}
        </div>
      </div>
    </div>
  )
}
