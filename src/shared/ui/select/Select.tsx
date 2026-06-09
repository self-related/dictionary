import styles from "./Select.module.css";


type SelectProps = {
    grow?: boolean,
} & React.HTMLAttributes<HTMLSelectElement>;


export default function Select({children, className = "", grow, ...rest}: SelectProps) {
    const growClass = (grow) ? styles.grow : "";

    return (
        <select className={`${styles.select} ${growClass} ${className}`} {...rest}>
            {children}
        </select>
    );
}