import DictionaryPanel from "../../features/dictionary/ui/dictionary-panel/DictionaryPanel";
import DictionaryItems from "../../features/dictionary/ui/dictionary-items/DictionaryItems";
import LangPanel from "../../features/translate/ui/lang-panel/LangPanel";
import TranslateInput from "../../features/translate/ui/translate-input/TranslateInput";
import MoreTranslations from "../../features/translate/ui/more-translations/MoreTranslations";
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
                <MoreTranslations />
            </div>
             

             {/* Dictionary section  */}
            <div className={styles.appSection}>
                <h2>Learn</h2>
                <DictionaryPanel />
                <DictionaryItems />
            </div>
        </div>
    );
}