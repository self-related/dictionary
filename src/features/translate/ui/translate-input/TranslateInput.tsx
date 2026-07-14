import { useCallback, useEffect, useState } from "react";
import styles from "./TranslateInput.module.css";
import Button from "../../../../shared/ui/button/Button";
import { useLazyTranslateQuery } from "../../api/translateApiSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/model/store/hooks";
import { selectTranslateQueryPayload, setSourceText } from "../../model/translateSlice";


interface TranslateInputProps {
    className?: string
}


export default function TranslateInput({ className }: TranslateInputProps) {
    const dispatch = useAppDispatch();
    const translateQueryPayload = useAppSelector(selectTranslateQueryPayload);
    
    const [autoTranslate, setAutoTranslate] = useState<boolean>(true);

    const [fetchTransltaion, { data }] = useLazyTranslateQuery();
    console.debug(`query: ${JSON.stringify(data)?.slice(0, 120)}...`);


    const handleFetchTranslation = useCallback(() => {
        if (translateQueryPayload.sourceText.trim() !== "") {
            fetchTransltaion(translateQueryPayload);
        }
    }, [translateQueryPayload, fetchTransltaion]);


    useEffect(() => {
        if (autoTranslate) {
            handleFetchTranslation();
        }
    }, [autoTranslate, handleFetchTranslation]);


    return (
        <div className={`${styles.inputWrap} shadowedText ${className}`}>
            {/* input */}
            <textarea
                className={styles.translateInput}
                value={translateQueryPayload.sourceText}
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

                <Button onClick={() => dispatch(setSourceText(""))}>Clear</Button>
                <Button onClick={handleFetchTranslation}>Translate</Button>
            </div>
        
        </div>
    );
}