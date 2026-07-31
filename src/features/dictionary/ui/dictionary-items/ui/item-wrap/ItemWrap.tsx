import { useAppDispatch } from "../../../../../../app/model/store/hooks";
import type { TranslationVerbose } from "../../../../../translate/api/types";
import { removeItem, switchLearned } from "../../../../model/dictionarySlice";
import styles from "./ItemWrap.module.css"


interface WordItemProps {
    sourceText: string,
    translation: string,
    sourceLang: string,
    targetLang: string,
    dictionaryId: string,
    
    moreTranslations?: TranslationVerbose[],
    learned?: boolean,
}


export default function WordItem({
    dictionaryId, sourceText, sourceLang, targetLang, translation, learned
}: WordItemProps) {
    const learnedCSS = (learned) ? styles.textGreen : styles.textRed;
    const checkboxCSS = (learned) ? styles.textGreen : styles.textGray;

    const dispatch = useAppDispatch();

    return (
        <div className={styles.wordItem}>

            <div className={styles.textWrap}>
                {/* source */}
                <p>
                    <span className={learnedCSS}>{sourceLang}: </span>
                    {sourceText}
                </p>
                
                {/* target */}
                <p>
                    <span className={learnedCSS}>{targetLang}: </span>
                    {translation}
                </p>
            </div>


            {/* buttons */}
            <div className={styles.buttonsWrap}>
                <button className={styles.closeBtn} onClick={() => dispatch(removeItem({sourceText, dictionaryId}))}>
                    X
                </button>
                <button className={`${styles.learnedBtn} ${checkboxCSS}`} onClick={() => dispatch(switchLearned({sourceText, dictionaryId}))}>
                    🗸
                </button>
                <button className={styles.optionsBtn}>...</button>

            </div>

        </div>
    );
}