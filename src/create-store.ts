import { provide } from '@vue/runtime-core'

import { ProvideStoreOptions } from './types'
import { storeToken, actionsToken } from './tokens'

export function provideStore(options: ProvideStoreOptions) {
  provide(storeToken, options.store)
  provide(actionsToken, options.actions || {})
}
