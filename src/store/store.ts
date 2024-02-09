import { configureStore } from '@reduxjs/toolkit'
import { loadingBarReducer } from 'react-redux-loading-bar'
import usersSlice from './userSlice'
import threadsSlice from './threadsSlice'

export const store = configureStore({
  reducer: {
    loadingBar: loadingBarReducer,
    users: usersSlice.reducer,
    threads: threadsSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
