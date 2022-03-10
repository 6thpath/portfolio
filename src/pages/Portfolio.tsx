import { useRef, useEffect, useMemo } from 'react'

import Scrollbar from 'smooth-scrollbar'

import { useWindowResize } from 'hooks/useWindowResize'
import { easeInOutCubic } from 'utils/easing'

import { Background } from 'components/Background'
import { NavBar } from 'components/Navbar'
import { Section } from 'components/Section'
import { Sections } from 'types/enums'

const Portfolio: React.FC = () => {
  useWindowResize()

  const containerRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<Scrollbar>()

  function scrollTo(elementId: Sections) {
    const element = document.getElementById(elementId)

    if (scrollRef.current && element) {
      scrollRef.current.scrollTo(0, element.offsetTop, 250, { easing: easeInOutCubic })
    }
  }

  const sections = useMemo(
    () => [
      {
        label: Sections.About,
        handleClick: () => scrollTo(Sections.About),
      },
      {
        label: Sections.Projects,
        handleClick: () => scrollTo(Sections.Projects),
      },
      {
        label: Sections.Resume,
        handleClick: () => scrollTo(Sections.Resume),
      },
      {
        label: Sections.Contact,
        handleClick: () => scrollTo(Sections.Contact),
      },
    ],
    []
  )

  useEffect(() => {
    if (containerRef.current) {
      const scroll = Scrollbar.init(containerRef.current, { damping: 0.05 })

      scrollRef.current = scroll

      return () => {
        scroll.destroy()
        scrollRef.current = undefined
      }
    }
  }, [sections])

  return (
    <Background>
      <NavBar navBarItems={sections.map(({ label, handleClick }) => ({ label, handleClick }))} />

      <main className="h-screen" ref={containerRef}>
        {sections.map((section) => (
          <Section key={section.label} id={section.label} />
        ))}
      </main>
    </Background>
  )
}

export default Portfolio
