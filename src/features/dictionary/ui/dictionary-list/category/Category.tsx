import { useState } from "react";
import styles from "./Category.module.css"


interface CategoryProps {
    name: string,
    children: React.ReactNode,
    className?: string
}


export function Category({ name, children, className }: CategoryProps) {
    const [collapsed, setCollapsed] = useState(false);
    const collapsedBtnText = collapsed ? "+" : "-";
    
    return (
        <div className={ `${styles.component} ${className}` }>

            {/* Header */}
            <div onClick={ () => setCollapsed(val => !val) } className={ styles.header }>
                <h3>{ name }</h3>
                <button >{ collapsedBtnText }</button>
            </div>

            {/* Items */}
            <div className={ styles.children }>
                { 
                    collapsed ? "" : children
                }
            </div>
        </div>
    );
}