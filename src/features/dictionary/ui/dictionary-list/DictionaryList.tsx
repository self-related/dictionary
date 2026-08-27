import styles from "./DictionaryList.module.css"
import Item from "./item/Item";
import { useAppSelector } from "../../../../app/model/store/hooks";
import { getLanguageNamesFromDictionaryId } from "../../../../shared/config/languageNames";
import { selectDictionaryItemsCategorizedReversed } from "../../model/dictionarySlice";
import { Category } from "./category/Category";


export default function DictionaryList() {
    const { currentDictionaryId } = useAppSelector(state => state.dictionarySlice.settings);
    const [notLearnedItems, learnedItems] = useAppSelector(state => selectDictionaryItemsCategorizedReversed(state, currentDictionaryId));

    const [sourceLang, targetLang] = getLanguageNamesFromDictionaryId(currentDictionaryId);
    const blurItems = useAppSelector(state => state.dictionarySlice.settings.blurTranslations);

    // Return on empty items
    if (notLearnedItems.length === 0 && learnedItems.length === 0) {
        return (
           <div className={ styles.dictionaryList }>
                <p className={ styles.placeholder }>
                    No words yet
                </p>
           </div> 
        );
    }

    return (
        <div className={styles.dictionaryList}>
            
            {/* Not Learned items  */}
            <Category name="Not Learned" >
                {
                    notLearnedItems.length > 0
                    ? notLearnedItems.map((item, i) => (
                        <Item key={i} 
                            sourceLang={sourceLang ?? "Original"}
                            targetLang={targetLang ?? "Translation"}
                            dictionaryId={currentDictionaryId}
                            blur={blurItems}
                            {...item}
                        />
                    ))
                    : ""
                }   
            </Category>

            {/* Learned items */}
            <Category name="Learned">
                {
                    learnedItems.length > 0
                    ? learnedItems.map((item, i) => (
                        <Item key={i} 
                            sourceLang={sourceLang ?? "Original"}
                            targetLang={targetLang ?? "Translation"}
                            dictionaryId={currentDictionaryId}
                            blur={blurItems}
                            {...item}
                        />
                    ))
                    : ""
                }
            </Category>
        </div>
    );
}