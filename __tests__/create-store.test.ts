import { describe, test, expect } from 'vitest';
import { createApp } from 'vue'
import { createStore } from 'redux'
import { mount } from '@vue/test-utils'

import { injectStore, injectActions } from '../src/tokens'
import { provide as provideStore } from '../src/provide-store'
import { reducers, actions } from './store'

describe('provideStore()', () => {
  test('should provide store and actions on root level', () => new Promise<void>((resolve) => {
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

    provideStore({
      store,
      actions,
      app
    })

    app.mount('body')
  }));


  test('should provide store and actions on component level', () => new Promise<void>((resolve) => {
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
      components: { TestComponent },
      setup() {
        provideStore({
          store,
          actions
        })
      }
    }

    const app = createApp(AppComponent)
    app.mount('body')
  }));
});
