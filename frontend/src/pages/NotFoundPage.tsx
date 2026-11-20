import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="panel stub-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">ОШИБКА 404</p>
          <h2>Страница не найдена</h2>
        </div>
      </div>
      <p className="stub-text">
        Запрошенный маршрут не существует в приложении.
      </p>
      <Link className="inline-action-link" to="/">
        ← Перейти к плану на день
      </Link>
    </section>
  )
}
