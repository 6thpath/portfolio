import { atom } from 'recoil'

type powerModeStaus = 'off' | 'activating' | 'activated'

export const powerModeState = atom<{ status: powerModeStaus; level?: number }>({
  key: 'ee/powerMode',
  default: {
    status: 'off',
    level: undefined,
  },
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        if (newValue.status === 'activating') {
          document.documentElement.classList.add('dark')
        } else if (newValue.status === 'off') {
          document.documentElement.classList.remove('dark')
        }
      })
    },
  ],
})
