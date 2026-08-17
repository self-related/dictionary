import { useState } from "react";
import styles from "./Layout.module.css";
import Button from "../button/Button";
import { useAppDispatch, useAppSelector } from "../../../app/model/store/hooks";
import { selectColorScheme, switchColorScheme } from "../../../features/globalSettings/model/globalSettingsSlice";

interface LayoutProps {
    children?: React.ReactNode | string,
    className?: string
}

export default function Layout({
    children,
    className
}: LayoutProps) {
    const dispatch = useAppDispatch();

    // TODO: get all these from settings store
    const [accent] = useState("orangeAccent"); 
    const colorScheme = useAppSelector(selectColorScheme);
    console.log(`color scheme: ${colorScheme}`);

    // css mod
    const colorSchemeMod = (colorScheme === "dark") ? "darkTheme" : "lightTheme";

    return (
        <div className={`${styles.layout} ${accent} ${colorSchemeMod} ${className}`}>
            {/* Navbar */}
            <nav className={styles.navbar}>
                <p>Dictionary</p>
                <div className={styles.navbarButtons}>
                    <ColorSchemeBtn colorScheme={colorScheme} onClick={() => dispatch(switchColorScheme())} />
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