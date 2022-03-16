import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'

import { currentSectionState, powerModeState } from 'core/store'

import { ReactComponent as FocusOrnament } from 'assets/svg/focus-ornament.svg'
import { ReactComponent as IconMenu } from 'assets/svg/menu.svg'
import { Sections } from 'types/enums'

type Props = {
  scrollTo: (elementId: Sections) => void
}

export const NavigationItems: React.FC<Props> = ({ scrollTo }) => {
  const navigate = useNavigate()

  const activeItem = useRecoilValue(currentSectionState)
  const { status } = useRecoilValue(powerModeState)

  const navBarItems = [
    ...Object.values(Sections).map((section) => ({
      label: section,
      onClick: () => scrollTo(section),
    })),
    ...(status === 'activated' ? [{ label: 'Playground', onClick: () => navigate('/playground') }] : []),
  ]

  const totalItems = navBarItems.length
  const borderRightPosition = (totalItems - 1 - navBarItems.findIndex((item) => item.label === activeItem)) * 110 + 10

  return (
    <>
      <div className="relative flex md:hidden justify-end items-center">
        <Menu>
          <Menu.Button className="min-w-[70px] h-[70px] flex justify-center items-center focus:outline-none text-primary dark:text-dark-primary">
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
            <Menu.Items className="overflow-hidden absolute right-[5px] origin-top-right hover:outline-none rounded-md mt-[30px] bg-dark-primary">
              {navBarItems.map((item) => (
                <Menu.Item key={item.label}>
                  <button
                    className={clsx('w-full h-[40px] flex justify-center items-center px-[20px]', {
                      'bg-primary dark:bg-gray-500': item.label === activeItem,
                      'text-gray-900': item.label !== activeItem,
                    })}
                    onClick={item.onClick}
                    disabled={item.label === activeItem}
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
            className="min-w-[100px] h-[30px] flex justify-center items-center px-[10px]"
            key={item.label}
            onClick={item.onClick}
            disabled={item.label === activeItem}
          >
            <span
              className={clsx('text-[16px] leading-[24px] font-medium transition-all', {
                'hover:text-gray-300': item.label !== activeItem,
              })}
            >
              {item.label}
            </span>
          </button>
        ))}

        {totalItems > 0 && (
          <div
            className="pointer-events-none w-[90px] h-[30px] absolute transition-all duration-200 text-primary dark:text-dark-primary transition-all"
            style={{ right: borderRightPosition }}
          >
            <FocusOrnament />
          </div>
        )}
      </div>
    </>
  )
}
