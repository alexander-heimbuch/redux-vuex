import { ProvideStoreOptions } from './types'
import { provideStore, provideActions } from './tokens'

export function provide(options: ProvideStoreOptions) {
  provideStore(options.store, options.app)
  provideActions(options.actions, options.app)
}
