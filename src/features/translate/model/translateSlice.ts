import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TranslateQueryPayload, TranslateResult } from "../api/types";
import type { RootState } from "../../../app/model/store/store";
import { translateApiSlice } from "../api/translateApiSlice";


interface TranslateSlice {
    customTranslation: string | null,
    translateQueryPayload: TranslateQueryPayload,
    translateResult?: TranslateResult,
}

const initialState: TranslateSlice = {
    translateQueryPayload: {
        provider: "google",
        sourceLang: "en",
        targetLang: "es",
        sourceText: ""
    },
    customTranslation: null,
};


export const translateSlice = createSlice({
    name: "translateSlice",
    initialState,
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
        setMainTranslation: (sliceState, action: PayloadAction<string>) => {
            sliceState.customTranslation = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addMatcher(translateApiSlice.endpoints.translate.matchPending, (state) => {
            state.customTranslation = null;
        })
    }
});


export const { setProvider, setSourceLang, setTargetLang, setSourceText, setMainTranslation } = translateSlice.actions;

export const selectTranslateQueryPayload = (sliceState: RootState) => sliceState.translateSlice.translateQueryPayload;
export const selectCustomTranslation = (sliceState: RootState) => sliceState.translateSlice.customTranslation;