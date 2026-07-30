import { useAppDispatch, useAppSelector } from "../../../../app/model/store/hooks";
import Select from "../../../../shared/ui/select/Select";
import { setCurrentDictionary } from "../../model/dictionarySlice";
import styles from "./DictionaryPanel.module.css";


export default function DictionaryPanel() {
    const dispatch = useAppDispatch();

    const { dictionaries, settings} = useAppSelector(state => state.dictionarySlice);
    const dictionaryIds = Object.keys(dictionaries);

    const handleDictionaryChange = (event: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
        dispatch(setCurrentDictionary(event.currentTarget.value));
    };

    return (
        <div className={styles.dictionaryPanel}>
            
            <Select onChange={handleDictionaryChange} id="dictionary-select" value={settings.currentDictionaryId} className={styles.dictionarySwitch}>
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