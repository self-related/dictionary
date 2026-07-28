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
    settings: {
        currentDictionary: string | null,
    },
    dictionaries: {
        [id: string]: { // sourceLang/targetLang OR custom
            items: {
                [sourceText: string]: DictionaryItem
            },
            name: string
        }
    }
}

interface AddItemPayload {
    dictionaryId: string,
    item: DictionaryItem
}


const initialState: DictionarySlice = {
    settings:{
        currentDictionary: "en;es"
    },
    dictionaries: {
        "en;es": {
            items:  {
                "source1": {sourceText: "source1", translation: "translation", sourceLang: "English", targetLang: "Spanish", learned: true},
                "source": {sourceText: "source", translation: "translation", sourceLang: "English", targetLang: "Spanish", learned: false},
                "source2": {sourceText: "source2", translation: "translation", sourceLang: "English", targetLang: "Spanish", learned: false},
            },
            name: "English - Spanish"
        }
    },
};


export const dictionarySlice = createSlice({
    name: "dictionarySlice",
    initialState,
    reducers: {
        addItem: (sliceState: DictionarySlice, action: PayloadAction<AddItemPayload>) => {
            const { item, dictionaryId } = action.payload; 
            const dictionary = sliceState.dictionaries[action.payload.dictionaryId];

            if (!dictionary) {
                sliceState.dictionaries[dictionaryId] = {
                    items: {
                        [item.sourceText]: item
                    },
                    name: dictionaryId
                }
            } else {
                dictionary.items[item.sourceText] = item;
            }
        }
    }
});


export const { addItem } = dictionarySlice.actions;