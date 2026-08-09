import { UserRound } from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { sectionLinks, sectionTitles, ui } from '@/data/home'
import { anchors } from '@/data/nav'
import { experienceLabel, trainers } from '@/data/trainers'

/**
 * Фотографий тренеров нет — вместо картинки компонент-заглушка
 * (docs/CONTENT.md). Поле photo в типе уже есть, значение null.
 *
 * До 1024px карточки листаются свайпом в одну строку — колонка из четырёх
 * карточек растянула бы главную (CLAUDE.md, п.7).
 */
export function Trainers() {
  return (
    <section id={anchors.trainers} className="section pt-0 lg:pt-0">
      <div className="container-luna">
        <SectionTitle title={sectionTitles.trainers} link={sectionLinks.trainers} />
      </div>

      <div className="container-luna mt-8 lg:mt-10">
        <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-4 lg:overflow-visible">
          {trainers.map((trainer, index) => (
            <Reveal
              as="li"
              key={trainer.id}
              delay={index * 70}
              className="flex w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-auto"
            >
              <Card href={trainer.href} direction="row" className="min-h-[248px] w-full">
                {trainer.photo ? null : (
                  <div className="flex w-[44%] shrink-0 flex-col items-center justify-center gap-3 bg-panel-2 px-3 py-6 text-center">
                    <UserRound
                      size={52}
                      strokeWidth={1.1}
                      className="text-green"
                      aria-hidden
                    />
                    <span className="max-w-[13ch] font-sans text-[11px] leading-tight text-muted">
                      {ui.trainerPhotoStub}
                    </span>
                  </div>
                )}

                <div className="flex flex-1 flex-col justify-center p-5">
                  <h3 className="font-display text-h3 font-bold uppercase leading-snug text-text">
                    {trainer.firstName}
                    <br />
                    {trainer.lastName}
                  </h3>
                  <p className="mt-4 font-sans text-caption text-muted">
                    {trainer.speciality}
                  </p>
                  <p className="mt-2 font-sans text-caption text-muted">
                    {experienceLabel(trainer.experienceYears)}
                  </p>
                </div>
              </Card>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
