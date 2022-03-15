declare module '@lottiefiles/lottie-interactivity' {
  type Action = {
    visibility?: number[]
    type?: string
    frames?: number[] | string
  }

  interface Options {
    player: string
    mode: 'cursor' | 'scroll' | 'chain'
    actions: Action[]
  }

  export const create: (options: Options) => void
}
