import { atom } from 'recoil'

import { Sections } from 'types/enums'

export const uiState = atom({
  key: 'ui/section',
  default: {
    currentSection: Sections.About,
  },
})
