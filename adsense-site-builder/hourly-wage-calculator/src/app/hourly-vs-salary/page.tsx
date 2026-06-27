import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Hourly vs Salary: Which Is Better?',
  description:
    'Honest comparison of hourly and salaried employment: overtime eligibility, income stability, benefits, FLSA rules, and a total compensation worksheet.',
  alternates: { canonical: '/hourly-vs-salary' },
}

const comparison = [
  { factor: 'Overtime pay', hourly: 'Yes — 1.5× for hours over 40/week (FLSA)', salary: 'Only if classified as non-exempt; many salaried workers are exempt' },
  { factor: 'Income predictability', hourly: 'Varies with hours scheduled', salary: 'Fixed regardless of hours (if exempt)' },
  { factor: 'Benefits eligibility', hourly: 'Often part-time or limited; full-time hourly may get full benefits', salary: 'Typically full benefits package' },
  { factor: 'Schedule flexibility', hourly: 'Pay changes when hours change', salary: 'Pay stable; hours may still fluctuate' },
  { factor: 'Record-keeping', hourly: 'Employer must track all hours (FLSA)', salary: 'Exempt employees do not require timekeeping' },
  { factor: 'Pay if work under 40h', hourly: 'Only paid for hours worked', salary: 'Paid full weekly salary (exempt employees)' },
  { factor: 'Raises / promotions', hourly: 'Rate increase or reclassification to salary', salary: 'Salary bump or title change' },
]

export default function HourlyVsSalaryPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span className="mx-2">/</span>
        <span>Hourly vs Salary</span>
      </nav>

      <h1 className="section-title mb-4">Hourly vs Salary: Which Is Better?</h1>
      <p className="text-lg text-gray-600 mb-8">
        Neither is universally better. The right choice depends on your industry, lifestyle, and how you value income stability versus overtime upside.
      </p>

      {/* Quick answer */}
      <div className="grid gap-4 sm:grid-cols-2 mb-10">
        <div className="rounded-xl border-2 border-brand-200 bg-brand-50 p-5">
          <h2 className="font-bold text-brand-800 mb-2">Hourly is better when...</h2>
          <ul className="space-y-1 text-sm text-brand-700">
            <li>• You regularly work overtime and want 1.5× pay</li>
            <li>• Your hours fluctuate and you want to be paid precisely</li>
            <li>• You work part-time or multiple jobs</li>
            <li>• You are in a trade or skilled labor field</li>
          </ul>
        </div>
        <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-5">
          <h2 className="font-bold text-gray-800 mb-2">Salary is better when...</h2>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>• You want predictable pay regardless of hours</li>
            <li>• Your job comes with a full benefits package</li>
            <li>• You prefer flexibility without punch-card tracking</li>
            <li>• You are in a professional or management role</li>
          </ul>
        </div>
      </div>

      {/* Comparison table */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">Side-by-Side Comparison</h2>
      <div className="overflow-x-auto rounded-lg border border-gray-200 mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left font-semibold text-gray-700 w-1/3">Factor</th>
              <th className="px-4 py-3 text-left font-semibold text-brand-700">Hourly</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Salary</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {comparison.map((row) => (
              <tr key={row.factor} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-700">{row.factor}</td>
                <td className="px-4 py-3 text-gray-600">{row.hourly}</td>
                <td className="px-4 py-3 text-gray-600">{row.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FLSA note */}
      <div className="card bg-blue-50 border-blue-200 mb-8">
        <h2 className="font-bold text-blue-900 mb-2">FLSA Exempt vs Non-Exempt</h2>
        <p className="text-sm text-blue-800 mb-2">
          The Fair Labor Standards Act (FLSA) classifies employees as exempt or non-exempt, not simply salaried or hourly.
        </p>
        <ul className="space-y-1 text-sm text-blue-700">
          <li>• <strong>Non-exempt:</strong> Must receive overtime pay (1.5×) for hours over 40/week. Most hourly workers and some salaried workers earning under $684/week are non-exempt.</li>
          <li>• <strong>Exempt:</strong> No overtime requirement. Must be paid at least $684/week ($35,568/year) on a salary basis and pass a duties test (executive, professional, or administrative).</li>
        </ul>
        <p className="mt-2 text-xs text-blue-600">Source: U.S. Department of Labor, Wage and Hour Division.</p>
      </div>

      {/* Total compensation worksheet */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">Total Compensation Worksheet</h2>
      <p className="text-sm text-gray-600 mb-4">
        To compare an hourly offer to a salaried offer, add the dollar value of all benefits. Here is a rough guide to what each benefit adds annually:
      </p>
      <div className="overflow-x-auto rounded-lg border border-gray-200 mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Benefit</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">Typical Annual Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { b: 'Employer health insurance contribution', v: '$6,000 – $14,000' },
              { b: '401(k) match (3–5% of salary)', v: '$1,800 – $5,000' },
              { b: '2 weeks PTO (at $25/hr)', v: '$2,000' },
              { b: 'Dental + vision insurance', v: '$500 – $1,500' },
              { b: 'Life / disability insurance', v: '$200 – $600' },
            ].map((row) => (
              <tr key={row.b} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-600">{row.b}</td>
                <td className="px-4 py-3 text-right font-medium text-gray-700">{row.v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500 mb-8">
        A salaried role that pays $52,000 plus full benefits may be worth $65,000+ in total compensation — more than a $27/hr hourly role with no benefits.
      </p>

      <div className="rounded-xl bg-brand-50 p-6 text-center border border-brand-100">
        <p className="text-gray-700 mb-3 font-medium">Convert any salary or hourly offer to an apples-to-apples number.</p>
        <Link href="/" className="btn-primary">Use the Calculator</Link>
      </div>

      <div className="mt-10 pt-8 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Related</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { href: '/how-to-calculate-true-hourly-rate', label: 'True Hourly Rate with Benefits' },
            { href: '/overtime-pay-calculator', label: 'Overtime Pay Calculator' },
            { href: '/how-to-convert-salary-to-hourly', label: 'How to Convert Salary to Hourly' },
            { href: '/freelance-rate-from-salary', label: 'Freelance Rate from Salary' },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-brand-600 hover:underline">{l.label} →</Link>
          ))}
        </div>
      </div>
    </div>
  )
}
