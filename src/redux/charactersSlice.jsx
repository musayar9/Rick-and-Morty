import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const char_page = 1;
export const fetchCharacters = createAsyncThunk('characters/getCharacters', async (page) => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/character/?page=${page * char_page}`)
    return res.data.results
})
export const charactersSlice = createSlice({
    name: 'characters',
    initialState: {
        items: [],
       
        status: 'idle',
        page: 1,
        hasNextPage: true,
    },
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(fetchCharacters.pending, (state, action) => {
            state.status = "loading"
        })

    
        builder.addCase(fetchCharacters.fulfilled, (state, action) => {
            state.items = [...state.items, ...action.payload];
            state.page += 1         
            state.status = "succeded"
            if (action.payload.length < 20) {
                state.hasNextPage = false
            }
        })

        builder.addCase(fetchCharacters.rejected, (state, action) => {         
            state.status = "failed"
            state.error = action.error.message
        })
     
    }

})


export default charactersSlice.reducer;