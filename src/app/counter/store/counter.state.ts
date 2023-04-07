export const initialState: CounterState = {
    counter: 0,
    channelName: 'Ajay TechnoWorld'
}


export interface CounterState {
    counter: number,
    channelName: string
}