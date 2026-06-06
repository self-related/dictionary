import Button from "../../../../shared/ui/button/Button";
import styles from "./TranslateOutput.module.css";

interface TranslateOutputProps {
    className?: string
}

export default function TranslateOutput({ className }: TranslateOutputProps) {

    return (
        <div className={`${styles.translateOutput} shadowedText ${className}`}>
            <textarea value={0} />

            <div className={styles.buttonsWrap}>
                <Button>Reset</Button>      {/* reset to default translation (if option was chosen) */}
                <Button>Add -&gt;</Button>  {/* add to dictionary */}
            </div>
        </div>
    );
}