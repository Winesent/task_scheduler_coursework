import { NotificationBadge, RepeatRulePreview } from '@my-app/ui-library'
import { Link, useParams } from 'react-router-dom'

import { useTasks } from '../context/tasksContext'

export function TaskDetailsPage() {
  const { taskId } = useParams<{ taskId: string }>()
  const { tasks, changeTaskCompletion } = useTasks()
  const task = tasks.find((item) => item.id === taskId)

  if (!task) {
    return (
      <section className="panel stub-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">ЗАДАЧА НЕ НАЙДЕНА</p>
            <h2>Задача с идентификатором «{taskId}» не найдена</h2>
          </div>
        </div>
        <p className="stub-text">
          Возможно, задача была удалена или открыта неверная ссылка.
        </p>
        <Link className="inline-action-link" to="/">
          ← Вернуться к плану на день
        </Link>
      </section>
    )
  }

  return (
    <div className="page-stack">
      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">КАРТОЧКА ЗАДАЧИ</p>
            <h2>{task.title}</h2>
          </div>
          <NotificationBadge count={task.completed ? 0 : 1} enabled={!task.completed} />
        </div>

        <dl className="details-grid">
          <div>
            <dt>Время выполнения</dt>
            <dd>{task.time}</dd>
          </div>
          <div>
            <dt>Статус</dt>
            <dd>{task.completed ? 'Выполнена' : 'Запланирована'}</dd>
          </div>
        </dl>

        <div className="details-actions">
          <button
            type="button"
            className="button button--primary"
            onClick={() => changeTaskCompletion(task.id, !task.completed)}
          >
            {task.completed ? 'Вернуть в план' : 'Отметить выполненной'}
          </button>
          <Link className="inline-action-link" to="/">
            ← Назад к расписанию
          </Link>
        </div>
      </section>

      <section className="panel stub-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">РЕГУЛЯРНЫЙ ПОВТОР</p>
            <h2>Правило повторения</h2>
          </div>
        </div>
        <RepeatRulePreview repeat={task.repeat} taskTitle={task.title} />
        <p className="stub-text">
          Заглушка блока редактирования: в следующей версии здесь можно будет изменить время,
          правило повторения и историю срабатывания напоминаний для этой задачи.
        </p>
      </section>
    </div>
  )
}
