import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TranslateResult } from "../../translate/api/types";


export interface DictionaryItem extends TranslateResult {
    sourceText: string,
    learned: boolean,
    
    currentTranslation?: string,
    currentTranslationWordClass?: string,
}

interface DictionarySlice {
    settings: {
        currentDictionaryId: string | null,
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
        currentDictionaryId: "en;es"
    },
    dictionaries: {
        "en;es": {
            items:  {
                "source1": {sourceText: "source1", translation: "translation", learned: true},
                "source": {sourceText: "source", translation: "translation", learned: false},
                "source2": {sourceText: "source2", translation: "translation", learned: false},
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
        },
        setCurrentDictionary: (sliceState: DictionarySlice, action: PayloadAction<string>) => {
            const dictionaryId = action.payload;

            if (!dictionaryId) return;

            if (sliceState.dictionaries[dictionaryId]) {
                sliceState.settings.currentDictionaryId = dictionaryId;
            } else {
                console.error(`dictionaryId <${dictionaryId}> does not exist`);
            }
        }
    }
});


export const { addItem, setCurrentDictionary } = dictionarySlice.actions;