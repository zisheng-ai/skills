'use client'

import { useState, useMemo } from 'react'

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })

export default function OvertimeCalculator() {
  const [hourlyRate, setHourlyRate] = useState('25')
  const [regularHours, setRegularHours] = useState('40')
  const [overtimeHours, setOvertimeHours] = useState('8')
  const [otMultiplier, setOtMultiplier] = useState('1.5')

  const results = useMemo(() => {
    const rate = parseFloat(hourlyRate) || 0
    const reg = parseFloat(regularHours) || 0
    const ot = parseFloat(overtimeHours) || 0
    const mult = parseFloat(otMultiplier) || 1.5

    const regularPay = rate * reg
    const otRate = rate * mult
    const otPay = otRate * ot
    const totalPay = regularPay + otPay
    const totalHours = reg + ot
    const effectiveRate = totalHours > 0 ? totalPay / totalHours : 0

    return { regularPay, otRate, otPay, totalPay, totalHours, effectiveRate }
  }, [hourlyRate, regularHours, overtimeHours, otMultiplier])

  return (
    <div className="card">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Hourly Rate</label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">$</span>
            <input type="number" min="0" step="0.25" value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              className="input-field pl-8" placeholder="25.00" />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Regular Hours / Week</label>
          <input type="number" min="0" max="168" step="0.5" value={regularHours}
            onChange={(e) => setRegularHours(e.target.value)}
            className="input-field" placeholder="40" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Overtime Hours / Week</label>
          <input type="number" min="0" max="128" step="0.5" value={overtimeHours}
            onChange={(e) => setOvertimeHours(e.target.value)}
            className="input-field" placeholder="8" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Overtime Multiplier</label>
          <select value={otMultiplier} onChange={(e) => setOtMultiplier(e.target.value)} className="input-field">
            <option value="1.5">1.5× (FLSA standard)</option>
            <option value="2">2× (double time)</option>
            <option value="1.25">1.25× (custom)</option>
          </select>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left font-semibold text-gray-500 text-xs uppercase tracking-wider">Pay Component</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-500 text-xs uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-700">Regular Pay ({regularHours}h × ${hourlyRate})</td>
              <td className="px-4 py-3 text-right font-semibold text-gray-900">{fmt(results.regularPay)}</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-700">Overtime Rate ({otMultiplier}×)</td>
              <td className="px-4 py-3 text-right text-gray-600">{fmt(results.otRate)}/hr</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-700">Overtime Pay ({overtimeHours}h × {fmt(results.otRate)})</td>
              <td className="px-4 py-3 text-right font-semibold text-gray-900">{fmt(results.otPay)}</td>
            </tr>
            <tr className="bg-brand-50">
              <td className="px-4 py-3 font-bold text-brand-700">Total Weekly Pay ({results.totalHours}h)</td>
              <td className="px-4 py-3 text-right font-bold text-brand-700 text-base">{fmt(results.totalPay)}</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-500">Effective Hourly Rate</td>
              <td className="px-4 py-3 text-right text-gray-600">{fmt(results.effectiveRate)}/hr</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-500">Annual (×52 weeks)</td>
              <td className="px-4 py-3 text-right text-gray-600">{fmt(results.totalPay * 52)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-gray-400">Gross pay before taxes. FLSA requires 1.5× for hours over 40/week for non-exempt employees.</p>
    </div>
  )
}
