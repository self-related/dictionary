import { useAppDispatch } from "../../../../app/model/store/hooks";
import type { TranslationVerbose } from "../../api/types";
import { useSelectTranslateQueryLastResult } from "../../hooks/apiHooks";
import { setCustomTranslation } from "../../model/translateSlice";
import styles from "./MoreTranslations.module.css";
import TranslationOption from "./translation-option/TranslationOption";

interface TranslationsByGroupMap {
    [group: string]: string[]
}

// Component
export default function MoreTranslations() {
    const lastTranslateResult = useSelectTranslateQueryLastResult();
    const translationsByGroupMap = groupTranslations(lastTranslateResult?.moreTranslations);
    const translationGroupsJSX = usePrepGrouppedTranslationsJSX(translationsByGroupMap);
    
    return (
        <div className={styles.moreTranslations}>
            {
                translationGroupsJSX
            }
        </div>
    );
}


// Utils
function groupTranslations(moreTranslations: TranslationVerbose[] = []): TranslationsByGroupMap {
    const translationsByGroupMap = {} as TranslationsByGroupMap;

    if (moreTranslations) {
        for (const { wordClass: group, translation } of moreTranslations) {
            const addedAlready = translationsByGroupMap[group] ?? [];
            translationsByGroupMap[group] = [translation, ...addedAlready];
        }
    }

    return translationsByGroupMap;
}

function usePrepGrouppedTranslationsJSX(translationsByGroup: TranslationsByGroupMap): React.JSX.Element[] {
    const dispatch = useAppDispatch();
    const groupsJSX = [] as React.JSX.Element[];

    for (const group in translationsByGroup) {
        const currentGroupTranslations = translationsByGroup[group];
        const currentGroupJSX = (
            <div className={styles.wordGroup} key={`${group}-word-group`}>
                <span>{group}: </span>
                {
                    currentGroupTranslations.map((value, i) => (
                        <TranslationOption key={`t-${i}`} value={value} onClick={() => dispatch(setCustomTranslation(value))} />
                    ))
                }
            </div>
        );

        groupsJSX.push(currentGroupJSX);
    }

    return groupsJSX;
};