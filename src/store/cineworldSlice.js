import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    bannerData: [],
    imageURL: ""
}

export const cineworldSlice = createSlice({
    name: "cineworld",
    initialState,
    reducers: {
        setBannerData: (state, action) => {
            state.bannerData = action.payload;
        },

        setImageURL: (state, action) => {
            state.imageURL = action.payload;
        }
    }
})

export const { setBannerData, setImageURL } = cineworldSlice.actions;

export default cineworldSlice.reducer;