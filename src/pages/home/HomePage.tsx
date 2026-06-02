import LangPanel from "../../features/translate/ui/lang-panel/LangPanel";
import styles from "./HomePage.module.css";

export default function HomePage() {

    return (
        <main className={styles.app}>

            {/* Translate section */}
            <div className={styles.appSection}>
                <h2>Translate</h2>
                <LangPanel />
            </div>
             

             {/* Dictionary section  */}
            <div className={styles.appSection}></div>
        </main>
    );
}