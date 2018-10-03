# redux-vuex
[Redux](https://github.com/reduxjs/redux) bindings for [VueJS](https://github.com/vuejs/vue) inspired by [Vuex](https://github.com/vuejs/vuex).

## First things first

### Why don't you use vuex instead?

Redux and vuex are really hard to compare. Vuex is a state management pattern that clearly defines each subject of the state lifecycle. For most of the projects this helps a lot structuring your application but it also leaves a large architectural footprint.

Redux on the other hand is very adaptable to different scenarios giving you the ability to customize everything around state management like handling side effects (see [redux-effects](https://github.com/redux-effects/redux-effects), [redux-saga](https://github.com/redux-saga/redux-saga) or [redux-thunk](https://github.com/reduxjs/redux-thunk)) or even adapting full application flows like [rematch](https://github.com/rematch/rematch).

### Yay, yet another redux lib for VueJS

Valid point, it seems the needs for integrating with redux is strong. So depending on your requirements you may want to use:

* [vuejs-redux](https://github.com/titouancreach/vuejs-redux) if you want provider bindings like react-redux
* [vdeux](https://gitlab.com/citygro/vdeux) if you want a different kind of component bindings
* [revue](https://yarnpkg.com/en/package/revue) also nice for store bindings but unfortunately it's dead :(

## Installation

`redux-vuex` is written in pure es6 and only has dependencies to the beautiful crafted packages [get-value](https://github.com/jonschlinkert/get-value) and [set-value](https://github.com/jonschlinkert/set-value)

You can get the library as pure es6 modules as well in a UMD format.

### Get the Package

```
npm i redux-vuex // yarn add redux-vuex
```

### Connect it to your Vue application

```javascript
import Vue from 'vue'
import { createStore } from 'redux'
import { connect } from 'redux-vuex'

import { reducers, actions } from './store'

const store = createStore(reducers)

connect({
  Vue,
  store,
  actions // optional
})
```

## Usage

`redux-vuex` is focused on simplifying the access to the redux state and bind state changes to the vue instance in an efficient way. 

### mapState

To assign state with ease to your component `mapState` needs to be used. It has two different signatures, depending on your component needs:

```javascript
import { mapState } from 'redux-vuex'

export default {
  name: 'My Vue Component',
  data: mapState('foo', 'bar') // maps state.foo and state.bar to data.foo and data.bar
}
```

```javascript
import { mapState } from 'redux-vuex'

export default {
  name: 'My Vue Component',
  data: mapState({
    foo: 'bar', // maps state.foo to data.foo
    bar: state => state.bar // maps state.bar to data.bar
  }) 
}
```

In case you need to define additional data attributes you need to use the component pre bound `mapState`:

```javascript
export default {
  name: 'My Vue Component',
  data () {
    return {
      baz: 10
      ...this.mapState({
        baz: function (state) {
          return state.bar + this.baz //maps state.bar + 10 to data.baz
        }
      })
    }
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
  methods: mapActions('foo', 'bar'), // creates scoped functions for foo and bar action
  mounted () {
    this.foo('baz') // will dispatch { type: 'FOO', payload: 'baz' }
  }
}
```

If you need to dispatch multiple actions in one method (or want to assign different names), use the object notation:

```javascript
import { mapActions } from 'redux-vuex'

export default {
  name: 'My Vue component',
  methods: mapActions({
    baz: ({ dispatch, actions }, arg1, arg2) => {
      dispatch(actions.foo(arg2))
      dispatch(actions.bar())
    }
  }),
  mounted () {
    this.baz('foo', 'bar') // will dispatch foo and bar actions
  }
}
```

If you need to define your own methods, you still can use the spread operator:

```javascript
import { mapActions } from 'redux-vuex'

export default {
  name: 'My Vue component',
  methods: {
    ...mapActions('baz'),
    foo () {
      // do something
    }
  }
}
```

### store

Finally, if you need direct access to the store, each component has a binding to the store assigned:

```javascript
export default {
  name: 'My Vue component',
  mounted () {
    this.store.subscribe(() => {
      console.log(this.store.getState())
    })

    this.store.dispatch({
      type: 'foo',
      payload: 'bar'
    })
  }
}
```

## How it works

* `mapState` creates a state binding on the component called `$$bindings`
* Each Vue Component with bindings creates a store subscription
* On each state change all bindings are evaluated and update the assigned data attributes
* Only the mapped properties are retrieved from store and setted

## Caveats

* Can't use computed values like in vuex, vuex can bind to it's reactive state, for redux that's not efficiently possible
* Accessing other mapped values in custom getters does not work on initial cycle

## License

[MIT](http://opensource.org/licenses/MIT)
