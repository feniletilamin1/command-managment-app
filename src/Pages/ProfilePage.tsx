import { useNavigate } from "react-router-dom";
import Profile from "../Components/Profile/Profile";
import ProfileEditForm from "../Components/ProfileEditForm/ProfileEditForm";
import { useEffect, useState } from "react";
import Preloader from "../Components/Preloader/Preloader";
import Layout from "../Components/Layout/Layout";
import {useAppSelector } from "../app/hook";
import { useTitle } from "../hooks/useTitle";
import { useUserCookies } from "../hooks/useUserCokies";


export default function ProfilePage() {
    const { user } = useAppSelector((state) => state.user);

    useTitle("WorkFlow - Профиль");

    const [loading, setLoading] = useState<boolean>(false);

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
            {loading && <Preloader fixed={false}/>}
            {!loading && user && <>
                <Profile user={user} />
                <ProfileEditForm user={user} setLoading={setLoading}/>
            </>}
        </Layout>
    )
}