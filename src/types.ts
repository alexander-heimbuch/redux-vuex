import { App } from 'vue'
import { Store } from 'redux'

export interface ProvideStoreOptions {
  store: Store
  actions?: Actions
  app?: App<any>
}

export interface Mappers {
  [key: string]: string | Function
}

export interface Actions {
  [key: string]: Function
}

export type MapOptions = [Mappers] | string[] | string[][]
export interface PropertyMappers {
  [key: string]: Function
}
