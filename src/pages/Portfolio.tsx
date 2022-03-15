import { useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Scrollbar from 'smooth-scrollbar'

import { useWindowResize } from 'hooks/useWindowResize'
import { easeInOutCubic } from 'utils/easing'
import { Sections } from 'types/enums'

import { Background } from 'components/Background'
import { NavBar } from 'components/Navbar'
import { Section } from 'components/Section'
import { Contacts } from 'components/Contacts'
import { About } from './portfolio/About'

const Portfolio: React.FC = () => {
  useWindowResize()

  const location = useLocation()
  const navigate = useNavigate()
  const containerRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<Scrollbar>()

  function scrollTo(elementId: Sections) {
    const element = document.getElementById(elementId)

    if (scrollRef.current && element) {
      scrollRef.current.scrollTo(0, element.offsetTop, 250, { easing: easeInOutCubic })
    }
  }

  function onBrandClick() {
    if (location.pathname !== '/') {
      navigate('/')
    } else {
      scrollTo(Sections.About)
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
    [Sections.Projects]: null,
  }
  const sections = Object.values(Sections).map((section) => ({
    label: section,
    withHeading: withHeadingSections.indexOf(section) > -1,
    content: sectionBody[section],
    onClick: () => scrollTo(section),
  }))

  return (
    <Background>
      <NavBar onBrandClick={onBrandClick} navBarItems={sections.map(({ label, onClick }) => ({ label, onClick }))} />

      <Contacts />

      <main className="h-screen" ref={containerRef}>
        {sections.map(({ label, withHeading, content }) => (
          <Section key={label} id={label} withHeading={withHeading}>
            {content}
          </Section>
        ))}
      </main>
    </Background>
  )
}

export default Portfolio
