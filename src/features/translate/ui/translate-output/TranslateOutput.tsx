import styles from "./TranslateOutput.module.css";

interface TranslateOutputProps {
    className?: string
}

export default function TranslateOutput({ className }: TranslateOutputProps) {

    return (
        <div className={`${styles.translateOutput} ${className}`}>
            
        </div>
    );
}