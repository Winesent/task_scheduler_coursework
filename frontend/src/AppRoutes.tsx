import { Route, Routes } from 'react-router-dom'

import { MainLayout } from './layouts/MainLayout'
import { CreateTaskPage } from './pages/CreateTaskPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { NotificationsPage } from './pages/NotificationsPage'
import { RepeatsPage } from './pages/RepeatsPage'
import { TaskDetailsPage } from './pages/TaskDetailsPage'
import { TodayPage } from './pages/TodayPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<TodayPage />} />
        <Route path="tasks/new" element={<CreateTaskPage />} />
        <Route path="tasks/:taskId" element={<TaskDetailsPage />} />
        <Route path="repeats" element={<RepeatsPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
