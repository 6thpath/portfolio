import { useEffect, useMemo, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import Parallax from 'parallax-js'

import styles from './background.module.css'

import { windowDimensionState } from 'core/store'

import { ReactComponent as Circle } from 'assets/svg/circle.svg'
import { ReactComponent as Rectangle } from 'assets/svg/rectangle.svg'
import { ReactComponent as Square } from 'assets/svg/square.svg'

enum DecorationType {
  Circle = 'circle',
  Rectangle = 'rectangle',
  Square = 'square',
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

  const ratio = 1 / decorationTypes.length
  const totalCircles = useMemo(() => Math.ceil(Math.random() * (decorations * ratio)), [decorations, ratio])
  const totalRectangles = useMemo(() => Math.ceil(Math.random() * (decorations * ratio)), [decorations, ratio])
  const totalSquares = useMemo(
    () => decorations - totalCircles - totalRectangles,
    [decorations, totalCircles, totalRectangles]
  )

  const decorationsConfig = useMemo(
    () =>
      [
        { type: DecorationType.Circle, Component: Circle, total: totalCircles },
        { type: DecorationType.Rectangle, Component: Rectangle, total: totalRectangles },
        { type: DecorationType.Square, Component: Square, total: totalSquares },
      ].filter(({ type, total }) => decorationTypes.indexOf(type) > -1 && total > 0),
    [totalCircles, totalRectangles, totalSquares, decorationTypes]
  )

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
    <div className={styles['_container']}>
      <div className=" w-full h-full absolute opacity-70" ref={scene}>
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
                <Component stroke={decorationColors[~~(Math.random() * decorationColors.length)]} />
              </div>
            ))}
          </div>
        ))}
      </div>

      {children}
    </div>
  )
}
