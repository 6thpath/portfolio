import { ReactComponent as FocusOrnament } from 'assets/svg/focus-ornament.svg'
import { useRecoilValue } from 'recoil'

import { currentSectionState } from 'core/store'
import { information } from 'data/information'

type NavBarItem<T> = {
  label: T
  handleClick: () => void
}

export type Props<T> = {
  handleBrandClick?: () => void
  navBarItems: NavBarItem<T>[]
}

export const NavBar = <T extends string>({ handleBrandClick, navBarItems }: Props<T>): React.ReactElement | null => {
  const currentSection = useRecoilValue(currentSectionState)

  const totalItems = navBarItems.length
  const borderRightPosition = (totalItems - 1 - navBarItems.findIndex((item) => item.label === currentSection)) * 100

  return (
    <header className="container h-[60px] fixed top-[30px] right-0 left-0 flex justify-between items-center mx-auto px-[16px] z-10">
      <div className="flex justify-start items-center gap-[10px] bg-black">
        <div
          className="cursor-pointer w-[60px] h-[60px] flex justify-center items-center bg-primary"
          onClick={handleBrandClick}
        >
          <span className="select-none font-secondary font-bold text-[14px] leading-[20px] text-white">
            {information.tagName}
          </span>
        </div>
      </div>

      <div className="relative hidden md:flex justify-end items-center gap-[10px]">
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

        {totalItems > 0 && (
          <div
            className="pointer-events-none w-[90px] h-[30px] absolute transition-all duration-200"
            style={{ right: borderRightPosition }}
          >
            <FocusOrnament />
          </div>
        )}
      </div>
    </header>
  )
}
