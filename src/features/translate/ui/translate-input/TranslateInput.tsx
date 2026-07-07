import { useEffect, useState } from "react";
import styles from "./TranslateInput.module.css";
import Button from "../../../../shared/ui/button/Button";
import { useLazyGetTranslationQuery } from "../../api/translateApiSlice";


interface TranslateInputProps {
    className?: string
}


export default function TranslateInput({ className }: TranslateInputProps) {
    const [autoTranslate, setAutoTranslate] = useState<boolean>(true);
    const [input, setInput] = useState(""); // Temp local state -> change to redux

    const [fetchTransltaion, { data: debugData }] = useLazyGetTranslationQuery();
    console.debug(`query: ${JSON.stringify(debugData)?.slice(0, 120)}...`);

    useEffect(() => {
        if (input === "") return;
        // Temp constatns with actual input
        fetchTransltaion({ api: "google", sourceLang: "en", targetLang: "es", sourceText: input.trim()})
    }, [input, fetchTransltaion]);


    return (
        <div className={`${styles.inputWrap} shadowedText ${className}`}>
            {/* input */}
            <textarea
                className={styles.translateInput}
                value={input}
                onInput={(ev) => setInput(ev.currentTarget.value)}
            />

            {/* checkbox and buttons  */}
            <div className={styles.buttonsWrap}>
                <label htmlFor="autoTranslate" className={styles.autoTranslateLabel}>
                    Auto-translation
                    <input 
                        id="autoTranslate" 
                        checked={autoTranslate}
                        type="checkbox"
                        onClick={() => setAutoTranslate(value => !value)}
                    />
                </label>

                <Button>Clear</Button>
                <Button>Translate</Button>
            </div>
        
        </div>
    );
}