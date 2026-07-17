import { useState } from "react";
import styles from "./Layout.module.css";
import Button from "../button/Button";

interface LayoutProps {
    children?: React.ReactNode | string,
    className?: string
}

export default function Layout({
    children,
    className
}: LayoutProps) {

    // TODO: get all these from settings store
    const [accent] = useState("orangeAccent"); 
    const [colorScheme, setColorScheme] = useState(matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    console.log(`color scheme: ${colorScheme}`);

    // css mod
    const colorSchemeMod = (colorScheme === "dark") ? "darkTheme" : "lightTheme";

    return (
        <div className={`${styles.layout} ${accent} ${colorSchemeMod} ${className}`}>
            {/* Navbar */}
            <nav className={styles.navbar}>
                <p>Dictionary</p>
                <div className={styles.navbarButtons}>
                    <ColorSchemeBtn colorScheme={colorScheme} onClick={() => setColorScheme(val => val == "dark" ? "light" : "dark")} />
                </div>
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



function ColorSchemeBtn({ colorScheme, onClick }: { 
    colorScheme: string, 
    onClick?(): void
}) {

    return (
        <Button onClick={onClick}>
            {colorScheme === "dark" ? "☽" : "🌣"}
        </Button>
    );
}