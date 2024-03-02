import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { loadingBarReducer } from 'react-redux-loading-bar'
import usersSlice from './usersSlice'
import threadsSlice from './threadsSlice'

export const rootReducer = combineReducers({
  loadingBar: loadingBarReducer,
  users: usersSlice.reducer,
  threads: threadsSlice.reducer,
})

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
