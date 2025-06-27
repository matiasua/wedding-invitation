// src/components/MainContent.jsx
import Hero from '@/pages/Hero'
import Events from '@/pages/Events'
import Location from '@/pages/Location'
import Gifts from '@/pages/Gifts'
import Wishes from '@/pages/Wishes'

export default function MainContent() {
  return (
    <div className="bg-background min-h-screen">
      <Hero />
      <Events />
      <Location />
      <Gifts />
      <Wishes />
    </div>
  )
}
