import { ActionCreatorsMapObject, Store } from 'redux'
import { provideStore, provideActions } from './tokens'
import { App } from 'vue'

interface ProvideStoreOptions {
  store: Store
  actions?: ActionCreatorsMapObject
  app?: App<any>
}

export function provide(options: ProvideStoreOptions) {
  provideStore(options.store, options.app)
  provideActions(options.actions, options.app)
}
