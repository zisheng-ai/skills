import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Convert Salary to Hourly Rate',
  description:
    'Step-by-step formula for converting annual salary to hourly rate. Includes worked examples for 40h, 37.5h, and part-time schedules, plus common mistakes to avoid.',
  alternates: { canonical: '/how-to-convert-salary-to-hourly' },
}

const examples = [
  {
    label: 'Standard full-time (40h/week, 2 weeks PTO)',
    salary: 60000,
    hpw: 40,
    ptoWeeks: 2,
    holidays: 11,
    workingHours: 40 * (52 - 2) - 11 * 8,
  },
  {
    label: '37.5h/week schedule (no PTO counted)',
    salary: 55000,
    hpw: 37.5,
    ptoWeeks: 0,
    holidays: 0,
    workingHours: 37.5 * 52,
  },
  {
    label: 'Part-time (20h/week, year-round)',
    salary: 25000,
    hpw: 20,
    ptoWeeks: 0,
    holidays: 0,
    workingHours: 20 * 52,
  },
]

export default function HowToConvertPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span className="mx-2">/</span>
        <span>How to Convert Salary to Hourly</span>
      </nav>

      <h1 className="section-title mb-4">How to Convert Annual Salary to Hourly Rate</h1>
      <p className="text-lg text-gray-600 mb-8">
        The conversion is simple — but only if you use the right number of hours. Here is the exact formula, three worked examples, and the most common mistake people make.
      </p>

      {/* Formula */}
      <div className="card mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-3">The Formula</h2>
        <div className="rounded-lg bg-gray-900 px-6 py-4 font-mono text-sm text-green-400 mb-4">
          <p>hourly rate = annual salary ÷ hours worked per year</p>
          <p className="mt-2 text-gray-400">hours per year = (hours/week × working weeks) − paid holidays × (hours/week ÷ 5)</p>
          <p className="mt-2 text-gray-400">working weeks = 52 − PTO weeks</p>
        </div>
        <p className="text-sm text-gray-600">
          The key variable is <strong>hours worked per year</strong>, not a fixed 2,080. Your actual hours depend on your schedule, paid time off, and holidays.
        </p>
      </div>

      {/* Worked examples */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">Worked Examples</h2>
      <div className="space-y-6 mb-8">
        {examples.map((ex) => {
          const hourly = ex.salary / ex.workingHours
          return (
            <div key={ex.label} className="rounded-lg border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-3">{ex.label}</h3>
              <div className="grid gap-2 text-sm sm:grid-cols-2">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Annual Salary</span>
                  <span className="font-medium">${ex.salary.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Hours Per Week</span>
                  <span className="font-medium">{ex.hpw}h</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Working Hours/Year</span>
                  <span className="font-medium">{Math.round(ex.workingHours).toLocaleString()}h</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100 bg-brand-50 px-2 rounded">
                  <span className="text-brand-700 font-medium">Hourly Rate</span>
                  <span className="font-bold text-brand-700">${hourly.toFixed(2)}/hr</span>
                </div>
              </div>
              <p className="mt-3 text-xs text-gray-500">
                ${ex.salary.toLocaleString()} ÷ {Math.round(ex.workingHours)} hours = <strong>${hourly.toFixed(2)}/hr</strong>
              </p>
            </div>
          )
        })}
      </div>

      {/* Why 2,080 is wrong */}
      <div className="card bg-amber-50 border-amber-200 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Why "Divide by 2,080" Is Often Wrong</h2>
        <p className="text-sm text-gray-700 mb-3">
          The 2,080 figure (52 weeks × 40 hours) assumes <em>zero</em> paid time off and zero paid holidays. In practice, US employees average 10 days PTO plus 11 federal holidays, bringing actual working hours closer to <strong>1,904 hours per year</strong>.
        </p>
        <p className="text-sm text-gray-700">
          Using 2,080 instead of 1,904 understates your effective hourly rate by about 9%. A $60,000 salary works out to <strong>$28.85/hr</strong> at 2,080 hours — but <strong>$31.51/hr</strong> at 1,904 hours.
        </p>
      </div>

      {/* Common mistakes */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">Common Mistakes</h2>
      <ul className="space-y-3 mb-8">
        {[
          { title: 'Using 2,080 hours for everyone', fix: 'Adjust for your actual PTO and holiday schedule.' },
          { title: 'Ignoring overtime', fix: 'If you regularly work over 40h, your effective hourly rate is lower than the formula suggests unless you receive overtime pay.' },
          { title: 'Comparing gross rates across countries', fix: 'US salary-to-hourly conversion gives gross pay. Countries with mandatory benefits included in salary (like France) are not directly comparable.' },
          { title: 'Forgetting that salary vs. hourly have different overtime rules', fix: 'Salaried exempt employees typically do not receive overtime regardless of hours worked.' },
        ].map((m) => (
          <li key={m.title} className="flex gap-3 rounded-lg border border-gray-200 p-4">
            <span className="shrink-0 text-red-500 font-bold">✗</span>
            <div>
              <span className="font-medium text-gray-900">{m.title}: </span>
              <span className="text-sm text-gray-600">{m.fix}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="rounded-xl bg-brand-50 p-6 text-center border border-brand-100">
        <p className="text-gray-700 mb-3 font-medium">Ready to calculate your rate with your exact schedule?</p>
        <Link href="/" className="btn-primary">Open the Calculator</Link>
      </div>

      {/* Related */}
      <div className="mt-10 pt-8 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Related</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { href: '/how-many-working-hours-in-a-year', label: 'How Many Working Hours in a Year' },
            { href: '/hourly-vs-salary', label: 'Hourly vs Salary: Which Is Better?' },
            { href: '/how-to-calculate-true-hourly-rate', label: 'True Hourly Rate with Benefits' },
            { href: '/overtime-pay-calculator', label: 'Overtime Pay Calculator' },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-brand-600 hover:underline">
              {l.label} →
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
