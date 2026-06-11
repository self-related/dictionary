import { useState } from "react";
import styles from "./DictionaryWords.module.css"


export default function DictionaryWords() {
    const [words] = useState<string[]>([]); // temp state

    return (
        <div className={styles.dictionaryWords}>
            {!words.length && <p className={styles.placeholder}>No words yet</p>}
        </div>
    );
}