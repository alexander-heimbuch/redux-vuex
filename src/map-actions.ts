import { injectStore } from './tokens.js'
import type { ActionCreator } from 'redux'

type BoundActionCreator<C, P extends any[]> = (...args: P) => C

export function mapActions<A, P extends any[], T extends Record<keyof T, ActionCreator<A, P>>>(
  params: T
) {
  const store = injectStore()

  return Object.entries(params).reduce(
    (result, [key, fn]: [string, ActionCreator<A, P>]) => {
      return {
        ...result,
        [key]: (...args: P) => store.dispatch(fn.apply(null, args))
      }
    },
    {} as { [K in keyof T]: BoundActionCreator<ReturnType<T[K]>, Parameters<T[K]>> }
  )
}
