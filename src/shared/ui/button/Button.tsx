import styles from "./Button.module.css";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    transparent?: boolean,
    grow?: boolean,
}

export default function Button({
    children, 
    transparent = false,
    grow,
    className = "",
    ...rest
}: ButtonProps) {
    const transparentClass = transparent ? styles.transparent : ""; // make transparent if props tell so
    const growClass = grow ? styles.grow : "";

    return (
        <button 
            className={`${styles.button} ${transparentClass} ${growClass} ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
}