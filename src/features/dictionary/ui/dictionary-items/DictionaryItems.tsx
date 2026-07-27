import styles from "./DictionaryItems.module.css"
import ItemWrap from "./ui/item-wrap/ItemWrap";
import { useAppSelector } from "../../../../app/model/store/hooks";

export default function DictionaryWords() {
    const { dictionaries, settings } = useAppSelector(state => state.dictionarySlice);

    const currentDictionary = dictionaries[settings.currentDictionary]?.items ?? [];
    const keys = Object.keys(dictionaries[settings.currentDictionary]?.items);


    return (
        <div className={styles.dictionaryWords}>
            {
                (keys?.length === 0)
                ? <p className={styles.placeholder}>No words yet</p>
                : keys?.map((key, i) => <ItemWrap key={i} {...currentDictionary[key]} />)
            }
        </div>
    );
}