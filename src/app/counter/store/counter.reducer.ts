import { createReducer, on } from "@ngrx/store";
import { initialState } from "./counter.state";
import { addCustomCounter, changechannelName, decrement, increment, reset } from "./counter.actions";


const _counterReducer = createReducer(
    initialState,
    on(increment, (state) => {
        return {
            ...state,
            counter: state.counter + 1
        };
    }),
    on(decrement, (state) => {
        return {
            ...state,
            counter: state.counter > 0 ? state.counter - 1 : 0
        };
    }),
    on(reset, (state) => ({ ...state, counter: 0 })),
    on(addCustomCounter, (state, action) => {
        return {
            ...state,
            counter: action.count
        }
    }),
    on(changechannelName, (state, action) => ({ ...state, channelName: action.channelName }))
)
export function counterReducer(state: any, action: any) {
    return _counterReducer(state, action);
}