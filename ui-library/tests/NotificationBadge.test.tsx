import { describe, expect, test } from '@jest/globals'
import { render, screen } from '@testing-library/react'

import { NotificationBadge } from '../src/components/NotificationBadge'

describe('NotificationBadge', () => {
  test('отображает активный статус и количество уведомлений', () => {
    render(<NotificationBadge count={3} enabled />)
    expect(screen.getByText('Уведомления вкл.')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  test('отображает отключённый статус по явному параметру', () => {
    render(<NotificationBadge count={0} enabled={false} />)
    expect(screen.getByText('Уведомления выкл.')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })
})
