import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const episode_page = 1;
export const fetchAllEpisode = createAsyncThunk('episode/fetchAll', async (page) => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/episode/?page=${page * episode_page}`)
    return res.data.results
})

export const episodeSlice = createSlice({
    name: "episode",
    initialState: {
        items: [],
        status: 'idle',
        page: 1,
        newPage: true,


    },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(fetchAllEpisode.pending, (state, action) => {
            state.status = "loading"
        })
        builder.addCase(fetchAllEpisode.fulfilled, (state, action) => {
            state.items = [...state.items, ...action.payload];
            state.page += 1
            state.status = "succeded"

            if (action.payload.length < 20) {
                state.newPage = false
            }
        })

        builder.addCase(fetchAllEpisode.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        })


    }

})

export default episodeSlice.reducer
