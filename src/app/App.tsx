import HomePage from "../pages/home/HomePage";
import Layout from "../shared/ui/layout/Layout";
import "./styles/global.css";
import "./styles/themes.css";

export default function App() {

    return (
        <Layout>
            <HomePage />
        </Layout>
    );
}