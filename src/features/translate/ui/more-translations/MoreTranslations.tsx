import { useAppSelector } from "../../../../app/model/store/hooks";
import { useTranslationResultSelector } from "../../api/translateApiSlice";
import { selectTranslateQueryData } from "../../model/translateSlice";
import styles from "./MoreTranslations.module.css";
import Option from "./ui/option/Option";

export default function TranslateOptions() {
    const queryData = useAppSelector(selectTranslateQueryData);
    const selectTranslateResult = useTranslationResultSelector(queryData);
    const moreTranslations = useAppSelector(selectTranslateResult).data?.moreTranslations;
    const translationElements = moreTranslations?.map((value, i) => <Option key={`t-${value}-${i}`} value={value?.translation} />);
    
    return (
        // Options with more translations
        <div className={styles.moreTranslations}>
            {
                translationElements
            }
        </div>
    );
}