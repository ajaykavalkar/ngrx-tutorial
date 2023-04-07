import { RouterReducerState, routerReducer } from "@ngrx/router-store"
import { authReducer } from "../auth/store/auth.reducer"
import { AUTH_STATE_NAME } from "../auth/store/auth.selectors"
import { AuthState } from "../auth/store/auth.state"
import { counterReducer } from "../counter/store/counter.reducer"
import { CounterState } from "../counter/store/counter.state"
import { postsReducer } from "../posts/store/posts.reducer"
import { PostState } from "../posts/store/posts.state"
import { sharedReducer } from "./shared/shared.reducer"
import { SHARED_STATE_NAME } from "./shared/shared.selectors"
import { SharedState } from "./shared/shared.state"

// export interface AppState {
//     counter: CounterState;
//     posts: PostState;
// }
// export const appReducer = {
//     counter: counterReducer,
//     posts: postsReducer
// }

export interface AppState {
    [SHARED_STATE_NAME]: SharedState,
    [AUTH_STATE_NAME]: AuthState,
    router: RouterReducerState
}

export const appReducer = {
    [SHARED_STATE_NAME]: sharedReducer,
    [AUTH_STATE_NAME]: authReducer,
    router: routerReducer
}