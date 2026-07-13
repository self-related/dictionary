import { useAppSelector } from "../../../../app/model/store/hooks";
import { selectGetTranslationResult } from "../../api/translateApiSlice";
import { selectTranslateQueryPayload } from "../../model/translateSlice";
import styles from "./MoreTranslations.module.css";
import Option from "./ui/option/Option";

export default function TranslateOptions() {
    const translateQueryLastData = useAppSelector(selectTranslateQueryPayload);
    const lastQueryData = useAppSelector(selectGetTranslationResult(translateQueryLastData)).data;
    const translationElements = lastQueryData?.moreTranslations?.map((value, i) => <Option key={`t-${value}-${i}`} value={value?.translation} />);
    
    return (
        // Options with more translations
        <div className={styles.moreTranslations}>
            {
                translationElements
            }
        </div>
    );
}