import { createStore, combineReducers } from 'redux'

let nextTodoId = 0

export const actions = {
  setVisibilityFilter: (filter: string) => ({
    type: 'SET_VISIBILITY_FILTER',
    payload: { filter }
  }),
  toggleTodo: (id: string) => ({
    type: 'TOGGLE_TODO',
    payload: { id }
  }),
  addTodo: (text: string) => ({
    type: 'ADD_TODO',
    payload: {
      id: nextTodoId++,
      text
    }
  }),
  addTodos: (texts: string[]) => ({
    type: 'ADD_TODOS',
    payload: texts.map(text => ({
      id: nextTodoId++,
      text
    }))
  })
}

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

const todos = (state: State["todos"] = [], action: {type: string, payload: Partial<State['todos'][number]>}) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.payload.id,
          text: action.payload.text,
          completed: false
        }
      ]
    case 'ADD_TODOS':
      return [
        ...state,
        ...action.payload.map(({id, text}) => ({
          id,
          text,
          completed: false
        }))
      ]
    case 'TOGGLE_TODO':
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
      )
    default:
      return state
  }
}

const visibilityFilter = (state = VisibilityFilters.SHOW_ALL, action: {type: string; payload: string}) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.payload
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
