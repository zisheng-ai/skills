import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Minimum Wage to Annual Salary by State (2025)',
  description:
    'Current minimum wage for all 50 US states converted to annual, monthly, and biweekly salary. Updated for 2025. Includes federal minimum wage comparison.',
  alternates: { canonical: '/minimum-wage-to-annual-salary' },
}

// State minimum wages as of 2025 (approximate; users should verify with state DOL)
const stateWages = [
  { state: 'Alabama', wage: 7.25, note: 'Federal rate' },
  { state: 'Alaska', wage: 11.91 },
  { state: 'Arizona', wage: 14.70 },
  { state: 'Arkansas', wage: 11.00 },
  { state: 'California', wage: 16.50 },
  { state: 'Colorado', wage: 14.81 },
  { state: 'Connecticut', wage: 16.35 },
  { state: 'Delaware', wage: 15.00 },
  { state: 'Florida', wage: 13.00 },
  { state: 'Georgia', wage: 7.25, note: 'Federal rate' },
  { state: 'Hawaii', wage: 14.00 },
  { state: 'Idaho', wage: 7.25, note: 'Federal rate' },
  { state: 'Illinois', wage: 15.00 },
  { state: 'Indiana', wage: 7.25, note: 'Federal rate' },
  { state: 'Iowa', wage: 7.25, note: 'Federal rate' },
  { state: 'Kansas', wage: 7.25, note: 'Federal rate' },
  { state: 'Kentucky', wage: 7.25, note: 'Federal rate' },
  { state: 'Louisiana', wage: 7.25, note: 'Federal rate' },
  { state: 'Maine', wage: 14.65 },
  { state: 'Maryland', wage: 15.00 },
  { state: 'Massachusetts', wage: 15.00 },
  { state: 'Michigan', wage: 10.56 },
  { state: 'Minnesota', wage: 10.85 },
  { state: 'Mississippi', wage: 7.25, note: 'Federal rate' },
  { state: 'Missouri', wage: 12.30 },
  { state: 'Montana', wage: 10.55 },
  { state: 'Nebraska', wage: 13.50 },
  { state: 'Nevada', wage: 12.00 },
  { state: 'New Hampshire', wage: 7.25, note: 'Federal rate' },
  { state: 'New Jersey', wage: 15.49 },
  { state: 'New Mexico', wage: 12.00 },
  { state: 'New York', wage: 16.50 },
  { state: 'North Carolina', wage: 7.25, note: 'Federal rate' },
  { state: 'North Dakota', wage: 7.25, note: 'Federal rate' },
  { state: 'Ohio', wage: 10.70 },
  { state: 'Oklahoma', wage: 7.25, note: 'Federal rate' },
  { state: 'Oregon', wage: 15.45 },
  { state: 'Pennsylvania', wage: 7.25, note: 'Federal rate' },
  { state: 'Rhode Island', wage: 15.00 },
  { state: 'South Carolina', wage: 7.25, note: 'Federal rate' },
  { state: 'South Dakota', wage: 11.50 },
  { state: 'Tennessee', wage: 7.25, note: 'Federal rate' },
  { state: 'Texas', wage: 7.25, note: 'Federal rate' },
  { state: 'Utah', wage: 7.25, note: 'Federal rate' },
  { state: 'Vermont', wage: 14.01 },
  { state: 'Virginia', wage: 12.41 },
  { state: 'Washington', wage: 16.66 },
  { state: 'West Virginia', wage: 8.75 },
  { state: 'Wisconsin', wage: 7.25, note: 'Federal rate' },
  { state: 'Wyoming', wage: 7.25, note: 'Federal rate' },
]

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })

export default function MinimumWagePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span className="mx-2">/</span>
        <span>Minimum Wage by State</span>
      </nav>

      <h1 className="section-title mb-4">Minimum Wage to Annual Salary by State (2025)</h1>
      <p className="text-lg text-gray-600 mb-2">
        Current minimum wages for all 50 US states, converted to annual, monthly, and biweekly salary equivalents at 40 hours per week.
      </p>
      <p className="text-xs text-gray-400 mb-8">
        Data reflects 2025 state rates. Some states adjust annually (indexed to inflation or scheduled increases). Always verify with your state Department of Labor.
      </p>

      {/* Federal note */}
      <div className="card bg-amber-50 border-amber-200 mb-8">
        <h2 className="font-bold text-amber-900 mb-1">Federal Minimum Wage: $7.25/hr</h2>
        <p className="text-sm text-amber-800">
          The federal minimum wage has been $7.25/hr since July 2009. Employers must pay the <em>higher</em> of the federal or state rate. 21 states still use the federal floor — shown with the "Federal rate" label below.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left font-semibold text-gray-700">State</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">Min Wage / hr</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">Annual</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">Monthly</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">Biweekly</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {stateWages.map((s) => (
              <tr key={s.state} className={s.wage === 7.25 ? 'bg-gray-50 text-gray-400' : 'hover:bg-gray-50'}>
                <td className="px-4 py-2.5 text-gray-700">
                  {s.state}
                  {s.note && <span className="ml-1.5 text-xs text-gray-400">({s.note})</span>}
                </td>
                <td className="px-4 py-2.5 text-right font-medium text-gray-900">{fmt(s.wage)}</td>
                <td className="px-4 py-2.5 text-right text-gray-600">{fmt(s.wage * 2080)}</td>
                <td className="px-4 py-2.5 text-right text-gray-600">{fmt(s.wage * 2080 / 12)}</td>
                <td className="px-4 py-2.5 text-right text-gray-600">{fmt(s.wage * 80)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400 mb-8">
        Annual = wage × 2,080 hours (40h/week × 52 weeks, no PTO). Use the calculator above for a schedule-adjusted figure.
      </p>

      <div className="rounded-xl bg-brand-50 p-6 text-center border border-brand-100">
        <p className="text-gray-700 mb-3 font-medium">Calculate your exact hourly rate or annual salary.</p>
        <Link href="/" className="btn-primary">Open the Calculator</Link>
      </div>

      <div className="mt-10 pt-8 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Related</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { href: '/what-is-15-dollars-an-hour-annually', label: '$15 an Hour Is How Much a Year' },
            { href: '/average-hourly-wages-by-industry', label: 'Average Wages by Industry' },
            { href: '/part-time-vs-full-time-salary', label: 'Part-Time vs Full-Time Pay' },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-brand-600 hover:underline">{l.label} →</Link>
          ))}
        </div>
      </div>
    </div>
  )
}
