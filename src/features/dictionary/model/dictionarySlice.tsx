import { createSelector, createSlice, isAnyOf, type PayloadAction } from "@reduxjs/toolkit";
import type { TranslateResult } from "../../translate/api/types";
import { getDictionaryName } from "../../../shared/config/languageNames";
import { exportToLocalStorage, importFromLocalStore } from "../../../shared/model/localStorage";


export interface DictionaryItem extends TranslateResult {
    sourceText: string,
    learned: boolean,
    
    currentTranslation?: string,
    currentTranslationWordClass?: string,
}

interface DictionarySlice {
    settings: {
        currentDictionaryId: string,
        blurTranslations: boolean
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


const sliceName = "dictionarySlice";
const savedState = importFromLocalStore<DictionarySlice>(sliceName);

const initialState: DictionarySlice = {
    settings:{
        currentDictionaryId: "en;es",
        blurTranslations: false
    },
    dictionaries: {
        "": { items: [], name: "<not selected>" }, // empty placeholder
        "en;es": {
            items:  [
                {sourceText: "learned", translation: "aprendió", learned: true},
                {sourceText: "not learned", translation: "no aprendido", learned: false},
            ],
            name: "English - Spanish"
        }
    },
};


export const dictionarySlice = createSlice({
    name: sliceName,
    initialState: {...initialState, ...savedState},
    reducers: {
        addItem: (sliceState: DictionarySlice, action: PayloadAction<AddItemPayload>) => {
            const { item, dictionaryId } = action.payload; 
            const dictionary = sliceState.dictionaries[action.payload.dictionaryId];
            const dictionaryName = getDictionaryName(dictionaryId) ?? dictionaryId;
            const existingItemIndex = sliceState.dictionaries[dictionaryId]?.items.findIndex(thisItem => thisItem.sourceText === item.sourceText);

            if (!dictionary) {
                sliceState.dictionaries[dictionaryId] = {
                    items: [item],
                    name: dictionaryName
                }
            } else if (existingItemIndex != -1) {
                const confirmedReplace = window.confirm("Replace existing item?");
                if (confirmedReplace) {
                    dictionary.items[existingItemIndex] = item;
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
        },
        switchBlurTranslations: (sliceState: DictionarySlice) => {
            sliceState.settings.blurTranslations = !sliceState.settings.blurTranslations;
        }
    },
    extraReducers: builder => {
        const actions = Object.values(dictionarySlice.actions); // get all actions from this slice

        // save state in local storage on any action of this slice
        builder.addMatcher(isAnyOf(...actions), 
            (state, action) => {
                console.log(`dictionatySlice action match: ${action.type}, saving to local storage`);
                exportToLocalStorage(dictionarySlice.name, state);
            } 
        )
    },
    selectors: {
       selectDictionaryItems: (sliceState, dictionaryId: string) => sliceState.dictionaries[dictionaryId].items,
    }
});


export const { addItem, setCurrentDictionary, removeItem, switchLearned, switchBlurTranslations } = dictionarySlice.actions;

// selectors
export const selectDictionaryItemsReversed = createSelector(dictionarySlice.selectors.selectDictionaryItems, items => items.slice().reverse());