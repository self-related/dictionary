import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { exportToLocalStorage, importFromLocalStore } from "../../../shared/model/localStorage";


interface GlobalSettingsSlice {
    colorScheme: string,
    accentColor: string
}


const sliceName = "globalSettingsSlice";
const accentColors = ["orange", "blue"];

const savedState = importFromLocalStore<GlobalSettingsSlice>(sliceName);
const initialState: GlobalSettingsSlice = {
    colorScheme: "auto",
    accentColor: "orange"
};


export const globalSettingsSlice = createSlice({
    name: sliceName,
    initialState: { ...initialState, ...savedState },
    reducers: {
        switchColorScheme(slice) {
            // cycle between dark, light, auto
            switch (slice.colorScheme) {
                case "dark" : slice.colorScheme = "light"; break;
                case "light": slice.colorScheme = "auto"; break;
                case "auto" : slice.colorScheme = "dark"; break;
            }
        },
        switchAccentColor(slice) {
            const nextId = accentColors.findIndex(element => element === slice.accentColor) + 1;
            slice.accentColor = accentColors.at(nextId) ?? accentColors[0];
        }
    },
    selectors: {
        selectColorScheme: slice => slice.colorScheme
    },
    extraReducers(builder) {
        const actions = Object.values(globalSettingsSlice.actions);
        builder.addMatcher(isAnyOf(...actions), slice => exportToLocalStorage(sliceName, slice));
    }
});


export const { switchColorScheme, switchAccentColor } = globalSettingsSlice.actions;
export const { selectColorScheme } = globalSettingsSlice.selectors;