import { describe, expect, test } from '@jest/globals'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { AppRoutes } from '../src/AppRoutes'
import { TasksProvider } from '../src/context/TasksProvider'

function renderWithRoute(initialEntry = '/') {
  return render(
    <TasksProvider>
      <MemoryRouter initialEntries={[initialEntry]}>
        <AppRoutes />
      </MemoryRouter>
    </TasksProvider>,
  )
}

describe('каркас курсового приложения', () => {
  test('показывает план на день, задачи и сводку на главной странице', () => {
    renderWithRoute('/')
    expect(screen.getByRole('heading', { name: 'План на день' })).toBeInTheDocument()
    expect(screen.getByText('Утренняя зарядка')).toBeInTheDocument()
    const morningTask = screen.getByText('Утренняя зарядка').closest('article')

    expect(morningTask).toHaveTextContent('Каждый день')
    expect(screen.getByText('1 из 5 задач выполнено')).toBeInTheDocument()
    expect(screen.getByText('Уведомления вкл.')).toBeInTheDocument()
  })

  test('переходит на страницу создания задачи и добавляет новую задачу', () => {
    renderWithRoute('/')
    fireEvent.click(screen.getByRole('link', { name: 'Новая задача' }))
    expect(screen.getByRole('heading', { name: 'Новая задача' })).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('Название задачи'), { target: { value: 'Сделать лабораторную' } })
    fireEvent.change(screen.getByLabelText('Время'), { target: { value: '11:20' } })
    fireEvent.click(screen.getByRole('button', { name: /Добавить задачу/ }))
    expect(screen.getByRole('heading', { name: 'Сделать лабораторную' })).toBeInTheDocument()
    expect(screen.getByText('11:20')).toBeInTheDocument()
  })

  test('обновляет отметку выполнения и сводку на главной странице', () => {
    renderWithRoute('/')
    fireEvent.click(screen.getByRole('checkbox', { name: 'Отметить задачу «Подготовить план на день» как выполненную' }))
    expect(screen.getByText('2 из 5 задач выполнено')).toBeInTheDocument()
  })

  test('открывает параметризованный маршрут задачи, страницу повторов, уведомлений и 404', () => {
    renderWithRoute('/tasks/task-1')
    expect(screen.getByRole('heading', { name: 'Утренняя зарядка' })).toBeInTheDocument()
    expect(screen.getByText('Правило повторения')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Вернуть в план' }))
    expect(screen.getByText('Запланирована')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('link', { name: 'Повторы' }))
    expect(screen.getByRole('heading', { name: /Повторяющиеся задачи/ })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('link', { name: 'Уведомления' }))
    expect(screen.getByRole('heading', { name: 'Уведомления на сегодня' })).toBeInTheDocument()
  })

  test('показывает сообщение, если задача по id не найдена', () => {
    renderWithRoute('/tasks/non-existent')
    expect(screen.getByRole('heading', { name: /не найдена/ })).toBeInTheDocument()
  })

  test('показывает страницу 404 для неизвестного маршрута', () => {
    renderWithRoute('/unknown-page')
    expect(screen.getByRole('heading', { name: 'Страница не найдена' })).toBeInTheDocument()
  })
})
