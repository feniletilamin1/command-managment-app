import { useEffect } from "react";
import AddTeamForm from "../Components/TeamForm/AddTeamForm";
import Layout from "../Components/Layout/Layout";
import { useTitle } from "../hooks/useTitle";
import { useNavigate } from "react-router-dom";
import { useUserCookies } from "../hooks/useUserCokies";

export default function AddTeamPage() {
    useTitle("WorkFlow - Новая команда")

    const navigate = useNavigate();
    const token = useUserCookies();
    
    useEffect(() => {
        if(!token) {
            navigate("/login");
            return;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {token &&
                <Layout title="Новая команда">
                    <AddTeamForm/>
                </Layout>
            }
        </>
    )
}