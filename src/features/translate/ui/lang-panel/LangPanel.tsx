import styles from "./LangPanel.module.css";
import { langListsByProvider } from "../../api/providers";
import { useState } from "react";
import Button from "../../../../shared/ui/button/Button";
import Select from "../../../../shared/ui/select/Select";

interface LangPanelProps {
    className?: string
}

const provider = "google"; // temp constant before store defined

export default function LangPanel({ className = "" }: LangPanelProps) {
    const langList = langListsByProvider[provider];

    const langIds = Object.keys(langList);
    const targetLangIds = Object.keys(langList).filter(id => id !== "auto"); // skip auto

    // replace by store state
    const [sourceLangId] = useState(langIds[0]);
    const [targetLangId] = useState(targetLangIds[0]);


    return (
        <div className={`${styles.langPanel} ${className}`}>

            {/* Source lang selector */}
            <Select id="" defaultValue={sourceLangId} grow>
                {
                    langIds.map((langId) => (
                        <option value={langId} key={langId}>{langList[langId]}</option>
                    ))
                }
            </Select>


            {/* Switch button  */}
            <Button transparent>&lt;-&gt;</Button>


            {/* Target lang selector */}
            <Select id="" defaultValue={targetLangId} grow>
                {
                    targetLangIds.map((langId) => (
                        <option value={langId} key={langId}>{langList[langId]}</option>
                    ))
                }
            </Select>

        </div>
    );
}