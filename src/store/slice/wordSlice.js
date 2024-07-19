import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Асинхронные действия для API запросов
export const fetchWords = createAsyncThunk("word/fetchWords", async () => {
    const response = await fetch("https://itgirlschool.justmakeit.ru/api/words");
    if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Ошибка: ${response.status} - ${response.statusText}. Детали: ${errorDetails}`);
    }
    return response.json();
});

export const addWord = createAsyncThunk("word/addWord", async (newWord) => {
    const response = await fetch("/api/words/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newWord),
    });
    if (!response.ok) {
        throw new Error("Не удалось добавить слово");
    }
    return response.json();
});

export const updateWord = createAsyncThunk("word/updateWord", async (updatedWord) => {
    const response = await fetch(`/api/words/${updatedWord.id}/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedWord),
    });
    if (!response.ok) {
        throw new Error("Не удалось обновить слово");
    }
    return response.json();
});

export const deleteWord = createAsyncThunk("word/deleteWord", async (wordId) => {
    const response = await fetch(`/api/words/${wordId}/delete`, {
        method: "POST",
    });
    if (!response.ok) {
        throw new Error("Не удалось удалить слово");
    }
    return wordId;
});


const wordSlice = createSlice({
    name: 'word',
    initialState:{
        words: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWords.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(fetchWords.fulfilled, (state, action) => {
                state.loading = false;
                state.words = action.payload;
            })
            .addCase(fetchWords.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addWord.fulfilled, (state, action) => {
                state.words.push(action.payload);
            })
            .addCase(updateWord.fulfilled, (state, action) => {
                const index = state.words.findIndex((word) => word.id === action.payload.id);
                if (index !== -1) {
                    state.words[index] = action.payload;
                }
            })
            .addCase(deleteWord.fulfilled, (state, action) => {
                state.words = state.words.filter((word) => word.id !== action.payload);
            });
    },
});

export default wordSlice.reducer;