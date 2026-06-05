import styles from "./Option.module.css";

interface OptionProps {
    value: string;
}

export default function Option({
    value
}: OptionProps) {

    return (
        <button className={styles.option}>
            {value}
        </button>
    );
}