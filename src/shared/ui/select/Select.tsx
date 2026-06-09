import styles from "./Select.module.css";

type SelectProps = React.HTMLAttributes<HTMLSelectElement>;

export default function Select({children, ...rest}: SelectProps) {

    return (
        <select className={styles.select} {...rest}>
            {children}
        </select>
    );
}