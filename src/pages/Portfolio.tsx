import { useRef, useEffect } from 'react'

import Scrollbar from 'smooth-scrollbar'

import { useWindowResize } from 'hooks/useWindowResize'
import { easeInOutCubic } from 'utils/easing'
import { Sections } from 'types/enums'

import { ReusableBackground, ReusableSection } from 'components/reusable'
import { NavBar } from 'components/NavBar'
import { Contacts } from 'components/Contacts'
import { About } from 'pages/portfolio/About'
import { Projects } from 'pages/portfolio/Projects'

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

  useEffect(() => {
    if (containerRef.current) {
      const scroll = Scrollbar.init(containerRef.current, { damping: 0.05 })

      scrollRef.current = scroll

      return () => {
        scroll.destroy()
        scrollRef.current = undefined
      }
    }
  }, [])

  const withHeadingSections = [Sections.Projects]
  const sectionBody = {
    [Sections.About]: <About />,
    [Sections.Projects]: <Projects />,
  }
  const sections = Object.values(Sections).map((section) => ({
    label: section,
    withHeading: withHeadingSections.indexOf(section) > -1,
    content: sectionBody[section],
  }))

  return (
    <ReusableBackground>
      <NavBar scrollTo={scrollTo} />

      <Contacts />

      <main className="h-screen" ref={containerRef}>
        {sections.map(({ label, withHeading, content }) => (
          <ReusableSection key={label} id={label} withHeading={withHeading}>
            {content}
          </ReusableSection>
        ))}
      </main>
    </ReusableBackground>
  )
}

export default Portfolio
