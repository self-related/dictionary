import styles from "./TranslateOutput.module.css";

interface TranslateOutputProps {
    className?: string
}

export default function TranslateOutput({ className }: TranslateOutputProps) {

    return (
        <div className={`${styles.translateOutput} shadowedText ${className}`}>
            <textarea value={0} />

            <div className={styles.buttonsWrap}>
                <button>Reset</button>      {/* reset to default translation (if option was chosen) */}
                <button>Add -&gt;</button>  {/* add to dictionary */}
            </div>
        </div>
    );
}