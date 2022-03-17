import { useLocation, useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import debounce from 'lodash.debounce'

import { powerModeState } from 'core/store'
import { Sections } from 'types/enums'

import { Branding } from './Branding'
import { PowerSwitch } from './PowerSwitch'
import { NavigationItems } from './NavigationItems'

type Props = {
  scrollTo: (elementId: Sections) => void
}

export const NavBar: React.FC<Props> = ({ scrollTo }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const setPowerMode = useSetRecoilState(powerModeState)

  const debouncedScrollTo = debounce(scrollTo, 300)

  function onBrandClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.detail === 1) {
      if (location.pathname !== '/') {
        navigate('/')
      } else {
        debouncedScrollTo(Sections.About)
      }
    } else if (event.detail === 2) {
      debouncedScrollTo.cancel()
    } else if (event.detail === 5) {
      if (!document.documentElement.classList.contains('dark')) {
        setPowerMode({ activated: true, level: 0 })
      }
    }
  }

  return (
    <header className="select-none container fixed top-[16px] md:top-[30px] inset-x-0 z-10 flex justify-between items-center mx-auto px-[16px] transition-all">
      <Branding onClick={onBrandClick} />

      <PowerSwitch />

      <NavigationItems scrollTo={scrollTo} />
    </header>
  )
}
