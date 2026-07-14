import styles from "./Select.module.css";


interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    grow?: boolean,
};


export default function Select({children, className = "", grow, ...rest}: SelectProps) {
    const growClass = (grow) ? styles.grow : "";

    return (
        <select className={`${styles.select} ${growClass} ${className}`} {...rest}>
            {children}
        </select>
    );
}