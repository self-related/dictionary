import { useState } from "react";
import styles from "./DictionaryItems.module.css"
import ItemWrap from "./ui/item-wrap/ItemWrap";
import type { DictionaryItem } from "../../model/dictionarySlice";

const testWords: DictionaryItem[] = [
    {sourceText: "sourcesourcesourceso urcesourcesourcesourc esourcesourcesourcesource urcesourcesources ourcesourcesourcesour cesource urcesourcesourcesourcesourcesourcesourcesource urcesourcesourcesourcesourcesourcesourcesource urcesourcesourcesourcesourcesourcesourcesource", translation: "translation", sourceLang: "English", targetLang: "Spanish", learned: false},
    {sourceText: "source1", translation: "translation", sourceLang: "English", targetLang: "Spanish", learned: true},
    {sourceText: "source", translation: "translation", sourceLang: "English", targetLang: "Spanish", learned: false},
    {sourceText: "source", translation: "translation", sourceLang: "English", targetLang: "Spanish", learned: false},
    {sourceText: "source", translation: "translation", sourceLang: "English", targetLang: "Spanish", learned: false},
    {sourceText: "source", translation: "translation", sourceLang: "English", targetLang: "Spanish", learned: false},
    {sourceText: "source", translation: "translation", sourceLang: "English", targetLang: "Spanish", learned: false}
];

export default function DictionaryWords() {
    const [words] = useState<DictionaryItem[]>(testWords); // temp state

    return (
        <div className={styles.dictionaryWords}>
            {
                (words.length === 0)
                ? <p className={styles.placeholder}>No words yet</p>
                : words.map((wordProps, i) => <ItemWrap key={i} {...wordProps} />)
            }
        </div>
    );
}