import { atom } from 'recoil'

import { Sections } from 'types/enums'

// ? Portfolio
export const currentSectionState = atom({
  key: 'ui/portfolio/currentSection',
  default: Sections.About,
})

export const windowDimensionState = atom({
  key: 'ui/windowDimension',
  default: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
})
