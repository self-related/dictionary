import HomePage from "../pages/home/HomePage";
import Layout from "./layout/Layout";
import "./App.css";

export default function App() {

    return (
        <Layout className="shadowedText defaultTheme orangeAccent">
            <HomePage />
        </Layout>
    );
}