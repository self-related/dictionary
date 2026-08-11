import styles from "./DictionaryItems.module.css"
import ItemWrap from "./ui/item-wrap/ItemWrap";
import { useAppSelector } from "../../../../app/model/store/hooks";
import { getLanguageNamesFromDictionaryId } from "../../../../shared/config/languageNames";
import { selectDictionaryItemsReversed } from "../../model/dictionarySlice";

export default function DictionaryWords() {
    const { currentDictionaryId } = useAppSelector(state => state.dictionarySlice.settings);

    const items = useAppSelector(state => selectDictionaryItemsReversed(state, currentDictionaryId));
    const [sourceLang, targetLang] = getLanguageNamesFromDictionaryId(currentDictionaryId);
    const blurItems = useAppSelector(state => state.dictionarySlice.settings.blurTranslations);

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
                        dictionaryId={currentDictionaryId}
                        blur={blurItems}
                        {...item}
                    />
                ))
            }
        </div>
    );
}