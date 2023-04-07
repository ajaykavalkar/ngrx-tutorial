export interface SharedState {
    showLoading: boolean;
    message: string | null;
}

export const initialState: SharedState = {
    showLoading: false,
    message: null
}