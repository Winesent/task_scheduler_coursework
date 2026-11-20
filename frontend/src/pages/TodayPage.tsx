import { TaskList } from '@my-app/ui-library'
import { Link } from 'react-router-dom'

import { DaySummary } from '../components/DaySummary'
import { useTasks } from '../context/tasksContext'

export function TodayPage() {
  const { tasks, changeTaskCompletion } = useTasks()

  return (
    <div className="page-stack">
      <DaySummary tasks={tasks} />

      <section className="tasks-section">
        <div className="section-heading tasks-heading">
          <div>
            <p className="eyebrow">ШАГ ЗА ШАГОМ</p>
            <h2>Расписание <span className="count-badge">{tasks.length}</span></h2>
          </div>
          <Link className="inline-action-link" to="/tasks/new">
            ＋ Добавить задачу
          </Link>
        </div>
        <TaskList tasks={tasks} onTaskCompleteChange={changeTaskCompletion} />
      </section>

      {tasks.length > 0 && (
        <section className="panel stub-panel" aria-label="Быстрый переход к деталям задач">
          <div className="section-heading">
            <div>
              <p className="eyebrow">КАРТОЧКИ ЗАДАЧ</p>
              <h2>Детали и напоминания</h2>
            </div>
          </div>
          <ul className="task-links-list">
            {tasks.map((task) => (
              <li key={task.id}>
                <Link to={`/tasks/${task.id}`} className="task-detail-link">
                  <span>{task.time} — {task.title}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
