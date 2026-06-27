import Link from 'next/link'

const tools = [
  { href: '/', label: 'Hourly Wage Calculator' },
  { href: '/overtime-pay-calculator', label: 'Overtime Pay Calculator' },
  { href: '/freelance-rate-from-salary', label: 'Freelance Rate Calculator' },
]

const guides = [
  { href: '/how-to-convert-salary-to-hourly', label: 'How to Convert Salary to Hourly' },
  { href: '/hourly-vs-salary', label: 'Hourly vs Salary' },
  { href: '/how-many-working-hours-in-a-year', label: 'Working Hours in a Year' },
  { href: '/how-to-calculate-true-hourly-rate', label: 'True Hourly Rate with Benefits' },
]

const reference = [
  { href: '/minimum-wage-to-annual-salary', label: 'Minimum Wage by State' },
  { href: '/average-hourly-wages-by-industry', label: 'Average Wages by Industry' },
  { href: '/part-time-vs-full-time-salary', label: 'Part-Time vs Full-Time' },
]

const legal = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms' },
]

function LinkGroup({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{title}</p>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <LinkGroup title="Tools" links={tools} />
          <LinkGroup title="Guides" links={guides} />
          <LinkGroup title="Reference" links={reference} />
          <LinkGroup title="Site" links={legal} />
        </div>
        <div className="mt-10 border-t border-gray-200 pt-8 text-center">
          <p className="text-xs text-gray-400">
            HourlyCalc results are estimates based on the inputs you provide. They do not constitute financial or tax advice.
          </p>
          <p className="mt-2 text-xs text-gray-400">
            &copy; {new Date().getFullYear()} HourlyCalc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
