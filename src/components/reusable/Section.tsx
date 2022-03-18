import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import clsx from 'clsx'

import { currentSectionState } from 'core/store'
import { Sections } from 'types/enums'

type Props = {
  id: Sections
  withHeading?: boolean
}

export const Section: React.FC<Props> = ({ children, id, withHeading }) => {
  const setCurrentSection = useSetRecoilState(currentSectionState)

  useEffect(() => {
    const observeElement = document.getElementById(id)

    if (observeElement) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
              setCurrentSection(id)
            }
          })
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.8,
        }
      )
      observer.observe(observeElement)

      return () => {
        observer.unobserve(observeElement)
      }
    }
  }, [id, setCurrentSection])

  return (
    <section
      className="min-h-screen container flex flex-col mx-auto pt-[102px] px-[16px] pb-[80px] md:pb-[60px] lg:px-[200px] transition-all"
      id={id}
    >
      <div className={clsx('select-none h-full flex items-center gap-[16px] mb-[20px]', { hidden: !withHeading })}>
        <div className="w-[40px] h-[3px] rounded-[5px] bg-primary dark:bg-dark-primary" />
        <span className="font-bold text-[24px] leading-[36px] text-secondary dark:text-slate-300">{id}</span>
      </div>

      {children}
    </section>
  )
}
