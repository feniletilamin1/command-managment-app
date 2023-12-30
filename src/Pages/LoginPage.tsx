import AuthForm from "../Components/AuthForms/AuthForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import { useTitle } from "../hooks/useTitle";
import { useUserCookies } from "../hooks/useUserCokies";

function LoginPage() {
    useTitle("WorkFlow - Авторизация");

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
        <>
            {!token && 
                <Layout>
                    <AuthForm/>
                </Layout>
            }
        </>
        
    )
}

export default LoginPage;