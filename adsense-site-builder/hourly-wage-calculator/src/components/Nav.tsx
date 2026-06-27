import Link from 'next/link'

const links = [
  { href: '/overtime-pay-calculator', label: 'Overtime' },
  { href: '/hourly-vs-salary', label: 'Hourly vs Salary' },
  { href: '/minimum-wage-to-annual-salary', label: 'Min Wage Table' },
  { href: '/average-hourly-wages-by-industry', label: 'Wage by Industry' },
]

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-gray-900 hover:text-brand-600 transition-colors">
          <span className="text-brand-600 text-xl">$</span>
          <span>HourlyCalc</span>
        </Link>
        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link href="/" className="btn-primary text-sm">
          Calculator
        </Link>
      </div>
    </header>
  )
}
