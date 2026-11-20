import { RepeatRulePreview } from '@my-app/ui-library'
import { Link } from 'react-router-dom'

import { useTasks } from '../context/tasksContext'

export function RepeatsPage() {
  const { tasks } = useTasks()
  const recurringTasks = tasks.filter((task) => task.repeat !== 'none')

  return (
    <div className="page-stack">
      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">РЕГУЛЯРНЫЕ ПОВТОРЫ</p>
            <h2>Повторяющиеся задачи <span className="count-badge">{recurringTasks.length}</span></h2>
          </div>
          <Link className="inline-action-link" to="/tasks/new">
            ＋ Создать повторяющуюся задачу
          </Link>
        </div>

        <div className="repeats-grid">
          {recurringTasks.map((task) => (
            <div key={task.id} className="repeat-item">
              <RepeatRulePreview repeat={task.repeat} taskTitle={`${task.time} — ${task.title}`} />
              <Link className="inline-action-link" to={`/tasks/${task.id}`}>
                Открыть задачу →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="panel stub-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">РАЗДЕЛ В РАЗРАБОТКЕ</p>
            <h2>Календарь серий и исключения</h2>
          </div>
        </div>
        <p className="stub-text">
          Заглушка страницы управления регулярными повторами: здесь будут отображаться календарная
          сетка ближайших повторений, пауза серии и пропуск отдельных дат.
        </p>
      </section>
    </div>
  )
}
