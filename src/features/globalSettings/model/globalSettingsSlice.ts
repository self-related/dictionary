import { createSlice } from "@reduxjs/toolkit";


interface GlobalSettingsSlice {
    colorScheme: string,
}

const name = "globalSettingsSlice";

const initialState: GlobalSettingsSlice = {
    colorScheme: "auto"
}

export const globalSettingsSlice = createSlice({
    name,
    initialState,
    reducers: {
        switchColorScheme(slice) {
            // cycle between dark, light, auto
            switch (slice.colorScheme) {
                case "dark" : slice.colorScheme = "light"; break;
                case "light": slice.colorScheme = "auto"; break;
                case "auto" : slice.colorScheme = "dark"; break;
            }
        }
    },
    selectors: {
        selectColorScheme: slice => slice.colorScheme
    }
});

export const { switchColorScheme } = globalSettingsSlice.actions;
export const { selectColorScheme } = globalSettingsSlice.selectors;