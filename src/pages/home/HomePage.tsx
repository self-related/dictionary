import LangPanel from "../../features/translate/ui/lang-panel/LangPanel";
import TranslateInput from "../../features/translate/ui/translate-input/TranslateInput";
import TranslateOptions from "../../features/translate/ui/translate-options/TranslateOptions";
import TranslateOutput from "../../features/translate/ui/translate-output/TranslateOutput";
import styles from "./HomePage.module.css";

export default function HomePage() {

    return (
        <div className={styles.app}>

            {/* Translate section */}
            <div className={styles.appSection}>
                <h2>Translate</h2>
                <LangPanel />
                <TranslateInput />
                <TranslateOutput />
                <TranslateOptions />
            </div>
             

             {/* Dictionary section  */}
            <div className={styles.appSection}></div>
        </div>
    );
}