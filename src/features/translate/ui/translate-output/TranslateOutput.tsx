import { useAppDispatch, useAppSelector } from "../../../../app/model/store/hooks";
import Button from "../../../../shared/ui/button/Button";
import { useSelectTranslateQueryLastResult } from "../../hooks/apiHooks";
import { selectCustomTranslation, setCustomTranslation } from "../../model/translateSlice";
import styles from "./TranslateOutput.module.css";


interface TranslateOutputProps {
    className?: string
}


export default function TranslateOutput({ className }: TranslateOutputProps) {
    const dispatch = useAppDispatch();

    const lastTranslateResult = useSelectTranslateQueryLastResult();
    const customTranslation = useAppSelector(selectCustomTranslation);

 
    return (
        <div className={`${styles.translateOutput} shadowedText ${className}`}>
            <textarea 
                value={customTranslation ?? lastTranslateResult?.translation} 
                onInput={(ev) => dispatch(setCustomTranslation(ev.currentTarget.value))} 
            />

            <div className={styles.buttonsWrap}>
                {/* nullify custom translation */} 
                <Button onClick={() => dispatch(setCustomTranslation(null))}>
                    Reset
                </Button>      

                <Button>Add -&gt;</Button>  {/* add to dictionary */}
            </div>
        </div>
    );
}