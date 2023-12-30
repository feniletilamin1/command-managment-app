import { useEffect } from "react";
import RegisterForm from "../Components/AuthForms/RegisterForm";
import { useNavigate } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import { useTitle } from "../hooks/useTitle";
import { useUserCookies } from "../hooks/useUserCokies";

function RegisterPage() {
    useTitle("WorkFlow - Регистрация");
    const navigate = useNavigate();

    const token = useUserCookies();

    useEffect(() => {
        if(token) {
            navigate("/");
            return;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    return (
        <Layout>
            {!token && <RegisterForm />}
        </Layout>
    )
}

export default RegisterPage;