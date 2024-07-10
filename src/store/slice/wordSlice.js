import { createSlice } from "@reduxjs/toolkit";

const wordSlice = createSlice({
    name: 'word',
    initialState:{
        english: null,
        transcription: null,
        russian: null,
        tags: null,
    },
    reducers: {
        setWord(state, action) {
            state.english = action.payload.english;
            state.transcription = action.payload.transcription;
            state.russian = action.payload.russian;
            state.tags = action.payload.tags;
        },
        removeWord(state) {
            state.english = null;
            state.transcription = null;
            state.russian = null;
            state.tags = null; 
        },
    },

});

export const { setWord, removeWord } = wordSlice.actions; 
export default wordSlice.reducer;