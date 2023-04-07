import { createReducer, on } from "@ngrx/store"
import { initialState } from "./auth.state"
import { autoLogout, checkUserProfileInLocalstorage, loginSuccess, signupSuccess } from "./auth.actions";

const _authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, { user }) => {
        return { ...state, user }
    }),
    on(signupSuccess, (state, { user }) => {
        return { ...state, user }
    }),
    on(autoLogout, (state) => ({ ...state, user: null }))
);

export function authReducer(state: any, action: any) {
    return _authReducer(state, action)
}