import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About HourlyCalc',
  description: 'HourlyCalc is a free salary-to-hourly calculator that handles custom work schedules, PTO, and holidays. Learn who built it and why.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="section-title mb-6">About HourlyCalc</h1>

      <div className="prose-custom space-y-5">
        <p>
          HourlyCalc is a free tool for converting between annual salary and hourly rates. It was built
          because every other calculator we found assumed a rigid 2,080-hour work year — which ignores
          PTO, paid holidays, and part-time schedules.
        </p>

        <p>
          The goal is simple: give you an accurate, customizable number you can use to compare job
          offers, negotiate salary, or understand your real compensation.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">What This Site Covers</h2>
        <ul className="space-y-2 list-disc pl-5">
          <li>Salary-to-hourly conversion with custom hours, PTO, and holidays</li>
          <li>Overtime pay calculations (FLSA 1.5× rule)</li>
          <li>Freelance rate calculator (includes self-employment tax and admin time)</li>
          <li>Minimum wage data for all 50 US states</li>
          <li>Industry-level wage benchmarks from BLS data</li>
          <li>Guides on total compensation, hourly vs. salary tradeoffs, and pay period math</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 mt-8">Important Disclaimer</h2>
        <p>
          All results on HourlyCalc are estimates based on the inputs you enter. They represent gross
          (pre-tax) pay. Actual take-home pay depends on your federal and state tax bracket, filing
          status, deductions, and benefit contributions.
        </p>
        <p>
          This site does not provide tax, financial, or legal advice. For personalized guidance, consult
          a licensed CPA, financial advisor, or employment attorney.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">Data Sources</h2>
        <ul className="space-y-1 text-sm list-disc pl-5">
          <li>Wage data: U.S. Bureau of Labor Statistics (BLS), Occupational Employment and Wage Statistics</li>
          <li>State minimum wages: National Conference of State Legislatures (NCSL) and individual state Department of Labor sites</li>
          <li>FLSA rules: U.S. Department of Labor, Wage and Hour Division</li>
          <li>ACA rules: Healthcare.gov / IRS guidance</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 mt-8">Contact</h2>
        <p>
          Questions, corrections, or feedback? Use the <Link href="/contact" className="text-brand-600 hover:underline">contact page</Link>.
        </p>
      </div>
    </div>
  )
}
