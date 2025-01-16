import { test, expect } from 'vitest';
import { createApp } from 'vue'
import { createStore } from 'redux'

import reduxVuex from '../src/'
import { injectStore, injectActions } from '../src/tokens'
import { reducers, actions } from './store'

test('should use store and actions as plugin', () => new Promise<void>((resolve) => {
  const store = createStore(reducers)

  const TestComponent = {
    template: '<div>Test Component</div>',
    props: [],
    setup() {
      const reduxStore = injectStore()
      const storeActions = injectActions()

      expect(reduxStore).toEqual(store)
      expect(storeActions).toEqual(actions)
      resolve()
    }
  }

  const AppComponent = {
    template: '<test-component></test-component>',
    props: [],
    components: { TestComponent }
  }

  const app = createApp(AppComponent)

  app.use(reduxVuex(store, actions))
  app.mount('body')
}));
