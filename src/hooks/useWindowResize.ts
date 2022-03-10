import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import debounce from 'lodash.debounce'

import { windowDimensionState } from 'core/store'

export const useWindowResize = () => {
  const setWindowState = useSetRecoilState(windowDimensionState)

  useEffect(() => {
    const handleResize = () => {
      setWindowState({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    const debouncedHandleResize = debounce(handleResize, 1000)

    window.addEventListener('resize', debouncedHandleResize)

    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, [setWindowState])
}
