import { useAppDispatch, useAppSelector } from "../../../../app/model/store/hooks";
import Button from "../../../../shared/ui/button/Button";
import Select from "../../../../shared/ui/select/Select";
import { setCurrentDictionary, switchBlurTranslations } from "../../model/dictionarySlice";
import styles from "./DictionaryPanel.module.css";


export default function DictionaryPanel() {
    const dispatch = useAppDispatch();

    const { dictionaries, settings} = useAppSelector(state => state.dictionarySlice);
    const dictionaryIds = Object.keys(dictionaries);

    const handleDictionaryChange = (event: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
        dispatch(setCurrentDictionary(event.currentTarget.value));
    };

    const blurActive = useAppSelector(state => state.dictionarySlice.settings.blurTranslations);

    return (
        <div className={styles.dictionaryPanel}>
            
            <Select onChange={handleDictionaryChange} id="dictionary-select" value={settings.currentDictionaryId} className={styles.dictionarySwitch}>
                {
                    dictionaryIds.map((id, i) => (
                        <option value={id} key={i}>
                            {dictionaries[id].name}
                        </option>
                    ))
                }
            </Select>

            <Button
                active={blurActive}
                onClick={() => dispatch(switchBlurTranslations())}
            >
                blur
            </Button>

        </div>
    );
}