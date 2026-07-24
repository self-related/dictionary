import type { TranslationVerbose } from "../../../../../translate/api/types";
import styles from "./ItemWrap.module.css"


interface WordItemProps {
    sourceText: string,
    translation: string,
    sourceLang: string,
    targetLang: string,
    
    moreTranslations?: TranslationVerbose[],
    learned?: boolean,
}


export default function WordItem({
    sourceText, sourceLang, targetLang, translation, learned
}: WordItemProps) {
    const learnedClass = (learned) ? styles.learned : styles.notLearned;

    return (
        <div className={styles.wordItem}>

            <div className={styles.textWrap}>
                {/* source */}
                <p>
                    <span className={learnedClass}>{sourceLang}: </span>
                    {sourceText}
                </p>
                
                {/* target */}
                <p>
                    <span className={learnedClass}>{targetLang}: </span>
                    {translation}
                </p>
            </div>


            {/* buttons */}
            <div className={styles.buttonsWrap}>
                <button className={styles.closeBtn}>X</button>
                <button className={styles.learnedBtn}>🗸</button>
                <button className={styles.optionsBtn}>...</button>

            </div>

        </div>
    );
}