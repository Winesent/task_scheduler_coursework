import { Outlet } from 'react-router-dom'

import { AppNavigation } from '../components/AppNavigation'

export function MainLayout() {
  return (
    <main className="page-shell">
      <header className="page-header">
        <div className="brand-mark" aria-hidden="true">✓</div>
        <div>
          <p className="eyebrow">ВАШ ЛИЧНЫЙ ПЛАНИРОВЩИК</p>
          <h1>План на день</h1>
          <p className="page-subtitle">
            Планировщик задач с регулярными повторами и напоминаниями.
          </p>
        </div>
        <div className="date-pill"><span aria-hidden="true">◷</span> Сегодня</div>
      </header>

      <AppNavigation />

      <Outlet />

      <footer className="page-footer">
        Составлено с заботой о вашем времени <span aria-hidden="true">✦</span>
      </footer>
    </main>
  )
}
