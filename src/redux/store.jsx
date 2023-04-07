import { configureStore } from '@reduxjs/toolkit'
import charactersSlice from './charactersSlice'
import episodeSlice from './episodeSlice'
import locationsSlice from './locationsSlice'
export const store = configureStore({
    reducer:{
        characters : charactersSlice,
        episode: episodeSlice,
        locations: locationsSlice
    }
})