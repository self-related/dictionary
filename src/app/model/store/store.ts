import { configureStore } from "@reduxjs/toolkit";
import { translateApiSlice } from "../../../features/translate/api/translateApiSlice";

export const store = configureStore({
    reducer: {
        [translateApiSlice.reducerPath]: translateApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(translateApiSlice.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;