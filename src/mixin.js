import set from 'set-value'
import mapState from './map-state'

export const connect = ({ Vue, store, actions = {} }) => {
  const syncStateWithComponent = (component, bindings) => () => {
    const state = store.getState()

    Object.keys(bindings).forEach(prop => {
      const getter = bindings[prop]

      if (!getter) {
        return
      }

      set(component._data, prop, getter(state))
    })
  }

  Vue.mixin({
    beforeCreate () {
      this.store = store
      this.$$actions = actions

      this.mapState = (...props) => mapState(props).call(this)
    },
    created () {
      // Root component should not interact with the store
      if (!this.$root) {
        return
      }

      // If the helper methods (mapState) registered store bindings, create subscriptions
      if (this.$$bindings) {
        this.unsubscribe = store.subscribe(
          syncStateWithComponent(this, this.$$bindings)
        )
      }
    },
    beforeDestroy () {
      this.unsubscribe && this.unsubscribe()
    }
  })
}
