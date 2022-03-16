import { useRecoilState } from 'recoil'
import { useEffect, useRef } from 'react'
import Lottie, { AnimationItem } from 'lottie-web'
import clsx from 'clsx'

import { powerModeState } from 'core/store'
import dayNight from 'assets/lottie/day-night.json'

export const PowerSwitch: React.FC = () => {
  const [{ status }, setPowerMode] = useRecoilState(powerModeState)

  const containerRef = useRef<HTMLDivElement>(null)
  const animatedLogoRef = useRef<AnimationItem>()

  function onTogglePowerMode() {
    if (animatedLogoRef.current) {
      animatedLogoRef.current.goToAndPlay(50, true)
    }
  }

  useEffect(() => {
    if (containerRef.current) {
      if (status === 'activating') {
        const animated = Lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop: false,
          autoplay: false,
          animationData: dayNight,
          name: 'dayNight',
        })
        animated.setSpeed(1.5)

        animated.addEventListener('enterFrame', () => {
          if (animated.currentFrame >= 48 && animated.currentFrame < 50) {
            animated.pause()
            setPowerMode({ status: 'activated', level: 0 })
          } else if (animated.currentFrame >= 100) {
            setPowerMode({ status: 'off' })
          }
        })

        animatedLogoRef.current = animated

        animated.goToAndPlay(0, true)
      } else if (status === 'off') {
        if (animatedLogoRef.current) {
          animatedLogoRef.current.destroy()
          animatedLogoRef.current = undefined
        }
      }
    }
  }, [status, setPowerMode])

  return (
    <div
      className={clsx('cursor-pointer h-[70px]', { hidden: status === 'off' })}
      ref={containerRef}
      onClick={onTogglePowerMode}
    />
  )
}
