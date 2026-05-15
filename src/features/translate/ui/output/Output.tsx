import styles from "./Output.module.css";

interface OutputProps {
    className?: string
}

export default function Output({ className }: OutputProps) {

    return (
        <div className={`${styles.output} ${className}`}>
            
        </div>
    );
}