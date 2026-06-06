import { useState } from "react";
import styles from "./TranslateInput.module.css";
import Button from "../../../../shared/ui/button/Button";

interface TranslateInputProps {
    className?: string
}

export default function TranslateInput({ className }: TranslateInputProps) {
    const [autoTranslate, setAutoTranslate] = useState<boolean>(true);

    return (
        <div className={`${styles.inputWrap} shadowedText ${className}`}>
            {/* input */}
            <textarea
                className={styles.translateInput}
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