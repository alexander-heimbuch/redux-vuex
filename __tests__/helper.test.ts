import { describe, test, expect } from 'vitest';
import { objectMapper, applyMappers } from '../src/helper'

describe('objectMapper()', () => {
  test('should transform plain objects', () => {
    const result = objectMapper([
      {
        foo: 'bar',
        bar: 'baz'
      }
    ])

    expect(result).toEqual({
      foo: 'bar',
      bar: 'baz'
    })
  })

  test('should transform an array of strings', () => {
    const result = objectMapper(['foo', 'bar', 'baz'])

    expect(result).toEqual({
      foo: 'foo',
      bar: 'bar',
      baz: 'baz'
    })
  })
})

describe('applyMappers()', () => {
  test('should apply a string modifier to an object', () => {
    const result = applyMappers(
      {
        foo: 'bar'
      },
      (key, value) => [key, value]
    )

    expect(result).toEqual({
      foo: ['foo', 'bar']
    })
  })

  test('should apply a function modifier to an object', () => {
    const result = applyMappers(
      {
        foo: () => 'bar'
      },
      (_, value) => value()
    )

    expect(result).toEqual({
      foo: 'bar'
    })
  })
})
