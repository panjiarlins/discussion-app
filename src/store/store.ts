import { configureStore } from '@reduxjs/toolkit'
import threadsSlice from './threadsSlice'
import { loadingBarReducer } from 'react-redux-loading-bar'

export const store = configureStore({
  reducer: {
    loadingBar: loadingBarReducer,
    threads: threadsSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
