import { atom } from 'recoil'

export const powerModeState = atom<{ activated: boolean; level?: number }>({
  key: 'ee/powerMode',
  default: {
    activated: false,
    level: undefined,
  },
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        if (newValue.activated) {
          setTimeout(() => {
            document.documentElement.classList.add('dark')
          }, 300)
        } else {
          document.documentElement.classList.remove('dark')
        }
      })
    },
  ],
})
