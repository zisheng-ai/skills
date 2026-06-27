'use client'

import { useState, useMemo } from 'react'

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })

export default function FreelanceRateCalc() {
  const [targetIncome, setTargetIncome] = useState('80000')
  const [billableHours, setBillableHours] = useState('25')
  const [adminHours, setAdminHours] = useState('10')
  const [monthlyExpenses, setMonthlyExpenses] = useState('500')
  const [profitMargin, setProfitMargin] = useState('10')

  const results = useMemo(() => {
    const income = parseFloat(targetIncome) || 0
    const billable = parseFloat(billableHours) || 0
    const admin = parseFloat(adminHours) || 0
    const expenses = (parseFloat(monthlyExpenses) || 0) * 12
    const margin = (parseFloat(profitMargin) || 0) / 100

    const totalWeeklyHours = billable + admin
    const billableWeeksPerYear = 50  // assume 2 weeks off
    const billableHoursPerYear = billable * billableWeeksPerYear

    const selfEmploymentTax = income * 0.1413  // SE tax (net after deduction)
    const totalCosts = income + selfEmploymentTax + expenses
    const withMargin = totalCosts / (1 - margin)
    const minimumRate = billableHoursPerYear > 0 ? withMargin / billableHoursPerYear : 0

    const utilizationRate = totalWeeklyHours > 0 ? billable / totalWeeklyHours : 0

    return {
      billableHoursPerYear,
      selfEmploymentTax,
      totalCosts,
      minimumRate,
      utilizationRate: utilizationRate * 100,
    }
  }, [targetIncome, billableHours, adminHours, monthlyExpenses, profitMargin])

  return (
    <div className="card">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">Target Annual Take-Home Income</label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">$</span>
            <input type="number" min="0" step="5000" value={targetIncome}
              onChange={(e) => setTargetIncome(e.target.value)}
              className="input-field pl-8" placeholder="80000" />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Billable Hours / Week</label>
          <input type="number" min="1" max="60" step="1" value={billableHours}
            onChange={(e) => setBillableHours(e.target.value)}
            className="input-field" />
          <p className="mt-1 text-xs text-gray-400">Hours you can bill to clients</p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Admin Hours / Week</label>
          <input type="number" min="0" max="40" step="1" value={adminHours}
            onChange={(e) => setAdminHours(e.target.value)}
            className="input-field" />
          <p className="mt-1 text-xs text-gray-400">Marketing, invoicing, meetings</p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Monthly Business Expenses</label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">$</span>
            <input type="number" min="0" step="50" value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(e.target.value)}
              className="input-field pl-8" placeholder="500" />
          </div>
          <p className="mt-1 text-xs text-gray-400">Software, insurance, equipment</p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Profit / Safety Buffer (%)</label>
          <input type="number" min="0" max="50" step="5" value={profitMargin}
            onChange={(e) => setProfitMargin(e.target.value)}
            className="input-field" />
          <p className="mt-1 text-xs text-gray-400">For slow months and savings</p>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left font-semibold text-gray-500 text-xs uppercase tracking-wider">Component</th>
              <th className="px-4 py-3 text-right font-semibold text-gray-500 text-xs uppercase tracking-wider">Annual</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-700">Target take-home income</td>
              <td className="px-4 py-3 text-right font-semibold text-gray-900">{fmt(parseFloat(targetIncome) || 0)}</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-700">Self-employment tax (~14.1%)</td>
              <td className="px-4 py-3 text-right text-gray-600">{fmt(results.selfEmploymentTax)}</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-700">Annual business expenses</td>
              <td className="px-4 py-3 text-right text-gray-600">{fmt((parseFloat(monthlyExpenses) || 0) * 12)}</td>
            </tr>
            <tr className="bg-brand-50">
              <td className="px-4 py-3 font-bold text-brand-700">
                Minimum Hourly Rate
                <span className="ml-1.5 font-normal text-sm text-brand-600">({results.billableHoursPerYear.toLocaleString()} billable hrs/yr)</span>
              </td>
              <td className="px-4 py-3 text-right font-bold text-brand-700 text-lg">{fmt(results.minimumRate)}/hr</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-500">Billable utilization rate</td>
              <td className="px-4 py-3 text-right text-gray-600">{results.utilizationRate.toFixed(0)}%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-gray-400">
        SE tax estimate uses the net self-employment income after the 50% deductibility adjustment. Does not include federal/state income tax. Assumes 50 billable weeks/year.
      </p>
    </div>
  )
}
