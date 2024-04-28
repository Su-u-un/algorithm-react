import { configureStore } from "@reduxjs/toolkit";
import playerReducer from './play'
import currentReducer from './current'
import testReducer from './test'

const store  = configureStore({
    reducer:{
        player:playerReducer,
        current:currentReducer,
        test:testReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store