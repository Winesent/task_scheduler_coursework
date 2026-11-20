import { BrowserRouter } from 'react-router-dom'

import { AppRoutes } from './AppRoutes'
import { TasksProvider } from './context/TasksProvider'

export default function App() {
  return (
    <TasksProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TasksProvider>
  )
}
