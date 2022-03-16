import { useState, useEffect, useRef } from 'react'
import lottie, { AnimationItem } from 'lottie-web'
import clsx from 'clsx'

import watchingEye from 'assets/lottie/white-eye.json'
import { Transition } from '@headlessui/react'

type Props = {
  onClick?: () => void
}

enum BrandingType {
  Logo,
  Text,
}

function randomBrandingType(logoRate = 0.3) {
  return Math.random() < logoRate ? BrandingType.Logo : BrandingType.Text
}

export const Branding: React.FC<Props> = ({ onClick }) => {
  const logoNodeRef = useRef<HTMLDivElement>(null)
  const animatedLogoRef = useRef<AnimationItem>()
  const [brandingType, setBrandingType] = useState<BrandingType>(randomBrandingType(0.5))

  useEffect(() => {
    if (brandingType === BrandingType.Logo) {
      if (logoNodeRef.current) {
        if (!animatedLogoRef.current) {
          const animated = lottie.loadAnimation({
            container: logoNodeRef.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: watchingEye,
            name: 'watchingEye',
          })
          animated.setSpeed(0.25)
          animated.addEventListener('enterFrame', () => {
            if (animated.currentFrame >= 51) {
              setBrandingType(randomBrandingType())
            }
          })
          animatedLogoRef.current = animated

          animated.goToAndPlay(4, true)
        } else {
          animatedLogoRef.current.goToAndPlay(4, true)
        }
      }
    } else {
      if (animatedLogoRef.current) {
        animatedLogoRef.current.goToAndStop(4, true)
      }

      const interval = setInterval(() => {
        setBrandingType(randomBrandingType())
      }, 20 * 1_000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [brandingType])

  return (
    <div
      className={clsx(
        'cursor-pointer select-none w-[70px] h-[70px] flex flex-col justify-center items-center',
        'rounded-[2px] hover:rounded-[6px] transition-all duration-75 ease-in',
        'font-secondary font-bold text-[13px] leading-[18px] text-white bg-primary'
      )}
      onClick={onClick}
    >
      <Transition
        show={brandingType === BrandingType.Text}
        enter="transition duration-75 ease-out"
        enterFrom="transform scale-0 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition-none"
        leaveFrom="hidden"
        leaveTo="hidden"
        className="origin-center"
      >
        <sixth-path />
      </Transition>

      <div className={brandingType !== BrandingType.Logo ? 'hidden' : ''} ref={logoNodeRef} />
    </div>
  )
}
