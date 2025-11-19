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

  test('should remap actions', () => new Promise<void>((resolve) => {
    const methods = testSetup({ addTodo: actions.addTodo, toggleTodo: actions.toggleTodo })

    store.subscribe(() => {
      const state: State = store.getState()
      expect(state.todos[0].text).toEqual('TEST')
      resolve()
    })

    methods.addTodo('TEST')
  }));

  test('should remap actions', () => new Promise<void>((resolve) => {
    const methods = testSetup({ addTodos: actions.addTodos })

    store.subscribe(() => {
      const state: State = store.getState()
      expect(state.todos[0].text).toEqual('TEST1')
      expect(state.todos[1].text).toEqual('TEST2')
      expect(state.todos[2].text).toEqual('TEST3')
      resolve()
    })

    methods.addTodos(['TEST1', 'TEST2', 'TEST3'])
  }))
})
