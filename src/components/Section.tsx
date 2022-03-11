import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { currentSectionState } from 'core/store'
import { Sections } from 'types/enums'

type Props = {
  id: Sections
}

export const Section: React.FC<Props> = ({ id }) => {
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
    <section className="h-screen" id={id}>
      {id}
    </section>
  )
}
