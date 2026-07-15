import styles from "./TranslationOption.module.css";

interface OptionProps {
    value: string;
    onClick?: () => void
}

export default function TranslationOption({
    value,
    onClick
}: OptionProps) {

    return (
        <button className={styles.option} onClick={onClick ?? void(0)}>
            {value}
        </button>
    );
}