import { useState } from "react";
import styles from "./Layout.module.css";

interface LayoutProps {
    children?: React.ReactNode | string,
    className?: string
}

export default function Layout({
    children,
    className
}: LayoutProps) {

    const [accent] = useState("orangeAccent"); // get from settings store

    return (
        <div className={`${styles.layout} ${accent} ${className}`}>
            {/* Navbar */}
            <nav className={styles.navbar}>
                <p>Dictionary</p>
            </nav> 

            {/* Inner content */}
            <main className={styles.main}>
                {children}
            </main>

            {/* Footer */}
            <footer className={styles.footer}>
                <p>2026</p>
            </footer>
        </div>
    );
}