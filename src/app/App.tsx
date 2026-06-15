import { Provider } from "react-redux";
import HomePage from "../pages/home/HomePage";
import Layout from "../shared/ui/layout/Layout";
import "./styles/global.css";
import "./styles/themes.css";
import { store } from "./model/store/store";

export default function App() {

    return (
        <Provider store={store}>
            <Layout>
                <HomePage />
            </Layout>
        </Provider>
    );
}