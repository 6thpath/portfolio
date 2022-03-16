declare module '@lottiefiles/lottie-interactivity' {
  type Action = {
    visibility?: number[]
    type?: string
    frames?: number[] | string
    forceFlag?: boolean
  }

  interface Options {
    player: string | object
    mode: 'cursor' | 'scroll' | 'chain'
    actions: Action[]
  }

  export const create: (options: Options) => void
}
