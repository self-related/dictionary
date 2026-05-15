import styles from "./LangPanel.module.css";

interface LangPanelProps {
    className?: string
}

export default function LangPanel({ className }: LangPanelProps) {

    return (
        <div className={`${styles.langPanel} ${className}`}>
            
        </div>
    );
}