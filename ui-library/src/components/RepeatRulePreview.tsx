import type { RepeatMode } from '../types'
import './components.css'

export interface RepeatRulePreviewProps {
  repeat: RepeatMode
  taskTitle?: string
}

const repeatDescriptions: Record<RepeatMode, string> = {
  none: 'Однократная задача без автоматического повтора.',
  daily: 'Задача повторяется ежедневно в указанное время.',
  weekdays: 'Задача повторяется с понедельника по пятницу.',
  weekly: 'Задача повторяется еженедельно в выбранный день.',
}

const repeatTitles: Record<RepeatMode, string> = {
  none: 'Без повтора',
  daily: 'Каждый день',
  weekdays: 'По будням',
  weekly: 'Раз в неделю',
}

export function RepeatRulePreview({ repeat, taskTitle }: RepeatRulePreviewProps) {
  return (
    <article className="repeat-preview">
      <div className="repeat-preview__header">
        <span className="repeat-badge">
          <span aria-hidden="true">↻</span> {repeatTitles[repeat]}
        </span>
        {taskTitle && <strong className="repeat-preview__title">{taskTitle}</strong>}
      </div>
      <p className="repeat-preview__description">{repeatDescriptions[repeat]}</p>
    </article>
  )
}
