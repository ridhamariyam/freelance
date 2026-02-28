import { useState, useCallback } from 'react'

const READ_KEY = 'lb_notif_read'

export const NOTIFICATIONS = [
  {
    id: 'n1',
    title: 'New startup added in AI',
    body: 'NeuralDraft just joined — AI writing tools for founders.',
    time: '2m ago',
    icon: '🚀',
  },
  {
    id: 'n2',
    title: 'Your listing got 12 views',
    body: 'People are checking out your submission today.',
    time: '1h ago',
    icon: '👀',
  },
  {
    id: 'n3',
    title: 'Trending in Climate Tech',
    body: 'Verdant is gaining traction this week.',
    time: '3h ago',
    icon: '📈',
  },
  {
    id: 'n4',
    title: 'New resource available',
    body: 'Y Combinator application guide is now live.',
    time: '5h ago',
    icon: '📚',
  },
  {
    id: 'n5',
    title: 'Community post trending',
    body: '"How we grew to 1,000 users" — 47 reactions.',
    time: '1d ago',
    icon: '💬',
  },
  {
    id: 'n6',
    title: 'Weekly digest ready',
    body: '6 new startups joined Launchbase this week.',
    time: '2d ago',
    icon: '📧',
  },
  {
    id: 'n7',
    title: 'New service listing',
    body: 'DesignPro Studio is now accepting projects.',
    time: '3d ago',
    icon: '🎨',
  },
]

function loadRead() {
  try {
    return new Set(JSON.parse(localStorage.getItem(READ_KEY) || '[]'))
  } catch {
    return new Set()
  }
}

export function useNotifications() {
  const [readIds, setReadIds] = useState(loadRead)

  const markRead = useCallback((id) => {
    setReadIds((prev) => {
      const next = new Set(prev)
      next.add(id)
      localStorage.setItem(READ_KEY, JSON.stringify([...next]))
      return next
    })
  }, [])

  const markAllRead = useCallback(() => {
    const all = new Set(NOTIFICATIONS.map((n) => n.id))
    localStorage.setItem(READ_KEY, JSON.stringify([...all]))
    setReadIds(all)
  }, [])

  const unreadCount = NOTIFICATIONS.filter((n) => !readIds.has(n.id)).length

  return { notifications: NOTIFICATIONS, readIds, unreadCount, markRead, markAllRead }
}
