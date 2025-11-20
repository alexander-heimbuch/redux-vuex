import { Store, createStore, combineReducers, ActionCreatorsMapObject } from 'redux'
import { inject, provide, App } from 'vue'

export const storeToken = '$ReduxVuexStoreToken$'
export const actionsToken = '$ReduxVuexActionsToken$'

export const provideStore = (store: Store, app?: App<any>) => {
  if (!store) {
    throw new Error('[redux-vuex]: store is not defined')
  }

  if (app) {
    app.provide(storeToken, store)
  } else {
    provide(storeToken, store)
  }
}

export const provideActions = (actions?: ActionCreatorsMapObject, app?: App<any>) => {
  if (!actions) {
    return
  }

  if (app) {
    app.provide(actionsToken, actions)
  } else {
    provide(actionsToken, actions)
  }
}

export const injectStore = (): Store => {
  const store = inject(storeToken) as Store

  if (!store) {
    console.warn(`[redux-vuex]: couldn't find a store, make sure you have provided it`)

    return createStore(combineReducers({}))
  }

  return store
}

export const injectActions = () => inject(actionsToken, {})
