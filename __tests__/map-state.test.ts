import { createApp } from 'vue'
import { createStore } from 'redux'

import { provide as provideStore } from '../src/provide-store'
import { mapState } from '../src/map-state'

import { reducers, actions, State } from './store'

describe('mapState()', () => {
  let store

  beforeEach(() => {
    store = createStore(reducers)
  })

  const testSetup = (...args) => {
    const TestComponent = {
      template: '<div>Test Componente</div>',
      props: [],
      setup() {
        return mapState.apply(null, args)
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

  test('should support a simple store binding', () => {
    const data = testSetup('visibilityFilter')
    expect(data['visibilityFilter']).toEqual('SHOW_ALL')
    store.dispatch(actions.setVisibilityFilter('SHOW_COMPLETED'))
    expect(data['visibilityFilter']).toEqual('SHOW_COMPLETED')
  })

  test('should support a nested store binding', () => {
    const data = testSetup({ firstTodoText: 'todos.0.text' })
    store.dispatch(actions.addTodo('foobar'))
    expect(data['firstTodoText']).toEqual('foobar')
  })

  test('should support a function binding', () => {
    const data = testSetup({ todoList: (state: State) => state.todos.map(({ text }) => text) })
    store.dispatch(actions.addTodo('foo'))
    store.dispatch(actions.addTodo('bar'))
    expect(data['todoList']).toEqual(['foo', 'bar'])
  })
})
