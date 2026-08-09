import { Atmosphere } from '@/components/sections/Atmosphere'
import { Benefits } from '@/components/sections/Benefits'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { Directions } from '@/components/sections/Directions'
import { Hero } from '@/components/sections/Hero'
import { Pricing } from '@/components/sections/Pricing'
import { Reviews } from '@/components/sections/Reviews'
import { Trainers } from '@/components/sections/Trainers'

/** Порядок секций менять нельзя — TASKS.md, этап 2 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <Directions />
      <Atmosphere />
      <CtaBanner />
      <Trainers />
      <Reviews />
      <Pricing />
    </>
  )
}
