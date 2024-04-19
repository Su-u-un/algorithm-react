import {createSlice} from '@reduxjs/toolkit';

interface CurrentState{
    files:Array<any>,
    folder_id:number,
    building:boolean
}

const initialState:CurrentState = {
    files:[],
    folder_id:0,
    building:false
}

const currentSlice = createSlice({
    name:'current',
    initialState,
    reducers:{
        setFolder(state,action){
            state.files = action.payload[0]
            state.folder_id = action.payload[1]
        },
        setBuilding(state,action){
            state.building = action.payload
        }
    }
})

export const {setFolder,setBuilding} = currentSlice.actions
export default currentSlice.reducer