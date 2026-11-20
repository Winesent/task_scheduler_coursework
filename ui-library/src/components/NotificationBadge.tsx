import './components.css'

export interface NotificationBadgeProps {
  count: number
  enabled?: boolean
}

export function NotificationBadge({ count, enabled = true }: NotificationBadgeProps) {
  return (
    <span
      className={`notification-badge${enabled ? ' notification-badge--active' : ''}`}
      aria-label={`Напоминания: ${enabled ? 'включены' : 'отключены'}, активных: ${count}`}
    >
      <span aria-hidden="true">{enabled ? '🔔' : '🔕'}</span>
      <span>{enabled ? 'Уведомления вкл.' : 'Уведомления выкл.'}</span>
      <span className="notification-badge__count">{count}</span>
    </span>
  )
}
