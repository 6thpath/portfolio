import { ReactComponent as ButtonBorder } from 'assets/svg/button-border.svg'
import { useRecoilValue } from 'recoil'

import { uiState } from 'core/store'
import { Sections } from 'types/enums'
import { information } from 'data/information'

export const NavBar: React.FC = () => {
  const { currentSection } = useRecoilValue(uiState)

  function scrollTo(idOrOffset: Sections | number) {
    if (typeof idOrOffset === 'number') {
      return window.scrollTo({ top: idOrOffset, behavior: 'smooth' })
    }

    const element = document.getElementById(idOrOffset)

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navBarItems = [
    {
      label: Sections.About,
      handleClick: () => scrollTo(0),
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

  const borderRightPosition = (3 - navBarItems.findIndex((item) => item.label === currentSection)) * 100

  return (
    <header className="sticky top-[30px] container mx-auto h-[60px] flex justify-between items-center transition-all">
      <div className="flex justify-start items-center gap-[10px]">
        <div className="cursor-pointer w-[60px] h-[60px] flex justify-center items-center bg-primary">
          <span className="font-secondary font-bold text-[14px] leading-[20px] text-white">{information.tagName}</span>
        </div>
      </div>

      <div className="relative flex j_ustify-end items-center gap-[10px]">
        {navBarItems.map((item) => (
          <button
            className="min-w-[90px] h-[30px] flex justify-center items-center px-[10px]"
            key={item.label}
            onClick={item.handleClick}
            disabled={item.label === currentSection}
          >
            <span className="font-medium text-[16px] leading-[24px] text-white">{item.label}</span>
          </button>
        ))}

        <div
          className="pointer-events-none w-[90px] h-[30px] absolute transition-all duration-200"
          style={{ right: borderRightPosition }}
        >
          <ButtonBorder />
        </div>
      </div>
    </header>
  )
}
