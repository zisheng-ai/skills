import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Calculate Your True Hourly Rate (Including Benefits)',
  description:
    'Your hourly wage is not your true rate. Learn how to add health insurance, 401k match, PTO, and other perks as dollar-per-hour equivalents to compare job offers accurately.',
  alternates: { canonical: '/how-to-calculate-true-hourly-rate' },
}

export default function TrueHourlyRatePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span className="mx-2">/</span>
        <span>True Hourly Rate with Benefits</span>
      </nav>

      <h1 className="section-title mb-4">How to Calculate Your True Hourly Rate</h1>
      <p className="text-lg text-gray-600 mb-8">
        Your gross hourly wage only tells half the story. To compare job offers accurately, you need to add benefits — health insurance, 401k match, PTO, and perks — as equivalent hourly dollars.
      </p>

      {/* Why it matters */}
      <div className="card bg-amber-50 border-amber-200 mb-8">
        <h2 className="font-bold text-amber-900 mb-2">Why Base Pay Alone Is Misleading</h2>
        <p className="text-sm text-amber-800">
          Job A pays $28/hr with no benefits. Job B pays $25/hr but includes employer-sponsored health insurance worth $8,000/year, a 4% 401k match on $52,000 ($2,080/year), and 3 weeks PTO.
        </p>
        <p className="mt-2 text-sm text-amber-800">
          At 2,000 working hours/year: Job B&apos;s total compensation = $50,000 + $8,000 + $2,080 + $3,000 (PTO) = <strong>$63,080 ≈ $31.54/hr</strong>. That&apos;s higher than Job A despite the lower base rate.
        </p>
      </div>

      {/* Step-by-step */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">Step-by-Step Worksheet</h2>
      <div className="space-y-4 mb-8">
        {[
          {
            step: 1,
            title: 'Start with base annual pay',
            desc: 'hourly rate × hours per year (use your actual working hours, not 2,080)',
            example: '$25/hr × 2,000h = $50,000',
          },
          {
            step: 2,
            title: 'Add employer health insurance value',
            desc: 'Look at your pay stub for the employer contribution — not what you pay, but what the company pays on your behalf.',
            example: 'Employer pays $600/month = $7,200/year',
          },
          {
            step: 3,
            title: 'Add 401k or retirement match',
            desc: 'Employer match × your salary. A 4% match on $52k = $2,080/year.',
            example: '4% × $50,000 = $2,000/year',
          },
          {
            step: 4,
            title: 'Add the dollar value of PTO',
            desc: 'Days of PTO × daily pay rate.',
            example: '15 days × $200/day = $3,000/year',
          },
          {
            step: 5,
            title: 'Add dental, vision, life, and disability',
            desc: 'Estimate the premium you would pay individually. Employer-paid dental+vision is typically $500–$1,500/year.',
            example: '$900/year',
          },
          {
            step: 6,
            title: 'Divide total by working hours',
            desc: 'Sum all benefit values, add to base pay, divide by your working hours per year.',
            example: '($50,000 + $7,200 + $2,000 + $3,000 + $900) ÷ 2,000h = $31.55/hr true rate',
          },
        ].map((s) => (
          <div key={s.step} className="flex gap-4 rounded-lg border border-gray-200 p-5">
            <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white text-sm font-bold">
              {s.step}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{s.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{s.desc}</p>
              <p className="mt-1 text-sm font-mono text-brand-700 bg-brand-50 px-2 py-0.5 rounded inline-block">
                Example: {s.example}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Benchmark table */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">Typical Benefit Values (Annual)</h2>
      <div className="overflow-x-auto rounded-lg border border-gray-200 mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Benefit</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">Low</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">Typical</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">High</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { benefit: 'Employer health contribution', low: '$3,000', typical: '$7,000', high: '$14,000' },
              { benefit: '401k match (3–6% of salary)', low: '$1,500', typical: '$2,500', high: '$5,000' },
              { benefit: 'PTO (10–20 days at $25/hr)', low: '$2,000', typical: '$3,000', high: '$5,000' },
              { benefit: 'Dental + vision', low: '$400', typical: '$900', high: '$1,500' },
              { benefit: 'Life + disability insurance', low: '$200', typical: '$500', high: '$1,000' },
              { benefit: 'Commuter / parking benefit', low: '$0', typical: '$600', high: '$3,180' },
              { benefit: 'Learning & development budget', low: '$0', typical: '$1,000', high: '$5,000' },
            ].map((row) => (
              <tr key={row.benefit} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-700">{row.benefit}</td>
                <td className="px-4 py-3 text-right text-gray-500">{row.low}</td>
                <td className="px-4 py-3 text-right font-medium text-gray-900">{row.typical}</td>
                <td className="px-4 py-3 text-right text-gray-500">{row.high}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl bg-brand-50 p-6 text-center border border-brand-100">
        <p className="text-gray-700 mb-3 font-medium">Calculate your base hourly rate or annual salary first.</p>
        <Link href="/" className="btn-primary">Open the Calculator</Link>
      </div>

      <div className="mt-10 pt-8 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Related</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { href: '/hourly-vs-salary', label: 'Hourly vs Salary' },
            { href: '/freelance-rate-from-salary', label: 'Freelance Rate Calculator' },
            { href: '/average-hourly-wages-by-industry', label: 'Average Wages by Industry' },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-brand-600 hover:underline">{l.label} →</Link>
          ))}
        </div>
      </div>
    </div>
  )
}
