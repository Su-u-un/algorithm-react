import {createSlice} from '@reduxjs/toolkit';

interface CurrentState{
    files:Array<any>,
    folder_id:number
}

const initialState:CurrentState = {
    files:[],
    folder_id:0
}

const currentSlice = createSlice({
    name:'current',
    initialState,
    reducers:{
        setFolder(state,action){
            state.files = action.payload[0]
            state.folder_id = action.payload[1]
        },

    }
})

export const {setFolder} = currentSlice.actions
export default currentSlice.reducer