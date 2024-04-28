import {createSlice} from '@reduxjs/toolkit';

interface TestState{
    algo:Array<any>
}

const initialState:TestState = {
    algo:[]
}

const testSlice = createSlice({
    name:'current',
    initialState,
    reducers:{
        setAlgo(state,action){
            state.algo = action.payload
        }
    }
})

export const {setAlgo} = testSlice.actions
export default testSlice.reducer