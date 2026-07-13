import { useAppDispatch, useAppSelector } from "../../../../app/model/store/hooks";
import Button from "../../../../shared/ui/button/Button";
import { useTranslationResultSelector } from "../../api/translateApiSlice";
import { selectMainTranslation, selectTranslateQueryData, setMainTranslation } from "../../model/translateSlice";
import styles from "./TranslateOutput.module.css";

interface TranslateOutputProps {
    className?: string
}

export default function TranslateOutput({ className }: TranslateOutputProps) {
    const dispatch = useAppDispatch();
    const translateQueryLastData = useAppSelector(selectTranslateQueryData);

    const selectTranslateQueryResult = useTranslationResultSelector(translateQueryLastData);
    const translateQueryLastResult = useAppSelector(selectTranslateQueryResult);

    const mainTranslation = useAppSelector(selectMainTranslation);

    return (
        <div className={`${styles.translateOutput} shadowedText ${className}`}>
            <textarea 
                value={mainTranslation ?? translateQueryLastResult.data?.translation} 
                onInput={(ev) => dispatch(setMainTranslation(ev.currentTarget.value))} 
            />

            <div className={styles.buttonsWrap}>
                <Button>Reset</Button>      {/* reset to default translation (if option was chosen) */}
                <Button>Add -&gt;</Button>  {/* add to dictionary */}
            </div>
        </div>
    );
}