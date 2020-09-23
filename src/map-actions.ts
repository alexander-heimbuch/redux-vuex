import { inject } from '@vue/runtime-core'
import { Store } from 'redux'

import { objectMapper, applyMappers } from './helper'

import { MapOptions, Actions } from './types'
import { storeToken, actionsToken } from './tokens'

export function mapActions(...args: MapOptions) {
  const reduxStore = inject(storeToken) as Store
  const actions = inject(actionsToken) as Actions

  const defaultAction = (key: string) => {
    const action = actions[key]

    if (!action) {
      console.warn(`[redux-vuex] action ${action} is not defined`)
      return
    }

    return (...args: any[]) => reduxStore.dispatch(action(...args))
  }

  const customAction = (fn: Function) => (...args: any[]) => {
    fn.apply(null, [Object.assign({}, reduxStore, { actions }), ...args])
  }

  const mappers = objectMapper(args)

  return applyMappers(mappers, (_, value) =>
    typeof value === 'string' ? defaultAction(value) : customAction(value)
  )
}
