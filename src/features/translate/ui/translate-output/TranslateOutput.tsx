import { useAppDispatch, useAppSelector } from "../../../../app/model/store/hooks";
import Button from "../../../../shared/ui/button/Button";
import { addItem } from "../../../dictionary/model/dictionarySlice";
import { translateApiSlice } from "../../api/translateApiSlice";
import { useSelectTranslateQueryLastResult } from "../../hooks/apiHooks";
import { selectCustomTranslation, setCustomTranslation } from "../../model/translateSlice";
import styles from "./TranslateOutput.module.css";


interface TranslateOutputProps {
    className?: string
}


export default function TranslateOutput({ className }: TranslateOutputProps) {
    const dispatch = useAppDispatch();

    const { sourceText, sourceLang, targetLang } = useAppSelector(state => state.translateSlice.translateQueryPayload)
    const lastTranslateResult = useSelectTranslateQueryLastResult();
    const customTranslation = useAppSelector(selectCustomTranslation);

    const addBtnClick = () => {
        if (!customTranslation && !lastTranslateResult) {
            return;
        }
        const translation = customTranslation ?? lastTranslateResult!.translation; // both are never null simultaniously
        
        dispatch(addItem({
            dictionaryId: `${sourceLang};${targetLang}`,
            item: {
                sourceText,
                translation,
                learned: false,
                moreTranslations: lastTranslateResult?.moreTranslations
            }
        }))
    };

    const handleClearBtn = () => {
        dispatch(setCustomTranslation(null));
        dispatch(translateApiSlice.util.resetApiState());
    };


    // CSS modifiers
    const clearBtnModifier = (customTranslation || lastTranslateResult?.translation) ? '' : styles.hidden;
    
 
    return (
        <div className={`${styles.translateOutput} shadowedText ${className}`}>
            <textarea 
                value={customTranslation ?? lastTranslateResult?.translation ?? ""} 
                onInput={(ev) => dispatch(setCustomTranslation(ev.currentTarget.value))} 
            />

            <button
                onClick={() => handleClearBtn()}
                className={`${styles.clearBtn} ${clearBtnModifier}`}
            >X
            </button>

            <div className={styles.buttonsWrap}>
                {/* nullify custom translation */} 
                <Button onClick={() => dispatch(setCustomTranslation(null))}>
                    Reset
                </Button>      

                <Button onClick={addBtnClick}>
                    Add -&gt;
                </Button>  {/* add to dictionary */}
            </div>
        </div>
    );
}