import { describe, expect, test } from '@jest/globals'
import { render, screen } from '@testing-library/react'

import { RepeatRulePreview } from '../src/components/RepeatRulePreview'

describe('RepeatRulePreview', () => {
  test('показывает правило повтора и название задачи', () => {
    render(<RepeatRulePreview repeat="weekdays" taskTitle="Планёрка" />)
    expect(screen.getByText('По будням')).toBeInTheDocument()
    expect(screen.getByText('Планёрка')).toBeInTheDocument()
    expect(screen.getByText('Задача повторяется с понедельника по пятницу.')).toBeInTheDocument()
  })

  test('работает без названия задачи', () => {
    render(<RepeatRulePreview repeat="none" />)
    expect(screen.getByText('Без повтора')).toBeInTheDocument()
    expect(screen.getByText('Однократная задача без автоматического повтора.')).toBeInTheDocument()
  })
})
