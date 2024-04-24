import {createSlice} from '@reduxjs/toolkit';

interface CurrentState{
    files:Array<any>,
    folder_id:number,
    type:string,
    building:boolean
}

const initialState:CurrentState = {
    files:[],
    folder_id:0,
    type:'list',
    building:false
}

const currentSlice = createSlice({
    name:'current',
    initialState,
    reducers:{
        setFolder(state,action){
            state.files = action.payload[0]
            state.folder_id = action.payload[1]
            state.type = action.payload[2]
        },
        setBuilding(state,action){
            state.building = action.payload
        }
    }
})

export const {setFolder,setBuilding} = currentSlice.actions
export default currentSlice.reducer