import get from 'get-value'
import { Store } from 'redux'
import { inject, reactive, ref, UnwrapRef, onUnmounted } from '@vue/runtime-core'

import { storeToken } from './tokens'
import { objectMapper, applyMappers } from './helper'
import { MapOptions, PropertyMappers } from './types'

export function mapState(...args: MapOptions) {
  const defaultGetter = (prop: string) => (state: { [key: string]: any }) => get(state, prop)

  const store = inject(storeToken) as Store

  const mappers = objectMapper(args)
  const getters: PropertyMappers = applyMappers(mappers, (_, value) =>
    typeof value === 'string' ? defaultGetter(value) : value
  )
  const bindings: UnwrapRef<any> = reactive(applyMappers(mappers, (prop) => ref(prop)))

  const updateBindings = () => {
    Object.keys(mappers).forEach((prop) => {
      bindings[prop] = getters[prop].call(null, store.getState())
    })
  }

  updateBindings()

  const unsubscribe = store.subscribe(updateBindings)

  onUnmounted(unsubscribe)

  return bindings
}
