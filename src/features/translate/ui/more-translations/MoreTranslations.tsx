import type { TranslationVerbose } from "../../api/types";
import { useSelectTranslateQueryLastResult } from "../../hooks/apiHooks";
import styles from "./MoreTranslations.module.css";
import Option from "./ui/option/Option";

interface TranslationsByGroupMap {
    [group: string]: string[]
}

// Component
export default function MoreTranslations() {
    const lastTranslateResult = useSelectTranslateQueryLastResult();
    const translationsByGroupMap = groupTranslations(lastTranslateResult?.moreTranslations);
    const translationsGrouppedJSX = prepGrouppedTranslationsJSX(translationsByGroupMap);
    
    return (
        <div className={styles.moreTranslations}>
            {
                translationsGrouppedJSX
            }
        </div>
    );
}


// Utils
function groupTranslations(moreTranslations: TranslationVerbose[] = []): TranslationsByGroupMap {
    const translationsByGroupMap = {} as TranslationsByGroupMap;
    
    for (const { wordClass: group, translation } of moreTranslations) {
        const addedAlready = translationsByGroupMap[group] ?? [];
        translationsByGroupMap[group] = [translation, ...addedAlready];
    }

    return translationsByGroupMap;
}

function prepGrouppedTranslationsJSX(translationsByGroup: TranslationsByGroupMap): React.JSX.Element[] {
    const groupsJSX = [] as React.JSX.Element[];

    for (const group in translationsByGroup) {
        const currentGroupWords = translationsByGroup[group]
        const currentGroupJSX = (
            <div className={styles.wordGroup} key={`${group}-word-group`}>
                <span>{group}: </span>
                {
                    currentGroupWords.map((value, i) => (<Option key={`t-${i}`} value={value} />))
                }
            </div>
        );

        groupsJSX.push(currentGroupJSX);
    }

    return groupsJSX;
};