import { Store } from 'redux'

export interface ProvideStoreOptions {
  store: Store
  actions?: Actions
}

export interface Mappers {
  [key: string]: string | Function
}

export interface Actions {
  [key: string]: Function
}

export type MapOptions = [Mappers] | string[]

export interface PropertyMappers {
  [key: string]: Function
}
