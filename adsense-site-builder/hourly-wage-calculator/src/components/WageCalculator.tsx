'use client'

import { useState, useMemo } from 'react'

type Mode = 'salary-to-hourly' | 'hourly-to-salary'

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })

function calcResults(annualSalary: number, hoursPerWeek: number, ptoWeeks: number, holidays: number) {
  const hoursPerDay = hoursPerWeek / 5
  const workingWeeks = 52 - ptoWeeks
  const workingDays = workingWeeks * 5 - holidays
  const workingHours = workingDays * hoursPerDay

  const hourly = workingHours > 0 ? annualSalary / workingHours : 0
  const daily = hoursPerDay > 0 ? hourly * hoursPerDay : 0

  return {
    annual: annualSalary,
    monthly: annualSalary / 12,
    semiMonthly: annualSalary / 24,
    biweekly: annualSalary / 26,
    weekly: annualSalary / 52,
    daily,
    hourly,
    workingHours: Math.round(workingHours),
    workingDays,
  }
}

interface RowProps {
  label: string
  value: number
  highlight?: boolean
}

function Row({ label, value, highlight }: RowProps) {
  return (
    <tr className={highlight ? 'bg-brand-50' : 'hover:bg-gray-50'}>
      <td className="px-4 py-3 text-sm font-medium text-gray-700">{label}</td>
      <td className={`px-4 py-3 text-sm text-right font-semibold ${highlight ? 'text-brand-700 text-base' : 'text-gray-900'}`}>
        {fmt(value)}
      </td>
    </tr>
  )
}

export default function WageCalculator() {
  const [mode, setMode] = useState<Mode>('salary-to-hourly')
  const [salaryInput, setSalaryInput] = useState('60000')
  const [hourlyInput, setHourlyInput] = useState('28.85')
  const [hoursPerWeek, setHoursPerWeek] = useState('40')
  const [ptoWeeks, setPtoWeeks] = useState('2')
  const [holidays, setHolidays] = useState('11')

  const results = useMemo(() => {
    const hpw = parseFloat(hoursPerWeek) || 40
    const pto = parseFloat(ptoWeeks) || 0
    const hol = parseFloat(holidays) || 0

    if (mode === 'salary-to-hourly') {
      const annual = parseFloat(salaryInput.replace(/,/g, '')) || 0
      return calcResults(annual, hpw, pto, hol)
    } else {
      const hourly = parseFloat(hourlyInput) || 0
      const hoursPerDay = hpw / 5
      const workingDays = (52 - pto) * 5 - hol
      const annual = hourly * workingDays * hoursPerDay
      return calcResults(annual, hpw, pto, hol)
    }
  }, [mode, salaryInput, hourlyInput, hoursPerWeek, ptoWeeks, holidays])

  return (
    <div className="card">
      {/* Mode Toggle */}
      <div className="mb-6 flex rounded-lg bg-gray-100 p-1">
        <button
          onClick={() => setMode('salary-to-hourly')}
          className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
            mode === 'salary-to-hourly'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Salary to Hourly
        </button>
        <button
          onClick={() => setMode('hourly-to-salary')}
          className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
            mode === 'hourly-to-salary'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Hourly to Salary
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Primary input */}
        {mode === 'salary-to-hourly' ? (
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">Annual Salary</label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">$</span>
              <input
                type="number"
                min="0"
                step="1000"
                value={salaryInput}
                onChange={(e) => setSalaryInput(e.target.value)}
                className="input-field pl-8"
                placeholder="60000"
              />
            </div>
          </div>
        ) : (
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">Hourly Rate</label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">$</span>
              <input
                type="number"
                min="0"
                step="0.25"
                value={hourlyInput}
                onChange={(e) => setHourlyInput(e.target.value)}
                className="input-field pl-8"
                placeholder="28.85"
              />
            </div>
          </div>
        )}

        {/* Secondary inputs */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Hours Per Week</label>
          <input
            type="number"
            min="1"
            max="168"
            step="0.5"
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(e.target.value)}
            className="input-field"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">PTO Weeks / Year</label>
          <input
            type="number"
            min="0"
            max="52"
            step="0.5"
            value={ptoWeeks}
            onChange={(e) => setPtoWeeks(e.target.value)}
            className="input-field"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Paid Holidays / Year</label>
          <input
            type="number"
            min="0"
            max="30"
            step="1"
            value={holidays}
            onChange={(e) => setHolidays(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="flex items-end">
          <div className="rounded-lg bg-gray-50 p-3 text-xs text-gray-500 w-full">
            Based on <strong>{results.workingHours.toLocaleString()}</strong> working hours and{' '}
            <strong>{results.workingDays}</strong> working days per year.
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-6 overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Pay Period</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Gross Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <Row label="Annual" value={results.annual} />
            <Row label="Monthly" value={results.monthly} />
            <Row label="Semi-Monthly (2x/month)" value={results.semiMonthly} />
            <Row label="Biweekly (every 2 weeks)" value={results.biweekly} />
            <Row label="Weekly" value={results.weekly} />
            <Row label="Daily (8h)" value={results.daily} />
            <Row
              label={mode === 'salary-to-hourly' ? 'Hourly Rate' : 'Annual Salary'}
              value={mode === 'salary-to-hourly' ? results.hourly : results.annual}
              highlight
            />
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-gray-400">
        Gross pay before taxes. Results are estimates — actual pay depends on your employer&apos;s pay schedule.
      </p>
    </div>
  )
}
