import styles from "./Button.module.css";


type ButtonProps = {
    transparent?: boolean
} & React.HTMLAttributes<HTMLButtonElement>; // rest button props


export default function Button({
    children, 
    transparent = false,
    className,
    ...rest
}: ButtonProps) {
    const transparentClass = (transparent) ? styles.transparent : ""; // make transparent if props tell so
    
    return (
        <button 
            className={`${styles.button} ${transparentClass} ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
}