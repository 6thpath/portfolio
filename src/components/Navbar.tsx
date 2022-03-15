import { ReactComponent as FocusOrnament } from 'assets/svg/focus-ornament.svg'
import { useRecoilValue } from 'recoil'
import clsx from 'clsx'
import { Menu, Transition } from '@headlessui/react'

import { currentSectionState } from 'core/store'

import { ReactComponent as IconMenu } from 'assets/svg/menu.svg'

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
    <header className="container h-[60px] fixed top-[16px] md:top-[30px] inset-x-0 z-10 flex justify-between items-center mx-auto px-[16px] transition-all">
      <div className="flex justify-start items-center">
        <div
          className="cursor-pointer select-none w-[60px] h-[60px] flex justify-center items-center rounded-[2px] font-secondary font-bold text-[12px] leading-[16px] text-white bg-primary"
          onClick={handleBrandClick}
        >
          <sixth-path />
        </div>
      </div>

      <div>
        <div className="relative flex md:hidden justify-end items-center">
          <Menu>
            <Menu.Button className="w-[60px] h-[60px] flex justify-center items-center focus:outline-none text-primary">
              <IconMenu width={40} height={40} />
            </Menu.Button>

            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-50 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-50 opacity-0"
            >
              <Menu.Items className="overflow-hidden absolute right-[5px] origin-top-right hover:outline-none rounded-md mt-[30px] bg-white">
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
              <span
                className={clsx('text-[16px] leading-[24px] text-white transition-all', {
                  'font-medium hover:text-gray-300': item.label !== currentSection,
                  'font-semibold': item.label === currentSection,
                })}
              >
                {item.label}
              </span>
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
