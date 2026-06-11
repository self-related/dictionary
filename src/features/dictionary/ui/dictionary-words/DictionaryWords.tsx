import { useState } from "react";
import styles from "./DictionaryWords.module.css"
import WordItem from "./ui/word-item/WordItem";

interface TestWords {
    id: number,
    source: string,
    target: string,
    sourceLang: string,
    targetLang: string,
    learned?: boolean

}

const testWords: TestWords[] = [
    {id: 0, source: "sourcesourcesourceso urcesourcesourcesourc esourcesourcesourcesource urcesourcesources ourcesourcesourcesour cesource urcesourcesourcesourcesourcesourcesourcesource urcesourcesourcesourcesourcesourcesourcesource urcesourcesourcesourcesourcesourcesourcesource", target: "target", sourceLang: "English", targetLang: "Spanish"},
    {id: 0, source: "source1", target: "target", sourceLang: "English", targetLang: "Spanish", learned: true},
    {id: 0, source: "source", target: "target", sourceLang: "English", targetLang: "Spanish"},
    {id: 0, source: "source", target: "target", sourceLang: "English", targetLang: "Spanish"},
    {id: 0, source: "source", target: "target", sourceLang: "English", targetLang: "Spanish"},
    {id: 0, source: "source", target: "target", sourceLang: "English", targetLang: "Spanish"},
    {id: 0, source: "source", target: "target", sourceLang: "English", targetLang: "Spanish"},
];

export default function DictionaryWords() {
    const [words] = useState<TestWords[]>(testWords); // temp state

    return (
        <div className={styles.dictionaryWords}>
            {
                (words.length === 0)
                ? <p className={styles.placeholder}>No words yet</p>
                : words.map(wordProps => <WordItem {...wordProps} />)
            }
        </div>
    );
}