import styles from "./Button.module.css";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    transparent?: boolean,
    grow?: boolean,
    active?: boolean
}

export default function Button({
    children, 
    transparent = false,
    grow,
    className = "",
    active,
    ...rest
}: ButtonProps) {
    const transparentClass = transparent ? styles.transparent : ""; // make transparent if props tell so
    const growClass = grow ? styles.grow : "";
    const activeClass = active ? styles.active : "";

    return (
        <button 
            className={`${styles.button} ${transparentClass} ${growClass} ${activeClass} ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
}