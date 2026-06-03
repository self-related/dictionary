import styles from "./TranslateInput.module.css";

interface TranslateInputProps {
    className?: string
}

export default function TranslateInput({ className }: TranslateInputProps) {

    return (
        <div className={`${styles.inputWrap} shadowedText ${className}`}>
            <textarea
                className={styles.translateInput}
            />

            <div className={styles.buttonsWrap}>
                <button>Clear</button>
                <button>Translate</button>
            </div>
        
        </div>
    );
}