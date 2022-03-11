import { useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Scrollbar from 'smooth-scrollbar'

import { useWindowResize } from 'hooks/useWindowResize'
import { easeInOutCubic } from 'utils/easing'
import { Sections } from 'types/enums'

import { Background } from 'components/Background'
import { NavBar } from 'components/Navbar'
import { Section } from 'components/Section'

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

  const sections = [
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
  ]

  return (
    <Background>
      <NavBar
        handleBrandClick={onBrandClick}
        navBarItems={sections.map(({ label, handleClick }) => ({ label, handleClick }))}
      />

      <main className="h-screen" ref={containerRef}>
        {sections.map((section) => (
          <Section key={section.label} id={section.label} />
        ))}
      </main>
    </Background>
  )
}

export default Portfolio
