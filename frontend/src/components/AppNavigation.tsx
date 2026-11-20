import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'План на день', end: true },
  { to: '/tasks/new', label: 'Новая задача', end: false },
  { to: '/repeats', label: 'Повторы', end: false },
  { to: '/notifications', label: 'Уведомления', end: false },
]

export function AppNavigation() {
  return (
    <nav className="app-nav" aria-label="Основная навигация">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) => `app-nav__link${isActive ? ' app-nav__link--active' : ''}`}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
