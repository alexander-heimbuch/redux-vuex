import { describe, beforeEach, test, expect, vi } from 'vitest'
import { createApp } from 'vue'

import { provide as provideStore } from '../src/provide-store'
import { mapActions } from '../src/map-actions'

import { createStore } from 'redux'
import { reducers, actions, State } from './store'

describe('mapActions()', () => {
  let store

  beforeEach(() => {
    store = createStore(reducers)
  })

  const testSetup = (...args: any) => {
    const TestComponent = {
      template: '<div>Test Componente</div>',
      props: [],
      setup() {
        return mapActions.apply(null, args)
      }
    }

    const app = createApp(TestComponent)

    provideStore({
      store,
      actions,
      app
    })

    return app.mount('body')
  }

  test('should provide access to actions', () => {
    const methods = testSetup('addTodo')

    expect(methods['addTodo']).toBeDefined()
  })

  test('should fire an action if called', () => new Promise<void>((resolve) => {
    const methods = testSetup('addTodo', 'toggleTodo')

    store.subscribe(() => {
      const state: State = store.getState()
      expect(state.todos[0].text).toEqual('TEST')
      resolve()
    })

    methods['addTodo']('TEST')
  }));

  test('should remap actions', () => new Promise<void>((resolve) => {
    const methods = testSetup({ foo: 'addTodo', bar: 'toggleTodo' })

    store.subscribe(() => {
      const state: State = store.getState()
      expect(state.todos[0].text).toEqual('TEST')
      resolve()
    })

    methods['foo']('TEST')
  }));

  test('should provide store and actions to custom functions', () => new Promise<void>((resolve) => {
    const methods = testSetup({
      baz: ({ getState, actions }, arg) => {
        expect(getState()).toEqual(store.getState())
        expect(Object.keys(actions).includes('addTodo')).toBe(true)
        expect(Object.keys(actions).includes('toggleTodo')).toBe(true)
        expect(Object.keys(actions).includes('setVisibilityFilter')).toBe(true)
        expect(arg).toEqual('TEST')
        resolve()
      }
    })

    methods['baz']('TEST')
  }));

  test('should warn if an action is not provided', () => {
    console.warn = vi.fn()
    testSetup('notAvailable')
    expect(console.warn).toHaveBeenCalledWith('[redux-vuex] action notAvailable is not defined')
  })
})
