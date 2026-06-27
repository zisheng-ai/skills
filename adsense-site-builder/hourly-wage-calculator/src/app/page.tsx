import type { Metadata } from 'next'
import Link from 'next/link'
import WageCalculator from '@/components/WageCalculator'

export const metadata: Metadata = {
  title: 'Hourly Wage Calculator — Salary to Hourly Converter',
  description:
    'Convert annual salary to hourly rate (and back). Set custom hours per week, PTO weeks, and paid holidays for an accurate result. All pay periods shown instantly.',
  alternates: { canonical: '/' },
}

const faqs = [
  {
    q: 'How do I convert annual salary to an hourly rate?',
    a: 'Divide your annual salary by the total number of hours you work per year. For a 40-hour week with 50 working weeks, that is 2,000 hours. A $60,000 salary ÷ 2,000 hours = $30.00/hr.',
  },
  {
    q: 'How many hours are in a work year?',
    a: 'A standard 40-hour/week schedule with no time off gives 2,080 hours (52 × 40). With 2 weeks PTO and 11 federal holidays it drops to about 1,904 hours. Use the calculator to set your actual schedule.',
  },
  {
    q: 'Does this calculator include taxes?',
    a: 'No — all results are gross (pre-tax) pay. Your net take-home depends on your federal/state tax brackets, deductions, and benefit contributions.',
  },
  {
    q: 'What if I work part-time?',
    a: 'Enter your actual hours per week (e.g., 20 or 30) in the "Hours Per Week" field. The calculator adjusts all results automatically.',
  },
  {
    q: 'How does PTO affect the calculation?',
    a: 'PTO weeks are excluded from the working-hours count. If you have 2 weeks PTO, you work 50 weeks instead of 52, which slightly raises your effective hourly rate because you earn the same annual salary for fewer hours.',
  },
  {
    q: 'What is the difference between biweekly and semi-monthly pay?',
    a: 'Biweekly means you get paid every 2 weeks — 26 paychecks per year. Semi-monthly means twice a month — 24 paychecks per year. Biweekly paychecks are slightly smaller but you get 2 extra ones each year.',
  },
]

const quickLinks = [
  { href: '/what-is-15-dollars-an-hour-annually', label: '$15/hr annual salary' },
  { href: '/what-is-20-dollars-an-hour-annually', label: '$20/hr annual salary' },
  { href: '/what-is-25-dollars-an-hour-annually', label: '$25/hr annual salary' },
  { href: '/overtime-pay-calculator', label: 'Overtime pay calculator' },
  { href: '/freelance-rate-from-salary', label: 'Freelance rate calculator' },
  { href: '/minimum-wage-to-annual-salary', label: 'Minimum wage by state' },
]

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      {/* Hero */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
          Hourly Wage Calculator
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Convert annual salary to hourly rate — or hourly to salary — with custom hours per week,
          paid time off, and holidays. All pay periods calculated instantly.
        </p>
      </div>

      {/* Calculator */}
      <div className="mx-auto max-w-2xl">
        <WageCalculator />
      </div>

      {/* Quick links */}
      <div className="mx-auto mt-12 max-w-2xl">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">Common Calculations</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {quickLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="mx-auto mt-14 max-w-2xl">
        <h2 className="section-title mb-4">How It Works</h2>
        <div className="prose-custom space-y-4">
          <p>
            The calculator converts between annual salary and hourly rate using the number of hours
            you actually work — not a fixed 2,080-hour assumption.
          </p>
          <p>
            <strong>Salary to hourly formula:</strong>{' '}
            <code className="rounded bg-gray-100 px-2 py-0.5 text-sm font-mono">
              hourly = annual ÷ (hours/week × working weeks − holidays × hours/day)
            </code>
          </p>
          <p>
            Working weeks = 52 minus your PTO weeks. Paid holidays reduce working days further. If
            you set both PTO and holidays to 0, the result matches the standard 2,080-hour year.
          </p>
          <p>
            All pay period amounts shown are gross (before taxes). For net take-home, subtract your
            effective tax rate and benefit deductions.
          </p>
        </div>
        <div className="mt-6">
          <Link href="/how-to-convert-salary-to-hourly" className="text-brand-600 hover:underline text-sm font-medium">
            Full guide: How to convert salary to hourly rate →
          </Link>
        </div>
      </div>

      {/* FAQ */}
      <div className="mx-auto mt-14 max-w-2xl">
        <h2 className="section-title mb-6">Frequently Asked Questions</h2>
        <dl className="space-y-5">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-lg border border-gray-200 p-5">
              <dt className="font-semibold text-gray-900">{faq.q}</dt>
              <dd className="mt-2 text-sm text-gray-600">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Related tools */}
      <div className="mx-auto mt-14 max-w-2xl">
        <h2 className="section-title mb-6">Related Tools &amp; Guides</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { href: '/hourly-vs-salary', title: 'Hourly vs Salary', desc: 'Which employment type is better for you?' },
            { href: '/overtime-pay-calculator', title: 'Overtime Pay Calculator', desc: 'Calculate 1.5× overtime pay per FLSA rules.' },
            { href: '/how-many-working-hours-in-a-year', title: 'Working Hours in a Year', desc: '2024 & 2025 tables for every schedule.' },
            { href: '/how-to-calculate-true-hourly-rate', title: 'True Hourly Rate', desc: 'Include health insurance, 401k & PTO value.' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="card hover:border-brand-200 hover:shadow-md transition-all group"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-brand-700">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
