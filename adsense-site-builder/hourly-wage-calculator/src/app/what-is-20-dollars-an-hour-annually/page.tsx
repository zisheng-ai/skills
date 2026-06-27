import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '$20 an Hour Is How Much a Year? (2025 Breakdown)',
  description:
    '$20 an hour equals $41,600 per year working 40h/week. See the full breakdown by pay period, part-time comparison, and how $20/hr stacks up against US median wages.',
  alternates: { canonical: '/what-is-20-dollars-an-hour-annually' },
}

const rate = 20
const annual40 = rate * 40 * 52   // 41600
const annual50w = rate * 40 * 50  // 40000
const monthly = annual40 / 12
const semiMonthly = annual40 / 24
const biweekly = rate * 80        // 1600
const weekly = rate * 40          // 800
const daily = rate * 8            // 160

const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })

const partTimeRows = [
  { hours: 20, label: '20h / week', annual: rate * 20 * 52 },
  { hours: 24, label: '24h / week', annual: rate * 24 * 52 },
  { hours: 30, label: '30h / week', annual: rate * 30 * 52 },
  { hours: 32, label: '32h / week', annual: rate * 32 * 52 },
  { hours: 40, label: '40h / week (full-time)', annual: annual40 },
]

export default function TwentyDollarsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span className="mx-2">/</span>
        <span>$20 an Hour Is How Much a Year</span>
      </nav>

      <h1 className="section-title mb-2">$20 an Hour Is How Much a Year?</h1>
      <p className="text-lg text-gray-600 mb-8">
        Working full-time (40 hours per week, 52 weeks), <strong>$20/hr equals $41,600 per year</strong> in gross pay.
        With 2 weeks PTO, annual earnings drop slightly to $40,000.
      </p>

      {/* Hero numbers */}
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

      {/* Full breakdown table */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">Full Pay Period Breakdown</h2>
      <div className="overflow-x-auto rounded-lg border border-gray-200 mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Pay Period</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">Gross Amount</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-500 text-xs">Calculation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { period: 'Annual (40h × 52 weeks)', value: annual40, calc: `$${rate} × 2,080h` },
              { period: 'Annual (40h × 50 weeks, 2 wks PTO)', value: annual50w, calc: `$${rate} × 2,000h` },
              { period: 'Monthly', value: monthly, calc: `÷ 12` },
              { period: 'Semi-Monthly (2× per month)', value: semiMonthly, calc: `÷ 24` },
              { period: 'Biweekly (every 2 weeks)', value: biweekly, calc: `$${rate} × 80h` },
              { period: 'Weekly', value: weekly, calc: `$${rate} × 40h` },
              { period: 'Daily (8-hour day)', value: daily, calc: `$${rate} × 8h` },
            ].map((row) => (
              <tr key={row.period} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-700">{row.period}</td>
                <td className="px-4 py-3 text-right font-semibold text-gray-900">{fmt(row.value)}</td>
                <td className="px-4 py-3 text-right text-xs text-gray-400">{row.calc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Context */}
      <div className="card bg-blue-50 border-blue-200 mb-8">
        <h2 className="font-bold text-blue-900 mb-2">How $20/hr Compares</h2>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• <strong>Federal minimum wage:</strong> $7.25/hr — $20/hr is 2.76× the federal minimum.</li>
          <li>• <strong>US median individual income (2023):</strong> ~$23.40/hr — $20/hr is slightly below the national median.</li>
          <li>• <strong>MIT Living Wage (single adult, US avg):</strong> ~$22–$26/hr depending on location — $20/hr may be tight in high cost-of-living cities.</li>
        </ul>
      </div>

      {/* Part-time table */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">Part-Time vs Full-Time at $20/hr</h2>
      <div className="overflow-x-auto rounded-lg border border-gray-200 mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Hours / Week</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">Annual Salary</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">Monthly</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">Weekly</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {partTimeRows.map((row) => (
              <tr key={row.hours} className={row.hours === 40 ? 'bg-brand-50 font-semibold' : 'hover:bg-gray-50'}>
                <td className="px-4 py-3 text-gray-700">{row.label}</td>
                <td className="px-4 py-3 text-right text-gray-900">{fmt(row.annual)}</td>
                <td className="px-4 py-3 text-right text-gray-600">{fmt(row.annual / 12)}</td>
                <td className="px-4 py-3 text-right text-gray-600">{fmt(rate * row.hours)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl bg-brand-50 p-6 text-center border border-brand-100">
        <p className="text-gray-700 mb-3 font-medium">Need a custom calculation? Adjust PTO, hours, and holidays.</p>
        <Link href="/" className="btn-primary">Open the Calculator</Link>
      </div>

      <div className="mt-10 pt-8 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Related</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { href: '/what-is-15-dollars-an-hour-annually', label: '$15 an Hour Is How Much a Year' },
            { href: '/what-is-25-dollars-an-hour-annually', label: '$25 an Hour Is How Much a Year' },
            { href: '/minimum-wage-to-annual-salary', label: 'Minimum Wage by State' },
            { href: '/part-time-vs-full-time-salary', label: 'Part-Time vs Full-Time Pay' },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-brand-600 hover:underline">{l.label} →</Link>
          ))}
        </div>
      </div>
    </div>
  )
}
