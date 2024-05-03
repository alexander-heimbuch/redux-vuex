import { ProvideStoreOptions } from './types.js'
import { provideStore, provideActions } from './tokens.js'

export function provide(options: ProvideStoreOptions) {
  provideStore(options.store, options.app)
  provideActions(options.actions, options.app)
}
