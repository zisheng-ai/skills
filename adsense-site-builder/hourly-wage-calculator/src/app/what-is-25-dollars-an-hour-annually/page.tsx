import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '$25 an Hour Is How Much a Year? (2025 Breakdown)',
  description:
    '$25 an hour equals $52,000 per year at 40 hours per week. See the full breakdown, part-time comparison, and how $25/hr stacks up against median US wages.',
  alternates: { canonical: '/what-is-25-dollars-an-hour-annually' },
}

const rate = 25
const annual40 = rate * 40 * 52
const annual50w = rate * 40 * 50
const monthly = annual40 / 12
const biweekly = rate * 80
const weekly = rate * 40
const daily = rate * 8
const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })

export default function TwentyFiveDollarsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span className="mx-2">/</span>
        <span>$25 an Hour Is How Much a Year</span>
      </nav>

      <h1 className="section-title mb-2">$25 an Hour Is How Much a Year?</h1>
      <p className="text-lg text-gray-600 mb-8">
        At 40 hours per week for 52 weeks, <strong>$25/hr equals $52,000 per year</strong> in gross pay —
        very close to the US median individual income. With 2 weeks PTO the annual total is $50,000.
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 mb-10">
        {[
          { label: 'Annual (no PTO)', value: fmt(annual40) },
          { label: 'Annual (2 wks PTO)', value: fmt(annual50w) },
          { label: 'Monthly', value: fmt(monthly) },
          { label: 'Biweekly', value: fmt(biweekly) },
          { label: 'Weekly', value: fmt(weekly) },
          { label: 'Daily (8h)', value: fmt(daily) },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-xl font-bold text-brand-600">{item.value}</div>
            <div className="text-xs text-gray-500 mt-1">{item.label}</div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-4">Full Pay Period Breakdown</h2>
      <div className="overflow-x-auto rounded-lg border border-gray-200 mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Pay Period</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">Gross Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { period: 'Annual (40h × 52 weeks)', value: annual40 },
              { period: 'Annual (2 weeks PTO)', value: annual50w },
              { period: 'Monthly', value: monthly },
              { period: 'Semi-Monthly', value: annual40 / 24 },
              { period: 'Biweekly', value: biweekly },
              { period: 'Weekly', value: weekly },
              { period: 'Daily (8h)', value: daily },
            ].map((row) => (
              <tr key={row.period} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-700">{row.period}</td>
                <td className="px-4 py-3 text-right font-semibold text-gray-900">{fmt(row.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card bg-blue-50 border-blue-200 mb-8">
        <h2 className="font-bold text-blue-900 mb-2">Is $25/hr a Good Wage?</h2>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• <strong>Vs federal minimum:</strong> $25/hr is 3.4× the $7.25 federal minimum wage.</li>
          <li>• <strong>Vs US median:</strong> The median US hourly wage is ~$23–$24/hr (BLS, 2024). $25/hr is slightly above the national median.</li>
          <li>• <strong>Living wage:</strong> In most mid-size US cities $25/hr covers a comfortable single-person budget. In San Francisco, NYC, or Seattle it may be tight.</li>
          <li>• <strong>Equivalent salaried job:</strong> A $52,000 salary with full benefits (health, 401k match, PTO) is worth roughly $65,000+ in total compensation.</li>
        </ul>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-4">Part-Time vs Full-Time at $25/hr</h2>
      <div className="overflow-x-auto rounded-lg border border-gray-200 mb-8">
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
            {[20, 24, 30, 32, 40].map((h) => (
              <tr key={h} className={h === 40 ? 'bg-brand-50 font-semibold' : 'hover:bg-gray-50'}>
                <td className="px-4 py-3 text-gray-700">{h}h / week{h === 40 ? ' (full-time)' : ''}</td>
                <td className="px-4 py-3 text-right text-gray-900">{fmt(rate * h * 52)}</td>
                <td className="px-4 py-3 text-right text-gray-600">{fmt(rate * h * 52 / 12)}</td>
                <td className="px-4 py-3 text-right text-gray-600">{fmt(rate * h)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl bg-brand-50 p-6 text-center border border-brand-100">
        <p className="text-gray-700 mb-3 font-medium">Need a custom schedule? Adjust hours, PTO, and holidays.</p>
        <Link href="/" className="btn-primary">Open the Calculator</Link>
      </div>

      <div className="mt-10 pt-8 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Related</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { href: '/what-is-15-dollars-an-hour-annually', label: '$15 an Hour Is How Much a Year' },
            { href: '/what-is-20-dollars-an-hour-annually', label: '$20 an Hour Is How Much a Year' },
            { href: '/average-hourly-wages-by-industry', label: 'Average Wages by Industry' },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-brand-600 hover:underline">{l.label} →</Link>
          ))}
        </div>
      </div>
    </div>
  )
}
