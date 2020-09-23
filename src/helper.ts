import { MapOptions, PropertyMappers, Mappers } from './types'

export const objectMapper = (props: MapOptions): PropertyMappers => {
  const [obj] = props

  /**
   * mapState({ foo: 'bar', foo: state => state('bar') })
   */
  if (!Array.isArray(obj) && typeof obj === 'object') {
    return Object.keys(obj).reduce((result, prop) => {
      const value = obj[prop]

      return {
        ...result,
        [prop]: value
      }
    }, {})
  }

  const args = props as string[]
  /**
   * mapState(['foo', 'bar', 'baz']) \\ mapState('foo', 'bar', 'baz')
   */
  return [].concat(args).reduce(
    (result, prop) => ({
      ...result,
      [prop]: prop
    }),
    {}
  )
}

export const applyMappers = (
  mappers: Mappers,
  modifier: (key: string, value: string | Function) => any
) =>
  Object.keys(mappers).reduce((result, key) => {
    const value = mappers[key]
    return {
      ...result,
      [key]: modifier(key, value)
    }
  }, {})
