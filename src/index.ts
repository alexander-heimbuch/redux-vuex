import type { App, Plugin } from 'vue'
import type { ActionCreatorsMapObject, Store } from 'redux'
import { provide as provideStore } from './provide-store.js'
import { mapState } from './map-state.js'
import { mapActions } from './map-actions.js'

import { injectStore, injectActions, storeToken, actionsToken } from './tokens.js'

export {
  provideStore,
  mapState,
  mapActions,
  storeToken,
  actionsToken,
  injectStore,
  injectActions
}

export default function reduxVuex (store: Store, actions?: ActionCreatorsMapObject): Plugin {
  return {
    install(app: App) {
      app.provide(storeToken, store);
      app.provide(actionsToken, actions);
    }
  }
}
