# redux-vuex

[Redux](https://github.com/reduxjs/redux) bindings for [VueJS](https://github.com/vuejs/vue) inspired by [Vuex](https://github.com/vuejs/vuex).

## 👉 [For the old Vue 2 version check out the legacy branch](https://github.com/alexander-heimbuch/redux-vuex/tree/legacy) 👈

## First things first

### Why don't you use vuex instead?

Redux and vuex are really hard to compare. Vuex is a state management pattern that clearly defines each subject of the state lifecycle. For most of the projects this helps a lot structuring your application but it also leaves a large architectural footprint.

Redux on the other hand is very adaptable to different scenarios giving you the ability to customize everything around state management like handling side effects (see [redux-effects](https://github.com/redux-effects/redux-effects), [redux-saga](https://github.com/redux-saga/redux-saga) or [redux-thunk](https://github.com/reduxjs/redux-thunk)) or even adapting full application flows like [rematch](https://github.com/rematch/rematch).

### Yay, yet another redux lib for VueJS

Valid point, it seems the needs for integrating with redux is strong. So depending on your requirements you may want to use:

- [vuejs-redux](https://github.com/titouancreach/vuejs-redux) if you want provider bindings like react-redux
- [vdeux](https://gitlab.com/citygro/vdeux) if you want a different kind of component bindings
- [revue](https://yarnpkg.com/en/package/revue) also for nice store bindings but unfortunately its dead :(

## Installation

`redux-vuex` is written in pure es6 and only has dependencies to the beautiful crafted packages [get-value](https://github.com/jonschlinkert/get-value) and [set-value](https://github.com/jonschlinkert/set-value)

### Get the Package

```
npm i redux-vuex@next // yarn add redux-vuex
```

### Connect it to your Vue application

```javascript
import { createApp } from 'vue'
import { provideStore } from 'redux-vuex'

import App from './App.vue'
import { store, actions } from './store'

const app = createApp(App)

provideStore({
  app,
  store,
  actions
})

app.mount('#app')
```

## Usage

`redux-vuex` is focused on simplifying the access to the redux state and bind state changes to the vue instance in an efficient way.

### mapState

To assign state with ease to your component `mapState` needs to be used. It has two different signatures, depending on your component needs:

#### Automatic

If you want a 1:1 relationship between your redux store's state property names and your vue component's data then pass the names of these properties from redux as string arguments to `mapState`:

```javascript
import { mapState } from 'redux-vuex'

export default {
  name: 'My Vue Component',
  setup() {
    return mapState('users', 'todos') // maps state.users and state.todos to data.users and data.todos
  }
}
```

#### Custom property names

Alternatively, if you provide an object to mapState you can specify data property names.

```javascript
import { mapState } from 'redux-vuex'

export default {
  name: 'My Vue Component',
  setup() {
    return mapState({
      users: 'users', // maps state.users to data.users
      todoList: 'todos' // maps state.todos to data.todoList
    })
  }
}
```

#### Single property

You can pass a function that has access to the state object if you want to

```javascript
import { mapState } from 'redux-vuex'

export default {
  name: 'My Vue Component',
  setup() {
    return mapState({
      state: (state) => ({ todoList: state.todos, users: state.users }) // maps state.todos to data.state.todoList and state.users to data.state.users
    })
  }
}
```

You can use the last two methods together like so

```javascript
import { mapState } from 'redux-vuex'

export default {
  name: 'My Vue Component',
  setup() {
    return mapState({
      users: 'users', // maps state.users to data.users
      todoList: (state) => state.todos // maps state.todos to data.todoList
    })
  }
}
```

Note: using the object notation gives you the ability to use [store selectors](https://github.com/reduxjs/redux/blob/b3f1c1699293ee7d0f185c24ea45957ff865bfca/examples/shopping-cart/reducers/index.js#L10-L37).

### mapActions

For a more convenient action dispatching `mapActions` can be used. To use this helper you need to pass in the actions in the `connect` function (see above):

```javascript
const actions = {
  foo: payload => {
    type: 'FOO', payload
  },

  bar: () => {
    type: 'BAR', payload: { bar: 'baz' }
  }
}
```

```javascript
import { mapActions } from 'redux-vuex'

export default {
  name: 'My Vue component',
  setup() {
    return mapActions('foo', 'bar') // creates scoped functions for foo and bar action
  }
  mounted() {
    this.foo('baz') // will dispatch { type: 'FOO', payload: 'baz' }
  }
}
```

If you need to dispatch multiple actions in one method (or want to assign different names), use the object notation:

```javascript
import { mapActions } from 'redux-vuex'

export default {
  name: 'My Vue component',
  setup() {
     return mapActions({
        baz: ({ dispatch, actions }, arg1, arg2) => {
          dispatch(actions.foo(arg2))
          dispatch(actions.bar())
        }
     })
  }
  mounted() {
    this.baz('foo', 'bar') // will dispatch foo and bar actions
  }
}
```

### store

Finally, if you need direct access to the store, each component has a binding to the store assigned:

```javascript
import { inject } from 'vue'
import { injectStore, injectActions } from 'redux-vuex'

export default {
  name: 'My Vue component',
  setup() {
    const store = injectStore()
    const actions = injectActions()

    store.subscribe(() => {
      console.log(store.getState())
    })

    store.dispatch({
      type: 'foo',
      payload: 'bar'
    })
  }
}
```

### Caveats

If you return more than the `mapState` from the setup make sure to bind the result to a dedicated property. Otherwise the Vue proxies won't work 😑

```javascript
import { mapState } from 'redux-vuex'

export default {
  name: 'My Vue Component',
  setup() {
    return {
      state: mapState({
        users: 'users', // maps state.users to data.users
        todoList: (state) => state.todos // maps state.todos to data.todoList
      }),
      ...mapActions('foo', 'bar')
    }
  }
}
```

## How it works

- `provideStore` provides the redux store for composable components
- `mapState` creates a reference binding form the redux store
- Each Vue Component with bindings creates a store subscription
- On each state change all bindings are evaluated and update
- Only the mapped properties are retrieved from store and setted

## License

[MIT](http://opensource.org/licenses/MIT)
