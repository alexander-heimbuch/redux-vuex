import { provide } from '@vue/runtime-core'

import { ProvideStoreOptions } from './types'
import { storeToken, actionsToken } from './tokens'

export function provideStore(options: ProvideStoreOptions) {
  if (options.app) {
    options.app.provide(storeToken, options.store)
    options.app.provide(actionsToken, options.actions || {})
  } else {
    provide(storeToken, options.store)
    provide(actionsToken, options.actions || {})
  }
}
