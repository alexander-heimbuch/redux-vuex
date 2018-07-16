import get from 'get-value'

const defaultGetter = prop => state => get(state, prop)

const simpleMappers = (props, getter) => function () {
  const slices = [].concat.apply([], props)
  const state = this.store.getState()

  this.$$bindings = slices.reduce((result, prop) => Object.assign({}, result, {
    [prop]: getter(prop)
  }), this.$$bindings || {})

  return slices.reduce((result, prop) => Object.assign({}, result, {
    [prop]: getter(prop)(state)
  }), {})
}

const objectMappers = (obj, fallbackGetter) => function () {
  const slices = Object.keys(obj)
  const state = this.store.getState()

  this.$$bindings = slices.reduce((result, prop) => Object.assign({}, result, {
    [prop]: typeof obj[prop] === 'function' ? obj[prop].bind(this) : fallbackGetter(obj[prop])
  }), this.$$bindings || {})

  return slices.reduce((result, prop) => Object.assign({}, result, {
    [prop]: typeof obj[prop] === 'function' ?
      obj[prop].call(this, state) :
      fallbackGetter(obj[prop])(state)
  }), {})
}

/**
* maps redux state to data attributes
* @param {*} props array / strings / mapper object
*/
export default (...props) => {
  const [obj] = props

  /**
   * mapState({ foo: 'bar', foo: state => state('bar') })
   */

  if (!Array.isArray(obj) && typeof obj === 'object') {
    return objectMappers(obj, defaultGetter)
  }

  /**
   * mapState(['foo', 'bar', 'baz']) \\ mapState('foo', 'bar', 'baz')
   */
  return simpleMappers(props, defaultGetter)
}
