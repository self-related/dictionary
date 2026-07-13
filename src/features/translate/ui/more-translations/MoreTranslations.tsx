import { useAppSelector } from "../../../../app/model/store/hooks";
import styles from "./MoreTranslations.module.css";
import Option from "./ui/option/Option";

export default function TranslateOptions() {
    const translationResult = useAppSelector(state => state.translateSlice.translateResult);
    const translationElements = translationResult?.moreTranslations?.map((value, i) => <Option key={`t-${value}-${i}`} value={value?.translation} />)
    
    return (
        // Options with more translations
        <div className={styles.moreTranslations}>
            {
                translationElements
            }
        </div>
    );
}