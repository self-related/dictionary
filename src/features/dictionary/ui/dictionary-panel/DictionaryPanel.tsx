import { useAppDispatch, useAppSelector } from "../../../../app/model/store/hooks";
import Button from "../../../../shared/ui/button/Button";
import Select from "../../../../shared/ui/select/Select";
import { setCurrentDictionary, switchBlurTranslations } from "../../model/dictionarySlice";
import styles from "./DictionaryPanel.module.css";


export default function DictionaryPanel() {
    const dispatch = useAppDispatch();

    const { dictionaries, settings} = useAppSelector(state => state.dictionarySlice);
    const dictionaryIds = Object.keys(dictionaries).filter(id => id !== ""); // avoid empty placeholder

    const handleDictionaryChange = (event: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
        dispatch(setCurrentDictionary(event.currentTarget.value));
    };

    const blurActive = useAppSelector(state => state.dictionarySlice.settings.blurTranslations);

    return (
        <div className={styles.dictionaryPanel}>
            
            <Select onChange={handleDictionaryChange} id="dictionary-select" value={settings.currentDictionaryId} className={styles.dictionarySwitch}>
                {
                    dictionaryIds.length > 0
                    ? dictionaryIds.map((id, i) => (
                        <option value={id} key={i}>
                            {dictionaries[id].name}
                        </option>
                    ))
                    : <option value="">&lt;no dictionaries&gt;</option>
                }
            </Select>

            <Button
                active={blurActive}
                title="Blur all translations"
                onClick={() => dispatch(switchBlurTranslations())}
            >
                blur
            </Button>

        </div>
    );
}