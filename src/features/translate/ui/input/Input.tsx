import styles from "./Input.module.css";

interface InputProps {
    className?: string
}

export default function Input({ className }: InputProps) {

    return (
        <input
            className={`${styles.input} ${className}`}
        />
    );
}