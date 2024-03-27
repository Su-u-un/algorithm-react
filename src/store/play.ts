import {createSlice} from '@reduxjs/toolkit';

interface PlayerState {
    chunks: Array<string>,
    cursor: number,
    lineIndicator:undefined | number
}

//initial
const initialState : PlayerState = {
    chunks: [],
    cursor: 0,
    lineIndicator:undefined
}

const playerSlice = createSlice({
    name:'player',
    initialState,
    reducers:{
        setChunks(state,action){
            state.chunks = action.payload
        },
        setCursor(state,action){
            state.cursor = action.payload
        },
        setLineIndicator(state,action){
            state.lineIndicator = action.payload
        }
    }
})

export const {setChunks,setCursor,setLineIndicator} = playerSlice.actions
export default playerSlice.reducer