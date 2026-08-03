import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TranslateResult } from "../../translate/api/types";
import { getDictionaryName } from "../../../shared/config/languageNames";


export interface DictionaryItem extends TranslateResult {
    sourceText: string,
    learned: boolean,
    
    currentTranslation?: string,
    currentTranslationWordClass?: string,
}

interface DictionarySlice {
    settings: {
        currentDictionaryId: string,
    },
    dictionaries: {
        [id: string]: { // sourceLang/targetLang OR custom
            items: DictionaryItem[],
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
        "": { items: [], name: "" }, // empty placeholder
        "en;es": {
            items:  [
                {sourceText: "source1", translation: "translation", learned: true},
                {sourceText: "source", translation: "translation", learned: false},
                {sourceText: "source2", translation: "translation", learned: false},
            ],
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
            const dictionaryName = getDictionaryName(dictionaryId) ?? dictionaryId;

            if (!dictionary) {
                sliceState.dictionaries[dictionaryId] = {
                    items: [item],
                    name: dictionaryName
                }
            } else {
                dictionary.items.push(item);
            }

            sliceState.settings.currentDictionaryId = dictionaryId; // switch to edited dictionary
        },
        removeItem: (sliceState, action: PayloadAction<{sourceText: string, dictionaryId: string}>) => {
            const { sourceText, dictionaryId } = action.payload;
            const dictionary = sliceState.dictionaries[dictionaryId];
            dictionary.items = dictionary.items.filter((item) => item.sourceText !== sourceText);

            const isEmpty = dictionary.items.length === 0;

            if (dictionaryId !== "" && isEmpty) {
                delete sliceState.dictionaries[dictionaryId];
                sliceState.settings.currentDictionaryId = "";
            }
        },
        switchLearned: (sliceState, action: PayloadAction<{sourceText: string, dictionaryId: string}>) => {
            const { sourceText, dictionaryId } = action.payload;
            const item = sliceState.dictionaries[dictionaryId].items.find(item => item.sourceText === sourceText);

            if (item) {
                item.learned = !item.learned;
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


export const { addItem, setCurrentDictionary, removeItem, switchLearned } = dictionarySlice.actions;