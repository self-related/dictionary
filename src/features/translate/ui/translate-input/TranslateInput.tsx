import { useEffect, useState } from "react";
import styles from "./TranslateInput.module.css";
import Button from "../../../../shared/ui/button/Button";
import { useLazyGetTranslationQuery } from "../../api/translateApiSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/model/store/hooks";
import { selectTranslateQueryData, setSourceText } from "../../model/translateSlice";


interface TranslateInputProps {
    className?: string
}


export default function TranslateInput({ className }: TranslateInputProps) {
    const dispatch = useAppDispatch();
    const { sourceText } = useAppSelector(selectTranslateQueryData);
    
    const [autoTranslate, setAutoTranslate] = useState<boolean>(true);

    const [fetchTransltaion, { data: debugData }] = useLazyGetTranslationQuery();
    console.debug(`query: ${JSON.stringify(debugData)?.slice(0, 120)}...`);

    useEffect(() => {
        if (sourceText === "") return;
        // Temp constants with actual input
        fetchTransltaion({ provider: "google", sourceLang: "en", targetLang: "es", sourceText: sourceText.trim()})
    }, [sourceText, fetchTransltaion]);


    return (
        <div className={`${styles.inputWrap} shadowedText ${className}`}>
            {/* input */}
            <textarea
                className={styles.translateInput}
                value={sourceText}
                onInput={(ev) => dispatch(setSourceText(ev.currentTarget.value))}
            />

            {/* checkbox and buttons  */}
            <div className={styles.buttonsWrap}>
                <label htmlFor="autoTranslate" className={styles.autoTranslateLabel}>
                    Auto-translation
                    <input 
                        id="autoTranslate" 
                        checked={autoTranslate}
                        type="checkbox"
                        onChange={() => setAutoTranslate(value => !value)}
                    />
                </label>

                <Button>Clear</Button>
                <Button>Translate</Button>
            </div>
        
        </div>
    );
}