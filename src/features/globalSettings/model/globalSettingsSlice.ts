import { createSlice } from "@reduxjs/toolkit";


interface GlobalSettingsSlice {
    colorScheme: string,
}

const name = "globalSettingsSlice";
const colorSchemeDetected = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const initialState: GlobalSettingsSlice = {
    colorScheme: colorSchemeDetected
}

export const globalSettingsSlice = createSlice({
    name,
    initialState,
    reducers: {
        switchColorScheme(slice) {
            switch (slice.colorScheme) {
                case "dark": slice.colorScheme = "light"; break;
                case "light": slice.colorScheme = "dark"; break;
            }
        }
    },
    selectors: {
        selectColorScheme: slice => slice.colorScheme
    }
});

export const { switchColorScheme } = globalSettingsSlice.actions;
export const { selectColorScheme } = globalSettingsSlice.selectors;