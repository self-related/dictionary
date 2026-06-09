import styles from "./Select.module.css";

type SelectProps = React.HTMLAttributes<HTMLSelectElement>;

export default function Select({children, className = "", ...rest}: SelectProps) {

    return (
        <select className={`${styles.select} ${className}`} {...rest}>
            {children}
        </select>
    );
}