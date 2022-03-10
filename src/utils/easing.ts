export function easeInOutCubic(position: number) {
  if ((position /= 0.5) < 1) {
    return 0.5 * Math.pow(position, 3)
  }

  return 0.5 * (Math.pow(position - 2, 3) + 2)
}
