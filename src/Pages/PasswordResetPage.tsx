import ResetPasswordForm from "../Components/AuthForms/ResetPasswordForm";
import Layout from "../Components/Layout/Layout";
import { useTitle } from "../hooks/useTitle";

function PasswordResetPage() {
    useTitle("WorkFlow - Сброс пароль");
    
    return (
        <>
                <Layout>
                    <ResetPasswordForm />
                </Layout>
        </>
        
    )
}

export default PasswordResetPage;