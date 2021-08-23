const defaultAction = (action) =>
  function (...args) {
    if (!this.REDUX_VUEX_ACTIONS[action]) {
      return
    }

    return this[this.REDUX_VUEX_STORE].dispatch(this.REDUX_VUEX_ACTIONS[action].apply(this, args))
  }

const customAction = (fn) =>
  function (...args) {
    return fn.apply(this, [
      Object.assign({}, this[this.REDUX_VUEX_STORE], { actions: this.REDUX_VUEX_ACTIONS }),
      ...args
    ])
  }

const simpleActions = (actions) =>
  [].concat.apply([], actions).reduce(
    (result, action) =>
      Object.assign({}, result, {
        [action]: defaultAction(action)
      }),
    {}
  )

const objectMappers = (actions = {}) =>
  Object.keys(actions).reduce(
    (result, name) =>
      Object.assign({}, result, {
        [name]:
          typeof actions[name] === 'function'
            ? customAction(actions[name])
            : defaultAction(actions[name])
      }),
    {}
  )

/**
 * maps redux actions to methods
 * @param {*} actions array / strings / mapper object
 */
export default (...actions) => {
  const [obj] = actions

  /**
   * mapState({ foo: 'bar', foo: (dispatch, actions) => dispatch(actions.foo('bar')) })
   */

  if (!Array.isArray(obj) && typeof obj === 'object') {
    return objectMappers(obj)
  }

  /**
   * mapAction(['foo', 'bar', 'baz']) \\ mapAction('foo', 'bar', 'baz')
   */
  return simpleActions(actions)
}
