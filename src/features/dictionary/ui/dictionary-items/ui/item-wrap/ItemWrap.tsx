import { useState } from "react";
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
    blur?: boolean
}


export default function WordItem({
    dictionaryId, sourceText, sourceLang, targetLang, translation, learned, blur
}: WordItemProps) {
    const [blurDisabled] = useState(false);

    // CSS modifiers
    const learnedCSS = (learned) ? styles.textGreen : styles.textRed;
    const checkboxCSS = (learned) ? styles.textGreen : styles.textGray;
    const blurClass = (blur && !blurDisabled) ? styles.blur : '';
    

    const dispatch = useAppDispatch();

    return (
        <div className={styles.wordItem}>

            <div className={styles.textWrap}>
                {/* source */}
                <p>
                    <span className={learnedCSS}>{sourceLang}: </span>
                    {sourceText}
                </p>
                
                {/* translation */}
                <p>
                    <span className={learnedCSS}>{targetLang}: </span>
                    <span className={blurClass}>{translation}</span>
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