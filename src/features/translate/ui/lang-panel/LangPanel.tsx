import styles from "./LangPanel.module.css";
import { langLists } from "../../api/providers";
import { useState } from "react";
import Button from "../../../../shared/ui/button/Button";

interface LangPanelProps {
    className?: string
}

const provider = "google"; // temp constant before store defined

export default function LangPanel({ className = "" }: LangPanelProps) {
    const langList = langLists[provider];

    const langIds = Object.keys(langList);
    const targetLangIds = Object.keys(langList).filter(id => id !== "auto"); // skip auto

    // replace by store state
    const [sourceLangId] = useState(langIds[0]);
    const [targetLangId] = useState(targetLangIds[0]);


    return (
        <div className={`${styles.langPanel} ${className}`}>

            {/* Source lang selector */}
            <select name="" id="" defaultValue={sourceLangId} className={styles.select}>
                {
                    langIds.map((langId) => (
                        <option value={langId} key={langId}>{langList[langId]}</option>
                    ))
                }
            </select>


            {/* Switch button  */}
            <Button transparent>&lt;-&gt;</Button>


            {/* Target lang selector */}
            <select name="" id="" defaultValue={targetLangId} className={styles.select}>
                {
                    targetLangIds.map((langId) => (
                        <option value={langId} key={langId}>{langList[langId]}</option>
                    ))
                }
            </select>

        </div>
    );
}