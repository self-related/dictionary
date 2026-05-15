import styles from "./Translator.module.css";

interface TranslatorProps {
    className?: string
}

export default function Translator({ className }: TranslatorProps) {

    return (
        <div className={`${styles.className} ${className}`}>
            0
        </div>
    );
}