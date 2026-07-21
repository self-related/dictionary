import { configureStore } from "@reduxjs/toolkit";
import { translateApiSlice } from "../../../features/translate/api/translateApiSlice";
import { translateSlice } from "../../../features/translate/model/translateSlice";
import { dictionarySlice } from "../../../features/dictionary/model/dictionarySlice";

export const store = configureStore({
    reducer: {
        [translateApiSlice.reducerPath]: translateApiSlice.reducer,
        [translateSlice.reducerPath]: translateSlice.reducer,
        [dictionarySlice.reducerPath]: dictionarySlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(translateApiSlice.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;