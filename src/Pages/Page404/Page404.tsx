import "./Page404.css";
import Layout from "../../Components/Layout/Layout";
import { Link } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";

export default function Page404() {

    useTitle("WorkFlow - 404")

    return(
        <Layout>
             <div className="error-page">
                <div className="error-page__content">
                    <h1 className="error-page__title">404</h1>
                    <p className="error-page__message">Страница не найдена</p>
                    <Link to="/" className="error-page__link">На главную</Link>
                </div>
            </div>
        </Layout>
    )
}