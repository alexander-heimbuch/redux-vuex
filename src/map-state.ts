import { ref, UnwrapRef, onUnmounted, reactive, Ref } from 'vue'
import { injectStore } from './tokens'

type Selector = (state: any) => any

export function mapState<T extends Record<string, Selector>>(obj: T) {
  const store = injectStore()
  const keysOfObj = Object.keys(obj) as Array<keyof typeof obj>

  const bindings = reactive(
    keysOfObj.reduce((result, key) => {
      return {
        ...result,
        [key]: ref(key)
      }
    }, {} as T)
  ) as T

  const updateBindings = () => {
    for (const prop of keysOfObj) {
      bindings[prop] = obj[prop](store.getState())
    }
  }

  updateBindings()

  const unsubscribe = store.subscribe(updateBindings)

  onUnmounted(unsubscribe)

  return bindings as { [K in keyof T]: ReturnType<T[K]> }
}
