import { useState } from "react";
import { useAppDispatch } from "../../../../../app/model/store/hooks";
import type { TranslationVerbose } from "../../../../translate/api/types";
import { removeItem, switchLearned } from "../../../model/dictionarySlice";
import styles from "./Item.module.css"


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


export default function Item({
    dictionaryId, sourceText, sourceLang, targetLang, translation, learned, blur
}: WordItemProps) {
    const [blurDisabled, setBlurDisabled] = useState(false);


    // [prevent blur on selection] - remove old selected text on mousedown
    const handleTranslationMouseDown = () => {
        window.getSelection()?.empty();
    };

    const handleTranslationClick = () => {
        // [prevent blur on selection] - if text is still selected after mousedown (new selection started) - don't change blur
        if (window.getSelection()?.toString()) return;
        setBlurDisabled(val => !val);
    };


    // CSS modifiers
    const learnedCSS = (learned) ? styles.textGreen : styles.textRed;
    const checkboxCSS = (learned) ? styles.textGreen : styles.textGray;
    const blurCSS = (blur && !blurDisabled) ? `${styles.blur} ${styles.pointer}` : (blur) ? styles.pointer : '';

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
                    <span 
                        onClick={handleTranslationClick} 
                        onMouseDown={handleTranslationMouseDown}
                        className={blurCSS}
                    >
                        {translation}
                    </span>
                </p>
            </div>


            {/* buttons */}
            <div className={styles.buttonsWrap}>
                <button 
                    title="Delete"
                    onClick={() => dispatch(removeItem({sourceText, dictionaryId}))}
                    className={styles.closeBtn} 
                >
                    X
                </button>

                <button 
                    title={ learned ? "Mark as Not Learned" : "Mark as Learned"} 
                    className={`${styles.learnedBtn} ${checkboxCSS}`} 
                    onClick={() => dispatch(switchLearned({sourceText, dictionaryId}))}
                >
                    🗸
                </button>

                <button
                    title="More"
                    className={styles.optionsBtn}
                >
                    ...
                </button>
            </div>

        </div>
    );
}