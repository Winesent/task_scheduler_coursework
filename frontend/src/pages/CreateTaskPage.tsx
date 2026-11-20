import { TaskForm } from '@my-app/ui-library'
import { useNavigate } from 'react-router-dom'

import { useTasks } from '../context/tasksContext'

import type { NewTaskData } from '@my-app/ui-library'

export function CreateTaskPage() {
  const { addTask } = useTasks()
  const navigate = useNavigate()

  function handleCreateTask(data: NewTaskData) {
    const createdTask = addTask(data)

    navigate(`/tasks/${createdTask.id}`)
  }

  return (
    <div className="page-stack">
      <section className="panel form-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">НЕ УПУСТИТЕ ВАЖНОЕ</p>
            <h2>Новая задача</h2>
          </div>
          <span className="heading-symbol" aria-hidden="true">＋</span>
        </div>
        <TaskForm onSubmit={handleCreateTask} />
      </section>

      <section className="panel stub-panel" aria-label="Настройки уведомления (заглушка)">
        <div className="section-heading">
          <div>
            <p className="eyebrow">РАЗДЕЛ В РАЗРАБОТКЕ</p>
            <h2>Параметры напоминания</h2>
          </div>
        </div>
        <p className="stub-text">
          Заглушка компонента настройки уведомлений: здесь пользователь сможет выбрать время
          предварительного напоминания (за 5, 15 или 30 минут), звук и повтор уведомления.
        </p>
      </section>
    </div>
  )
}
