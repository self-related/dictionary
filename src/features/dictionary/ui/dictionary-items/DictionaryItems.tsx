import styles from "./DictionaryItems.module.css"
import ItemWrap from "./ui/item-wrap/ItemWrap";
import { useAppSelector } from "../../../../app/model/store/hooks";
import { getLanguageNamesFromDictionaryId } from "../../../../shared/config/languageNames";

export default function DictionaryWords() {
    const { dictionaries, settings } = useAppSelector(state => state.dictionarySlice);

    const items = dictionaries[settings.currentDictionaryId]?.items ?? [];
    const [sourceLang, targetLang] = getLanguageNamesFromDictionaryId(settings.currentDictionaryId);


    return (
        <div className={styles.dictionaryWords}>
            {
                (items?.length === 0)
                ?   <p className={styles.placeholder}>
                        No words yet
                    </p>
                : items?.map((item, i) => (
                    <ItemWrap key={i} 
                        sourceLang={sourceLang ?? "Original"}
                        targetLang={targetLang ?? "Translation"}
                        dictionaryId={settings.currentDictionaryId}
                        {...item}
                    />
                ))
            }
        </div>
    );
}