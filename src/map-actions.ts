import { objectMapper, applyMappers } from './helper.js'

import { MapOptions } from './types.js'
import { injectStore, injectActions } from './tokens.js'

export function mapActions(...args: MapOptions) {
  const store = injectStore()
  const actions = injectActions()

  const defaultAction = (key: string) => {
    const action = actions[key]

    if (!action) {
      console.warn(`[redux-vuex] action ${key} is not defined`)
      return
    }

    return (...args: any[]) => store.dispatch(action(...args))
  }

  const customAction = (fn: Function) => (...args: any[]) => {
    fn.apply(null, [Object.assign({}, store, { actions }), ...args])
  }

  const mappers = objectMapper(args)

  return applyMappers(mappers, (_, value) =>
    typeof value === 'string' ? defaultAction(value) : customAction(value)
  )
}
