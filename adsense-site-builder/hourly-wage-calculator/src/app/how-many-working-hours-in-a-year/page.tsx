import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How Many Working Hours in a Year? (2024 & 2025)',
  description:
    'Exact working hours per year for every schedule — 32h, 37.5h, 40h, 45h, and 50h weeks. Includes 2025 US federal holiday count and PTO adjustment tables.',
  alternates: { canonical: '/how-many-working-hours-in-a-year' },
}

const schedules = [
  { label: '32h / week', hpw: 32, noTimeOff: 32 * 52, withPto2: 32 * 50, withPtoHol: 32 * 50 - 11 * (32/5) },
  { label: '37.5h / week', hpw: 37.5, noTimeOff: 37.5 * 52, withPto2: 37.5 * 50, withPtoHol: 37.5 * 50 - 11 * (37.5/5) },
  { label: '40h / week (standard)', hpw: 40, noTimeOff: 40 * 52, withPto2: 40 * 50, withPtoHol: 40 * 50 - 11 * 8 },
  { label: '45h / week', hpw: 45, noTimeOff: 45 * 52, withPto2: 45 * 50, withPtoHol: 45 * 50 - 11 * (45/5) },
  { label: '50h / week', hpw: 50, noTimeOff: 50 * 52, withPto2: 50 * 50, withPtoHol: 50 * 50 - 11 * (50/5) },
]

const holidays2025 = [
  { name: "New Year's Day", date: 'Jan 1' },
  { name: "Martin Luther King Jr. Day", date: 'Jan 20' },
  { name: "Presidents' Day", date: 'Feb 17' },
  { name: "Memorial Day", date: 'May 26' },
  { name: "Juneteenth", date: 'Jun 19' },
  { name: "Independence Day", date: 'Jul 4' },
  { name: "Labor Day", date: 'Sep 1' },
  { name: "Columbus Day", date: 'Oct 13' },
  { name: "Veterans Day", date: 'Nov 11' },
  { name: "Thanksgiving Day", date: 'Nov 27' },
  { name: "Christmas Day", date: 'Dec 25' },
]

export default function WorkingHoursPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span className="mx-2">/</span>
        <span>Working Hours in a Year</span>
      </nav>

      <h1 className="section-title mb-4">How Many Working Hours in a Year?</h1>
      <p className="text-lg text-gray-600 mb-2">
        The standard answer is <strong>2,080 hours</strong> (52 weeks × 40 hours). But that assumes zero paid time off and zero holidays. Here are the real numbers for every common schedule.
      </p>
      <p className="text-sm text-gray-500 mb-8">Updated for 2025. Applies to US employees on a standard Mon–Fri work week.</p>

      {/* Quick answer */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: 'No time off', value: '2,080', sub: '40h/week × 52' },
          { label: '2 weeks PTO', value: '2,000', sub: '40h/week × 50' },
          { label: '+ 11 holidays', value: '1,912', sub: 'Most common US scenario' },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-brand-600">{item.value}</div>
            <div className="text-xs font-semibold text-gray-700 mt-1">{item.label}</div>
            <div className="text-xs text-gray-400 mt-0.5">{item.sub}</div>
          </div>
        ))}
      </div>

      {/* Schedule table */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">Working Hours by Schedule</h2>
      <div className="overflow-x-auto rounded-lg border border-gray-200 mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Schedule</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">No PTO</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">2 wks PTO</th>
              <th className="px-4 py-3 text-right font-semibold text-brand-700">2 wks PTO + 11 holidays</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {schedules.map((s) => (
              <tr key={s.label} className={s.hpw === 40 ? 'bg-brand-50' : 'hover:bg-gray-50'}>
                <td className="px-4 py-3 font-medium text-gray-700">{s.label}</td>
                <td className="px-4 py-3 text-right text-gray-600">{Math.round(s.noTimeOff).toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-gray-600">{Math.round(s.withPto2).toLocaleString()}</td>
                <td className="px-4 py-3 text-right font-semibold text-brand-700">{Math.round(s.withPtoHol).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 2025 holidays */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">2025 US Federal Holidays</h2>
      <p className="text-sm text-gray-600 mb-4">
        There are <strong>11 federal holidays</strong> in 2025. Private employers are not required to observe them, but many do. Check your employment agreement.
      </p>
      <div className="overflow-x-auto rounded-lg border border-gray-200 mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Holiday</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">2025 Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {holidays2025.map((h) => (
              <tr key={h.name} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-600">{h.name}</td>
                <td className="px-4 py-3 text-right text-gray-600">{h.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Why it matters */}
      <div className="card mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Why This Matters for Salary Conversion</h2>
        <p className="text-sm text-gray-600 mb-2">
          Dividing a $60,000 salary by different working-hour counts gives meaningfully different hourly rates:
        </p>
        <ul className="space-y-1 text-sm text-gray-600">
          <li>• $60,000 ÷ 2,080 hours = <strong>$28.85/hr</strong> (no time off)</li>
          <li>• $60,000 ÷ 2,000 hours = <strong>$30.00/hr</strong> (2 weeks PTO)</li>
          <li>• $60,000 ÷ 1,912 hours = <strong>$31.38/hr</strong> (2 weeks PTO + 11 holidays)</li>
        </ul>
        <p className="mt-3 text-sm text-gray-500">
          A 9% difference in your effective hourly rate — which is why using the right number of hours matters.
        </p>
      </div>

      <div className="rounded-xl bg-brand-50 p-6 text-center border border-brand-100">
        <p className="text-gray-700 mb-3 font-medium">Calculate your exact hourly rate with your schedule.</p>
        <Link href="/" className="btn-primary">Open the Calculator</Link>
      </div>

      <div className="mt-10 pt-8 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Related</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { href: '/how-to-convert-salary-to-hourly', label: 'How to Convert Salary to Hourly' },
            { href: '/hourly-vs-salary', label: 'Hourly vs Salary' },
            { href: '/part-time-vs-full-time-salary', label: 'Part-Time vs Full-Time Pay' },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-brand-600 hover:underline">{l.label} →</Link>
          ))}
        </div>
      </div>
    </div>
  )
}
