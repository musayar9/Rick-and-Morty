import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const local_page = 1;
export const fetchLocations = createAsyncThunk('locations/getLocations', async(page)=>{
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/location/?page=${page * local_page}`)
    return res.data.results
})

export const locationsSlice = createSlice({
    name:"locations",
    initialState:{
        items:[],
        status: 'idle',
        page:1,
        locationNewPage:true
    },

    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchLocations.pending, (state, action)=>{
            state.status="loading"
        })

        builder.addCase(fetchLocations.fulfilled, (state, action)=>{
            state.items = [...state.items, ...action.payload];
            state.page += 1
            state.status="succeded"
            if(action.payload.length < 20){
                state.locationNewPage = false
            }
        })

       builder.addCase(fetchLocations.rejected, (state, action)=>{
        state.status ="failed"
        state.error = action.error.message
       })
    }
})

export default locationsSlice.reducer