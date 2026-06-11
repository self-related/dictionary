import styles from "./WordItem.module.css"


interface WordItemProps {
    id: number,

    source: string,
    target: string,

    sourceLang: string,
    targetLang: string,
    
    otherTranslations?: string[],
    learned?: boolean,
}


export default function WordItem({
    source, target, sourceLang, targetLang, learned
}: WordItemProps) {
    const learnedClass = (learned) ? styles.learned : styles.notLearned;

    return (
        <div className={styles.wordItem}>

            <div className={styles.textWrap}>
                {/* source */}
                <p>
                    <span className={learnedClass}>{sourceLang}: </span>
                    {source}
                </p>
                
                {/* target */}
                <p>
                    <span className={learnedClass}>{targetLang}: </span>
                    {target}
                </p>
            </div>


            {/* buttons */}
            <div className={styles.buttonsWrap}>
                <button className={styles.closeBtn}>X</button>
                <button className={styles.learnedBtn}>🗸</button>
                <button className={styles.optionsBtn}>...</button>

            </div>

        </div>
    );
}