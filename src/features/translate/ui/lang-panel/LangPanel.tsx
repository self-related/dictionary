import styles from "./LangPanel.module.css";
import { langLists } from "../../api/providers";

interface LangPanelProps {
    className?: string
}

const provider = "google"; // temp constant before store defined

export default function LangPanel({ className = "" }: LangPanelProps) {
    const langList = langLists[provider];
    const langIds = Object.keys(langList);


    return (
        <div className={`${styles.langPanel} ${className}`}>

            {/* Source lang  */}
            <select name="" id="" defaultValue={"auto"} className={styles.select}>
                {
                    langIds.map((langId) => (
                        <option value={langId}>{langList[langId]}</option>
                    ))
                }
            </select>


            {/* Switch button  */}
            <button className={styles.switchBtn}>&lt;-&gt;</button>


            {/* Target lang  */}
            <select name="" id="" defaultValue={"en"} className={styles.select}>
                {
                    langIds.map((langId) => (
                        <option value={langId}>{langList[langId]}</option>
                    ))
                }
            </select>

        </div>
    );
}