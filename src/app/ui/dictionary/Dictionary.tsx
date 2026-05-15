import styles from "./Dictionary.module.css"

interface DictionaryProps {
    className?: string
}

export default function Dictionary({ className }: DictionaryProps) {

    return (
        <div className={`${styles.className} ${className}`}>
            0
        </div>
    );
}