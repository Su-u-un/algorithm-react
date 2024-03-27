import {createSlice} from '@reduxjs/toolkit';

interface CurrentState{
    editingFile: string | undefined,
    shouldBuild: boolean
}

const initialState:CurrentState = {
    editingFile: undefined,
    shouldBuild: true
}

const currentSlice = createSlice({
    name:'current',
    initialState,
    reducers:{
        setEditingFile(state,action){
            state.editingFile = action.payload
            state.shouldBuild = true
        },
    }
})


export const {setEditingFile} = currentSlice.actions
export default currentSlice.reducer