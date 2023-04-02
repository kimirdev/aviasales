export const BY_PRICE = 'byPrice'
export const BY_DURATION = 'byDuration'
export const OPTIMAL = 'optimal'

export function getSortMethod(method) {
  switch (method) {
    case BY_PRICE:
      return (prev, next) => prev.price - next.price
    case BY_DURATION:
      return (prev, next) => {
        const prevDur = prev.segments.reduce((pr, cur) => pr + cur.duration, 0)
        const nextDur = next.segments.reduce((pr, cur) => pr + cur.duration, 0)
        return prevDur - nextDur
      }
    case OPTIMAL:
      return (prev, next) => {
        const prevDur = prev.segments.reduce((pr, cur) => pr + cur.duration, 0)
        const nextDur = next.segments.reduce((pr, cur) => pr + cur.duration, 0)
        return prevDur - nextDur + prev.price - next.price
      }
    default:
      return () => true
  }
}
