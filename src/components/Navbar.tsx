import { ReactComponent as FocusOrnament } from 'assets/svg/focus-ornament.svg'
import { useRecoilValue } from 'recoil'
import clsx from 'clsx'
import { Menu, Transition } from '@headlessui/react'

import { currentSectionState } from 'core/store'
import { information } from 'data/information'

import { ReactComponent as MenuIcon } from 'assets/svg/menu.svg'

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
    <header className="container h-[60px] fixed top-[16px] md:top-[30px] right-0 left-0 flex justify-between items-center mx-auto px-[16px] z-10 transition-all">
      <div className="flex justify-start items-center">
        <div
          className="cursor-pointer w-[60px] h-[60px] flex justify-center items-center rounded-[2px] bg-primary"
          onClick={handleBrandClick}
        >
          <span className="select-none font-secondary font-bold text-[14px] leading-[20px] text-white">
            {information.tagName}
          </span>
        </div>
      </div>

      <div>
        <div className="relative flex md:hidden justify-end items-center">
          <Menu>
            <Menu.Button className="w-[60px] h-[60px] flex justify-center items-center text-primary">
              <MenuIcon width={40} height={40} />
            </Menu.Button>

            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-50 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-50 opacity-0"
            >
              <Menu.Items className="overflow-hidden absolute right-[5px] origin-top-right mt-[30px] bg-white rounded-md">
                {navBarItems.map((item) => (
                  <Menu.Item key={item.label}>
                    <button
                      className={clsx('w-full h-[40px] flex justify-center items-center px-[20px]', {
                        'text-white bg-primary': item.label === currentSection,
                      })}
                      onClick={item.handleClick}
                      disabled={item.label === currentSection}
                    >
                      <span className="font-medium text-[16px] leading-[24px]">{item.label}</span>
                    </button>
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
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
      </div>
    </header>
  )
}
