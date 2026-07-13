import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TranslateQueryData, TranslateResult } from "../api/types";
import type { RootState } from "../../../app/model/store/store";
import { translateApiSlice } from "../api/translateApiSlice";


interface TranslateSlice {
    mainTranslation: string,
    translateQueryData: TranslateQueryData,
    translateResult?: TranslateResult,
}

const initialState: TranslateSlice = {
    translateQueryData: {
        provider: "google",
        sourceLang: "en",
        targetLang: "es",
        sourceText: ""
    },
    mainTranslation: "",
};


export const translateSlice = createSlice({
    name: "translateSlice",
    initialState,
    reducers: {
        setProvider: (sliceState, action: PayloadAction<string>) => {
            sliceState.translateQueryData.provider = action.payload;
        },
        setSourceLang: (sliceState, action: PayloadAction<string>) => { 
            sliceState.translateQueryData.sourceLang = action.payload;
        },
        setTargetLang: (sliceState, action: PayloadAction<string>) => { 
            sliceState.translateQueryData.targetLang = action.payload;
        },
        setSourceText: (sliceState, action: PayloadAction<string>) => { 
            sliceState.translateQueryData.sourceText = action.payload;
        },
        setMainTranslation: (sliceState, action: PayloadAction<string>) => {
            sliceState.mainTranslation = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(translateApiSlice.endpoints.getTranslation.matchFulfilled, (state, action) => {
            state.translateResult = action.payload;
            state.mainTranslation = action.payload.translation;
        })
    }
});


export const { setProvider, setSourceLang, setTargetLang, setSourceText, setMainTranslation } = translateSlice.actions;

export const selectTranslateQueryData = (sliceState: RootState) => sliceState.translateSlice.translateQueryData;
export const selectMainTranslation = (sliceState: RootState) => sliceState.translateSlice.mainTranslation;