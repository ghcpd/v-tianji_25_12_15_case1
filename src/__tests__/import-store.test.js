import * as store from '../store'

test('import store', () => {
  expect(typeof store.StoreProvider).toBe('function')
  expect(typeof store.useStore).toBe('function')
})
