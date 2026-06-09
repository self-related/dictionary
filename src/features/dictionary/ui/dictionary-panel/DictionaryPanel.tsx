import Select from "../../../../shared/ui/select/Select";
import styles from "./DictionaryPanel.module.css";


export default function DictionaryPanel() {

    return (
        <div className={styles.dictionaryPanel}>
            
            <Select id="dictionary-select" className={styles.dictionarySwitch}>
                <option value="eng-esp">English - Spanish</option> {/* placeholder */}
            </Select>

        </div>
    );
}