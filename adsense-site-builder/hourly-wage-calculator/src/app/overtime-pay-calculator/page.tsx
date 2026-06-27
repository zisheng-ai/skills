import type { Metadata } from 'next'
import Link from 'next/link'
import OvertimeCalculator from '@/components/OvertimeCalculator'

export const metadata: Metadata = {
  title: 'Overtime Pay Calculator — FLSA 1.5× Rate',
  description:
    'Calculate overtime pay per FLSA rules. Enter your hourly rate, regular hours, and overtime hours to see total weekly pay, overtime rate, and effective blended hourly rate.',
  alternates: { canonical: '/overtime-pay-calculator' },
}

const examples = [
  { rate: 20, reg: 40, ot: 5, desc: '$20/hr, 5 OT hours' },
  { rate: 30, reg: 40, ot: 10, desc: '$30/hr, 10 OT hours' },
]

export default function OvertimePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span className="mx-2">/</span>
        <span>Overtime Pay Calculator</span>
      </nav>

      <h1 className="section-title mb-4">Overtime Pay Calculator</h1>
      <p className="text-lg text-gray-600 mb-8">
        Enter your hourly rate, regular hours, and overtime hours to calculate weekly pay, overtime premium, and effective blended hourly rate — using FLSA 1.5× rules.
      </p>

      <OvertimeCalculator />

      {/* FLSA rules */}
      <div className="card bg-blue-50 border-blue-200 mt-8 mb-8">
        <h2 className="font-bold text-blue-900 mb-2">FLSA Overtime Rules</h2>
        <ul className="space-y-1.5 text-sm text-blue-800">
          <li>• Non-exempt employees must receive <strong>1.5× their regular rate</strong> for all hours over 40 in a workweek.</li>
          <li>• The workweek is a fixed recurring 7-day period — it does not have to be Mon–Sun.</li>
          <li>• Salaried <em>exempt</em> employees (earning ≥$684/week who meet a duties test) are generally not entitled to FLSA overtime.</li>
          <li>• Some states have stricter rules (e.g., California requires daily overtime for hours over 8).</li>
        </ul>
        <p className="mt-2 text-xs text-blue-600">Source: U.S. Department of Labor, Fair Labor Standards Act.</p>
      </div>

      {/* Worked examples */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">Worked Examples</h2>
      <div className="space-y-4 mb-8">
        {examples.map((ex) => {
          const regPay = ex.rate * ex.reg
          const otRate = ex.rate * 1.5
          const otPay = otRate * ex.ot
          const total = regPay + otPay
          return (
            <div key={ex.desc} className="rounded-lg border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-3">{ex.desc}</h3>
              <div className="grid gap-1 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Regular pay ({ex.reg}h × ${ex.rate})</span><span className="font-medium">${regPay.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Overtime rate (1.5 × ${ex.rate})</span><span className="font-medium">${otRate.toFixed(2)}/hr</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Overtime pay ({ex.ot}h × ${otRate.toFixed(2)})</span><span className="font-medium">${otPay.toFixed(2)}</span></div>
                <div className="flex justify-between border-t border-gray-200 pt-1 mt-1"><span className="font-bold text-brand-700">Total weekly pay</span><span className="font-bold text-brand-700">${total.toFixed(2)}</span></div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-10 pt-8 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Related</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { href: '/', label: 'Hourly Wage Calculator' },
            { href: '/hourly-vs-salary', label: 'Hourly vs Salary' },
            { href: '/how-to-calculate-true-hourly-rate', label: 'True Hourly Rate with Benefits' },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-brand-600 hover:underline">{l.label} →</Link>
          ))}
        </div>
      </div>
    </div>
  )
}
