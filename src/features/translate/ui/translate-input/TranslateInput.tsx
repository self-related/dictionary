import styles from "./TranslateInput.module.css";

interface TranslateInputProps {
    className?: string
}

export default function TranslateInput({ className }: TranslateInputProps) {

    return (
        <input
            className={`${styles.input} ${className}`}
        />
    );
}