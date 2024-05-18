import { useEffect, useRef, useState} from "react";
import { useTitle } from "../hooks/useTitle";
import axios, { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { MessageResponseType } from "../Types/ResponseTypes";
import { useUserCookies } from "../hooks/useUserCokies";
import Preloader from "../Components/Preloader/Preloader";
import Layout from "../Components/Layout/Layout";

export default function PasswordConfirmResetPage() {
    useTitle("WorkFlow - Подтверждение сброса пароля");

    const { resetToken } = useParams();
    const navigate = useNavigate();
    const token = useUserCookies();
    const isSended = useRef<boolean>(false);
    const [isError, setError] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if(token) {
            navigate("/login");
            return;
        }

       if(!resetToken) {
            navigate("/404");
        }

        
       if(!isSended.current) {
        console.log("dewdew")
        axios.get(process.env.REACT_APP_SERVER_HOST + '/api/Authenfication/PasswordChangeConfirm/' + resetToken)
        .then(function () {
            alert("Пароль успешно сброшен, проверьте почту.")
            navigate("/login");
        })
        .catch(function (error: AxiosError<MessageResponseType>) {
            setError(error.response?.data.message);
            console.log(error);
        })
        .finally(function () {
            setIsLoading(false);
        })
       }

       isSended.current = true;
                
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    return (
        <Layout title="Подтверждение сброса пароля">
            {isLoading && <Preloader fixed={false} />}
            {isError && <p>Ошибка: {isError === "Wrong token or expires" ? "Неверная ссылка сброса пароля" : isError}</p>}
            {!isLoading && !isError && 
                <>
                    
                </>
            }
        </Layout>
    )
}