import type { Metadata } from 'next'
import Link from 'next/link'
import FreelanceRateCalc from '@/components/FreelanceRateCalc'

export const metadata: Metadata = {
  title: 'Freelance Rate Calculator — What to Charge to Match a Salary',
  description:
    'Calculate the minimum hourly freelance rate to match your target income after self-employment tax, admin time, and business expenses. Includes SE tax and utilization rate.',
  alternates: { canonical: '/freelance-rate-from-salary' },
}

export default function FreelancePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span className="mx-2">/</span>
        <span>Freelance Rate Calculator</span>
      </nav>

      <h1 className="section-title mb-4">Freelance Rate Calculator</h1>
      <p className="text-lg text-gray-600 mb-8">
        Your freelance hourly rate is not the same as an employee&apos;s hourly wage. You need to cover self-employment taxes (~15%), unpaid admin time, business expenses, and gaps between projects. This calculator finds your minimum viable rate.
      </p>

      <FreelanceRateCalc />

      {/* Why different from employee rate */}
      <div className="card bg-amber-50 border-amber-200 mt-8 mb-8">
        <h2 className="font-bold text-amber-900 mb-2">Why Freelance Rates Should Be 1.5–2× Employee Rates</h2>
        <ul className="space-y-1 text-sm text-amber-800">
          <li>• <strong>Self-employment tax:</strong> ~15.3% on net self-employment income (Social Security + Medicare, both halves)</li>
          <li>• <strong>No paid admin time:</strong> Invoicing, marketing, client calls, and contracts take 10–25% of your working hours but are not billable</li>
          <li>• <strong>No employer benefits:</strong> Health insurance, 401k, PTO, and equipment are all your cost</li>
          <li>• <strong>Revenue gaps:</strong> Most freelancers have 1–4 slow/unpaid weeks per year from project transitions</li>
        </ul>
      </div>

      {/* Quick reference */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Reference: Salary to Freelance Rate</h2>
      <div className="overflow-x-auto rounded-lg border border-gray-200 mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Target Income</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">Employee Equiv (hr)</th>
              <th className="px-4 py-3 text-right font-semibold text-brand-700">Min Freelance Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { income: 50000, empRate: 25, freelanceRate: 45 },
              { income: 75000, empRate: 37.5, freelanceRate: 68 },
              { income: 100000, empRate: 50, freelanceRate: 90 },
              { income: 150000, empRate: 75, freelanceRate: 135 },
            ].map((row) => (
              <tr key={row.income} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-700">${row.income.toLocaleString()}/yr</td>
                <td className="px-4 py-3 text-right text-gray-600">${row.empRate}/hr</td>
                <td className="px-4 py-3 text-right font-semibold text-brand-700">${row.freelanceRate}+/hr</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="px-4 py-2 text-xs text-gray-400">Estimates assume 25 billable hours/week, 50 working weeks, $500/month expenses, and 14% SE tax. Use the calculator above for your specific situation.</p>
      </div>

      <div className="mt-10 pt-8 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Related</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { href: '/hourly-vs-salary', label: 'Hourly vs Salary' },
            { href: '/how-to-calculate-true-hourly-rate', label: 'True Hourly Rate with Benefits' },
            { href: '/', label: 'Main Wage Calculator' },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-brand-600 hover:underline">{l.label} →</Link>
          ))}
        </div>
      </div>
    </div>
  )
}
