import { createSlice } from "@reduxjs/toolkit";
import type { TranslateResult } from "../../translate/api/types";


interface DictionaryItem extends TranslateResult {
    currentTranslation?: string
    currentWordClass?: string
}

interface DictionarySlice {
    [dictionary: string]: { // srcLang__targetLang
        items: {
            [sourceText: string]: DictionaryItem
        }
    }
}


const initialState = {} as DictionarySlice;

export const dictionarySlice = createSlice({
    name: "dictionarySlice",
    initialState,
    reducers: {}
});