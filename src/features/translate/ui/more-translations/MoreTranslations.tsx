import { useSelectTranslateQueryLastResult } from "../../hooks/apiHooks";
import styles from "./MoreTranslations.module.css";
import Option from "./ui/option/Option";


export default function MoreTranslations() {
    const lastTranslateResult = useSelectTranslateQueryLastResult();
    const translationElements = lastTranslateResult?.moreTranslations?.map((value, i) => <Option key={`t-${value}-${i}`} value={value?.translation} />);
    
    return (
        // Options with more translations
        <div className={styles.moreTranslations}>
            {
                translationElements
            }
        </div>
    );
}