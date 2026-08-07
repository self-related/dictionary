import { createSlice, isAnyOf, type PayloadAction } from "@reduxjs/toolkit";
import type { TranslateQueryPayload } from "../api/types";
import type { RootState } from "../../../app/model/store/store";
import { translateApiSlice } from "../api/translateApiSlice";
import { exportToLocalStorage, importFromLocalStore } from "../../../shared/model/localStorage";


interface TranslateSlice {
    customTranslation: string | null,
    autoTranslate: boolean,
    translateQueryPayload: TranslateQueryPayload,
}

const sliceName = "translateSlice";
const savedState = importFromLocalStore<TranslateSlice>(sliceName);

const initialState: TranslateSlice = {
    translateQueryPayload: {
        provider: "google",
        sourceLang: "en",
        targetLang: "es",
        sourceText: "",
    },
    customTranslation: null,
    autoTranslate: true
};


export const translateSlice = createSlice({
    name: sliceName,
    initialState: {...initialState, ...savedState},
    reducers: {
        setProvider: (sliceState, action: PayloadAction<string>) => {
            sliceState.translateQueryPayload.provider = action.payload;
        },
        setSourceLang: (sliceState, action: PayloadAction<string>) => { 
            sliceState.translateQueryPayload.sourceLang = action.payload;
        },
        setTargetLang: (sliceState, action: PayloadAction<string>) => { 
            sliceState.translateQueryPayload.targetLang = action.payload;
        },
        setSourceText: (sliceState, action: PayloadAction<string>) => { 
            sliceState.translateQueryPayload.sourceText = action.payload;
        },
        setCustomTranslation: (sliceState, action: PayloadAction<string | null>) => {
            sliceState.customTranslation = action.payload;
        },
        switchAutoTranslate: (sliceState) => {
            sliceState.autoTranslate = !sliceState.autoTranslate;
        },
        switchLangs: (sliceState) => {
            // swap languages
            [sliceState.translateQueryPayload.sourceLang, sliceState.translateQueryPayload.targetLang] = [sliceState.translateQueryPayload.targetLang, sliceState.translateQueryPayload.sourceLang];
        }
    },
    extraReducers: builder => {
        builder.addMatcher(translateApiSlice.endpoints.translate.matchPending, (state) => {
            state.customTranslation = null;
        });
        const actions = Object.values(translateSlice.actions);
        builder.addMatcher(isAnyOf(...actions), (state) => {
            exportToLocalStorage(translateSlice.name, state);
        })
    }
});


export const { 
    setProvider, 
    setSourceLang, 
    setTargetLang, 
    setSourceText, 
    setCustomTranslation, 
    switchLangs,
    switchAutoTranslate
} = translateSlice.actions;

export const selectTranslateQueryPayload = (state: RootState) => state.translateSlice.translateQueryPayload;
export const selectCustomTranslation = (state: RootState) => state.translateSlice.customTranslation;