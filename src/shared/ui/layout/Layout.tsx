import styles from "./Layout.module.css";
import Button from "../button/Button";
import { useAppDispatch, useAppSelector } from "../../../app/model/store/hooks";
import { switchAccentColor, switchColorScheme } from "../../../features/globalSettings/model/globalSettingsSlice";

interface LayoutProps {
    children?: React.ReactNode | string,
    className?: string
}

export default function Layout({
    children,
    className
}: LayoutProps) {
    const dispatch = useAppDispatch();
    const { accentColor, colorScheme } = useAppSelector(state => state.globalSettingsSlice);

    // css mod
    const colorSchemeCSS = 
    colorScheme === "dark" ? "darkTheme" : 
    colorScheme === "light" ? "lightTheme" : "";


    return (
        <div className={`${styles.layout} ${accentColor}Accent ${colorSchemeCSS} ${className}`}>
            {/* Navbar */}
            <nav className={styles.navbar}>
                <div className={styles.navbarButtons}>
                    <ColorSchemeBtn colorScheme={colorScheme} onClick={() => dispatch(switchColorScheme())} />

                    {/* accent color switcher */}
                    <Button className={ styles.accentColorBtn } onClick={() => dispatch(switchAccentColor())}>
                        <p style={{ backgroundColor: accentColor }}> </p>
                    </Button>
                </div>

                <h1 className={styles.navbarTitle}>
                    Dictionary
                </h1>
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
    const colorSchemeBtnIcon = 
    colorScheme === "dark" ? "☽" 
    : colorScheme === "light" ? "🌣" 
    : "☽/🌣";

    const colorSchemeIsAutoCSS = colorScheme === "auto" ? styles.colorSchemeIsAutoBtnMod : "";

    return (
        <Button onClick={onClick} className={`${styles.colorSchemeBtn} ${colorSchemeIsAutoCSS}`}>
            {colorSchemeBtnIcon}
        </Button>
    );
}