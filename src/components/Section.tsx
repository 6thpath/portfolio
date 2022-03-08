import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { Sections } from 'types/enums'
import { uiState } from 'core/store'

type Props = {
  id: Sections
}

export const Section: React.FC<Props> = ({ id }) => {
  const setCurrentSection = useSetRecoilState(uiState)

  useEffect(() => {
    const observeElement = document.getElementById(id)

    if (observeElement) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio >= 0.8) {
              setCurrentSection((state) => ({ ...state, currentSection: id }))
            }
          })
        },
        {
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
    <section id={id} className="h-[100vh]">
      {id}
    </section>
  )
}
