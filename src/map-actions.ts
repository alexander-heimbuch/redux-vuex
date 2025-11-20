import { injectStore } from './tokens.js'
import { ActionCreatorsMapObject, UnknownAction } from 'redux'

type BoundActionCreator<A extends UnknownAction, P extends any[]> = (...args: P) => A

export function mapActions<A extends UnknownAction, P extends any[]>(
  params: ActionCreatorsMapObject<A, P>
) {
  const store = injectStore()

  return Object.entries(params).reduce(
    (result, [key, fn]) => {
      return {
        ...result,
        [key]: (...args: P) => store.dispatch(fn.apply(null, args))
      }
    },
    {} as Record<keyof typeof params, BoundActionCreator<A, P>>
  )
}
