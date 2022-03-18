import { useEffect, useMemo, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import Parallax from 'parallax-js'
import clsx from 'clsx'

import { windowDimensionState } from 'core/store'

import { ReactComponent as Circle } from 'assets/svg/circle.svg'
import { ReactComponent as Rectangle } from 'assets/svg/rectangle.svg'
import { ReactComponent as Square } from 'assets/svg/square.svg'

enum DecorationType {
  Circle = 'circle',
  Rectangle = 'rectangle',
  Square = 'square',
}

const decoration = {
  [DecorationType.Circle]: Circle,
  [DecorationType.Rectangle]: Rectangle,
  [DecorationType.Square]: Square,
}

type Props = {
  offset?: number
  decorations?: number
  decorationTypes?: DecorationType[]
  decorationColors?: string[]
}

export const Background: React.FC<Props> = ({
  children,
  offset = 0.1,
  decorations = 10,
  decorationTypes = [DecorationType.Circle, DecorationType.Rectangle, DecorationType.Square],
  decorationColors = ['#FF2E00', '#05FF00', '#FFB400', '#0047FF'],
}) => {
  const { width, height } = useRecoilValue(windowDimensionState)

  const scene = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<Parallax>()

  const decorationsConfig = useMemo(() => {
    const totalDecorationTypes = decorationTypes.length
    let sum = 0

    return decorationTypes.map((type, index) => {
      if (totalDecorationTypes === 1) {
        return { type, Component: decoration[type], total: decorations }
      } else if (index === totalDecorationTypes - 1) {
        return { type, Component: decoration[type], total: decorations - sum }
      } else {
        const total = Math.ceil(Math.random() * (decorations / totalDecorationTypes))

        sum += total

        return {
          type,
          Component: decoration[type],
          total,
        }
      }
    })
  }, [decorationTypes, decorations])

  useEffect(() => {
    if (scene.current && parallaxRef.current === undefined && width >= 768) {
      const parallaxInstance = new Parallax(scene.current, { hoverOnly: true })

      parallaxRef.current = parallaxInstance

      return () => {
        parallaxInstance.destroy()
        parallaxRef.current = undefined
      }
    }
  }, [width])

  return (
    <div
      className={clsx(
        'no-scrollbar w-full h-screen relative overflow-hidden transition-all',
        'bg-[linear-gradient(158.86deg,#1c2a34_10.36%,#111a20_49.58%,#111a20_49.58%)]',
        'dark:bg-[linear-gradient(158.86deg,#0f172a_10.36%,#000000_49.58%,#000000_49.58%)]'
      )}
    >
      <div className="w-full h-full absolute opacity-70" ref={scene}>
        {decorationsConfig.map(({ type, Component, total }) => (
          <div
            className="w-full h-full"
            key={type}
            data-depth={(Math.random() * (0.8 - 0.2) + 0.2) * (Math.random() < 0.5 ? -1 : 1)}
          >
            {Array.from({ length: total }, (_, index) => (
              <div
                key={index}
                className="absolute"
                style={{
                  left: ~~(Math.random() * (width * (1 - offset * 2)) + width * offset),
                  top: ~~(Math.random() * (height * (1 - offset * 2)) + height * offset),
                }}
              >
                <Component
                  className={clsx('dark:!stroke-dark-primary', {})}
                  style={{ stroke: decorationColors[~~(Math.random() * decorationColors.length)] }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {children}
    </div>
  )
}
