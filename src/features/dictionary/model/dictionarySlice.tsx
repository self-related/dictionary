import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TranslateResult } from "../../translate/api/types";


export interface DictionaryItem extends TranslateResult {
    sourceLang: string,
    targetLang: string,
    sourceText: string,
    learned: boolean,
    
    currentTranslation?: string,
    currentTranslationWordClass?: string,
}

interface DictionarySlice {
    [dictionaryName: string]: { // sourceLang - targetLang OR custom
        items: {
            [sourceText: string]: DictionaryItem
        }
    }
}


interface AddItemPayload {
    dictionaryName: string,
    item: DictionaryItem
}


const initialState = {} as DictionarySlice;

export const dictionarySlice = createSlice({
    name: "dictionarySlice",
    initialState,
    reducers: {
        addItem: (sliceState: DictionarySlice, action: PayloadAction<AddItemPayload>) => {
            const { item, dictionaryName } = action.payload; 
            const dictionary = sliceState[action.payload.dictionaryName];

            if (!dictionary) {
                sliceState[dictionaryName] = {
                    items: {
                        [item.sourceText]: item
                    }
                }
            } else {
                dictionary.items[item.sourceText] = item;
            }
        }
    }
});


export const { addItem } = dictionarySlice.actions;