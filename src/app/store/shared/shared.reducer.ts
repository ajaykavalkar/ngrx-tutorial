import { createReducer, on } from "@ngrx/store"
import { initialState } from "./shared.state"
import { setErrorMessage, setLoadingSspinner } from "./shared.action"


const _sharedReducer = createReducer(
    initialState,
    on(setLoadingSspinner, (state, action) => {
        return { ...state, showLoading: action.status }
    }),
    on(setErrorMessage, (state, action) => {
        return { ...state, message: action.message }
    })
)

export function sharedReducer(state: any, action: any) {
    return _sharedReducer(state, action)
}