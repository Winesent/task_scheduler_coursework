import { NotificationBadge } from '@my-app/ui-library'

import { useTasks } from '../context/tasksContext'

export function NotificationsPage() {
  const { tasks } = useTasks()
  const pendingTasks = tasks.filter((task) => !task.completed)

  return (
    <div className="page-stack">
      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">ЦЕНТР НАПОМИНАНИЙ</p>
            <h2>Уведомления на сегодня</h2>
          </div>
          <NotificationBadge count={pendingTasks.length} enabled />
        </div>
        <p className="stub-text">
          Запланировано напоминаний по невыполненным задачам: {pendingTasks.length}.
        </p>
        <ul className="task-links-list">
          {pendingTasks.map((task) => (
            <li key={task.id} className="notification-row">
              <span>{task.time} — {task.title}</span>
              <span className="notification-row__status">Ожидает времени</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel stub-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">РАЗДЕЛ В РАЗРАБОТКЕ</p>
            <h2>Настройки браузерных уведомлений</h2>
          </div>
        </div>
        <p className="stub-text">
          Заглушка страницы настроек уведомлений: здесь появятся запрос разрешения Browser
          Notifications API, выбор интервала предупреждения, отложенные напоминания (snooze) и
          журнал сработавших уведомлений.
        </p>
      </section>
    </div>
  )
}
