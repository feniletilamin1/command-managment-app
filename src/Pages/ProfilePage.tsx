import { useNavigate } from "react-router-dom";
import Profile from "../Components/Profile/Profile";
import ProfileEditForm from "../Components/ProfileEditForm/ProfileEditForm";
import { useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import {useAppSelector } from "../app/hook";
import { useTitle } from "../hooks/useTitle";
import { useUserCookies } from "../hooks/useUserCokies";


export default function ProfilePage() {
    const { user } = useAppSelector((state) => state.user);

    useTitle("WorkFlow - Профиль");

    const navigate = useNavigate();

    const token = useUserCookies();

    useEffect(() => {
        if(!token) {
            navigate("/login");
            return;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout title="Профиль">
            {user && <>
                <Profile user={user} />
                <ProfileEditForm user={user}/>
            </>}
        </Layout>
    )
}