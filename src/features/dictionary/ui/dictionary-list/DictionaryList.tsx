import styles from "./DictionaryList.module.css"
import Item from "./item/Item";
import { useAppSelector } from "../../../../app/model/store/hooks";
import { getLanguageNamesFromDictionaryId } from "../../../../shared/config/languageNames";
import { selectDictionaryItemsReversed } from "../../model/dictionarySlice";
import { Category } from "./category/Category";


export default function DictionaryList() {
    const { currentDictionaryId } = useAppSelector(state => state.dictionarySlice.settings);

    const items = useAppSelector(state => selectDictionaryItemsReversed(state, currentDictionaryId));
    const [sourceLang, targetLang] = getLanguageNamesFromDictionaryId(currentDictionaryId);
    const blurItems = useAppSelector(state => state.dictionarySlice.settings.blurTranslations);

    return (
        <div className={styles.dictionaryList}>
            {
                (items?.length === 0)
                ?   <p className={styles.placeholder}>
                        No words yet
                    </p>
                : 
                    <Category name="Temp category" >
                    {

                        items?.map((item, i) => (
                            <Item key={i} 
                                sourceLang={sourceLang ?? "Original"}
                                targetLang={targetLang ?? "Translation"}
                                dictionaryId={currentDictionaryId}
                                blur={blurItems}
                                {...item}
                            />
                        ))
                    }   
                    </Category>
            }
        </div>
    );
}