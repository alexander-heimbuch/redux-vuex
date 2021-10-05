import * as set from 'set-value'
import mapState from './map-state'

export const connect = ({ app, store, actions = {}, binding = 'store' }) => {
  if (!store) {
    console.warn(`[redux-vuex]: No store attatched, please provide an redux-store to the connector`)
    return
  }

  const syncStateWithComponent = (component, bindings) => () => {
    const state = store.getState()

    Object.keys(bindings).forEach((prop) => {
      const getter = bindings[prop]

      if (!getter) {
        return
      }

      set(component._data, prop, getter(state))
    })
  }

  app.mixin({
    beforeCreate() {
      this.REDUX_VUEX_STORE = binding

      if (!this[this.REDUX_VUEX_STORE]) {
        this[this.REDUX_VUEX_STORE] = store
      }

      if (!this.REDUX_VUEX_ACTIONS) {
        this.REDUX_VUEX_ACTIONS = actions
      }

      this.mapState = (...props) => mapState(...props).call(this)
    },
    created() {
      // Root component should not interact with the store
      if (!this.$root) {
        return
      }

      // If the helper methods (mapState) registered store bindings, create subscriptions
      if (this.REDUX_VUEX_BINDINGS) {
        this.unsubscribe = store.subscribe(syncStateWithComponent(this, this.REDUX_VUEX_BINDINGS))
      }
    },
    beforeUnmount() {
      this.unsubscribe && this.unsubscribe()
    }
  })
}
