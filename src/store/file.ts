import { setFileInfo,getFileInfo } from '../util/auth';
import {createSlice} from '@reduxjs/toolkit';

interface FileState{
    algo:Array<any>
}

const initialState:FileState = {
    algo:JSON.parse(getFileInfo()!)
}

const FileSlice = createSlice({
    name:'current',
    initialState,
    reducers:{
        setAlgo(state,action){
            state.algo = action.payload
            setFileInfo(JSON.stringify(state.algo))
        }
    }
})

export const {setAlgo} = FileSlice.actions
export default FileSlice.reducer