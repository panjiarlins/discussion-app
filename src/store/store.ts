import { configureStore } from '@reduxjs/toolkit'
import threadsSlice from './threadsSlice'

export const store = configureStore({
  reducer: {
    threads: threadsSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
