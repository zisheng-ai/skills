import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Average Hourly Wages by Industry (US, 2024)',
  description:
    'BLS median hourly wages for 15 major US industries with annual salary equivalents. Use this table to benchmark your pay against industry norms.',
  alternates: { canonical: '/average-hourly-wages-by-industry' },
}

// Source: BLS Occupational Employment and Wage Statistics, May 2023 / 2024 estimates
const industries = [
  { industry: 'Management', median: 61.82, count: '3.4M workers' },
  { industry: 'Legal', median: 50.20, count: '1.2M workers' },
  { industry: 'Computer & Mathematical', median: 47.33, count: '4.9M workers' },
  { industry: 'Architecture & Engineering', median: 43.78, count: '2.7M workers' },
  { industry: 'Healthcare Practitioners', median: 40.77, count: '9.5M workers' },
  { industry: 'Business & Financial Operations', median: 39.24, count: '8.9M workers' },
  { industry: 'Life, Physical & Social Science', median: 36.85, count: '1.5M workers' },
  { industry: 'Installation, Maintenance & Repair', median: 26.33, count: '5.8M workers' },
  { industry: 'Construction & Extraction', median: 26.20, count: '6.0M workers' },
  { industry: 'Transportation & Material Moving', median: 22.47, count: '12.4M workers' },
  { industry: 'Sales & Related', median: 20.61, count: '14.8M workers' },
  { industry: 'Office & Administrative Support', median: 20.38, count: '18.6M workers' },
  { industry: 'Production (Manufacturing)', median: 20.15, count: '9.8M workers' },
  { industry: 'Healthcare Support', median: 19.32, count: '6.4M workers' },
  { industry: 'Food Preparation & Serving', median: 15.50, count: '13.0M workers' },
]

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })

export default function AvgWagesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span className="mx-2">/</span>
        <span>Average Wages by Industry</span>
      </nav>

      <h1 className="section-title mb-4">Average Hourly Wages by Industry (US)</h1>
      <p className="text-lg text-gray-600 mb-2">
        Median hourly wages for 15 major US industry groups, with annual salary equivalents at 40h/week.
        Use this table to benchmark a job offer or negotiate a raise.
      </p>
      <p className="text-xs text-gray-400 mb-8">
        Source: Bureau of Labor Statistics, Occupational Employment and Wage Statistics (OEWS), 2023–2024. Median means 50% of workers in the group earn more, 50% earn less.
      </p>

      <div className="overflow-x-auto rounded-lg border border-gray-200 mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Industry</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">Median Hourly</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">Annual Equivalent</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-500 text-xs">Workers</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {industries.map((row) => (
              <tr key={row.industry} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-700">{row.industry}</td>
                <td className="px-4 py-3 text-right text-gray-900 font-semibold">{fmt(row.median)}</td>
                <td className="px-4 py-3 text-right text-brand-700 font-semibold">{fmt(row.median * 2080)}</td>
                <td className="px-4 py-3 text-right text-xs text-gray-400">{row.count}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50 border-t-2 border-gray-200">
              <td className="px-4 py-3 font-bold text-gray-700">All occupations (US median)</td>
              <td className="px-4 py-3 text-right font-bold text-gray-900">$23.17</td>
              <td className="px-4 py-3 text-right font-bold text-brand-700">{fmt(23.17 * 2080)}</td>
              <td className="px-4 py-3 text-right text-xs text-gray-400">158M workers</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="card bg-blue-50 border-blue-200 mb-8">
        <h2 className="font-bold text-blue-900 mb-2">How to Use This Table</h2>
        <ul className="space-y-1 text-sm text-blue-800">
          <li>• If your offer is below the industry median, you have data to back a negotiation.</li>
          <li>• Remember that medians hide large ranges — a software engineer at the 90th percentile earns 3–4× the median.</li>
          <li>• Location matters: the same role pays ~40% more in San Francisco than in rural Midwest markets.</li>
          <li>• These are gross wages. Add the value of benefits (health, 401k, PTO) to compare total compensation.</li>
        </ul>
      </div>

      <div className="rounded-xl bg-brand-50 p-6 text-center border border-brand-100">
        <p className="text-gray-700 mb-3 font-medium">See how your hourly rate converts to an annual salary.</p>
        <Link href="/" className="btn-primary">Open the Calculator</Link>
      </div>

      <div className="mt-10 pt-8 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Related</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { href: '/hourly-vs-salary', label: 'Hourly vs Salary' },
            { href: '/how-to-calculate-true-hourly-rate', label: 'True Hourly Rate with Benefits' },
            { href: '/minimum-wage-to-annual-salary', label: 'Minimum Wage by State' },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-brand-600 hover:underline">{l.label} →</Link>
          ))}
        </div>
      </div>
    </div>
  )
}
