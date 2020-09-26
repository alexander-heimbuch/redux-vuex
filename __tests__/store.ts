import { createStore, combineReducers } from 'redux'

let nextTodoId = 0

export const actions = {
  setVisibilityFilter: (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
  }),
  toggleTodo: (id) => ({
    type: 'TOGGLE_TODO',
    id
  }),
  addTodo: (text) => ({
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  })
}

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      )
    default:
      return state
  }
}

const visibilityFilter = (state = VisibilityFilters.SHOW_ALL, action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

export const reducers = combineReducers({ todos, visibilityFilter })

export interface State {
  visibilityFilter: 'SHOW_ALL' | 'SHOW_COMPLETED' | 'SHOW_ACTIVE'
  todos: { id: number; text: string; completed: boolean }[]
}

export interface Actions {
  setVisibilityFilter?: () => void
  toggleTodo?: () => void
  addTodo?: () => void
}
