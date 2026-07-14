import styles from "./LangPanel.module.css";
import { langListsByProvider } from "../../api/providers";
import Button from "../../../../shared/ui/button/Button";
import Select from "../../../../shared/ui/select/Select";
import { useAppDispatch, useAppSelector } from "../../../../app/model/store/hooks";
import { selectCustomTranslation, setCustomTranslation, setSourceLang, setSourceText, setTargetLang, switchLangs } from "../../model/translateSlice";
import { useSelectTranslateQueryLastResult } from "../../hooks/apiHooks";

interface LangPanelProps {
    className?: string
}


export default function LangPanel({ className = "" }: LangPanelProps) {
    const dispatch = useAppDispatch();

    const { 
        provider, 
        sourceLang, 
        targetLang,
        sourceText
    } = useAppSelector(state => state.translateSlice.translateQueryPayload);

    const customTranslation = useAppSelector(selectCustomTranslation);
    const translation = useSelectTranslateQueryLastResult()?.translation;
    
    const currentLangList = langListsByProvider[provider];
    const langs = Object.keys(currentLangList);
    const targetLangs = Object.keys(currentLangList).filter(id => id !== "auto"); // skip auto for target


    const handleSwitchLangs = () => {
        if (sourceLang == "auto") {
            return; // skip auto for now
        }
        
        dispatch(switchLangs());

        if (customTranslation) {
            dispatch(setSourceText(customTranslation));
            dispatch(setCustomTranslation(sourceText));
        } else if (translation) {
            dispatch(setSourceText(translation));
            dispatch(setCustomTranslation(sourceText));
        }
    };


    return (
        <div className={`${styles.langPanel} ${className}`}>

            {/* Source lang selector */}
            <Select id="" value={sourceLang} onChange={(ev) => dispatch(setSourceLang(ev.currentTarget.value))} grow>
                {
                    langs.map((lang) => (
                        <option value={lang} key={lang}>{currentLangList[lang]}</option>
                    ))
                }
            </Select>


            {/* Switch button  */}
            <Button transparent onClick={handleSwitchLangs}>&lt;-&gt;</Button>


            {/* Target lang selector */}
            <Select id="" value={targetLang} onChange={(ev) => dispatch(setTargetLang(ev.currentTarget.value))} grow>
                {
                    targetLangs.map((lang) => (
                        <option value={lang} key={lang}>{currentLangList[lang]}</option>
                    ))
                }
            </Select>

        </div>
    );
}