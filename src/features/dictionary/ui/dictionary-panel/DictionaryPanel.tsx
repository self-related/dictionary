import { useAppSelector } from "../../../../app/model/store/hooks";
import Select from "../../../../shared/ui/select/Select";
import styles from "./DictionaryPanel.module.css";


export default function DictionaryPanel() {
    const { dictionaries, settings} = useAppSelector(state => state.dictionarySlice);
    const dictionaryIds = Object.keys(dictionaries);

    return (
        <div className={styles.dictionaryPanel}>
            
            <Select id="dictionary-select" value={settings.currentDictionary} className={styles.dictionarySwitch}>
                <option value=""></option>
                {
                    dictionaryIds.map((id, i) => (
                        <option value={id} key={i}>
                            {dictionaries[id].name}
                        </option>
                    ))
                }
            </Select>

        </div>
    );
}