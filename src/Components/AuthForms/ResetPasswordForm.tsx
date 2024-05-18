import { useForm } from "react-hook-form";
import "./AuthForms.css"
import axios, { AxiosError } from "axios";
import Preloader from "../Preloader/Preloader";
import { MessageResponseType } from "../../Types/ResponseTypes";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ResetPasswordDto } from "../../Types/AuthenficationTypes";


export default function ResetPasswordForm() {

    const { register, formState: { errors }, handleSubmit, setError} = useForm({
        mode: "onBlur",
    });

    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const formSubmitHanlder = (data: ResetPasswordDto) => {        
        setLoading(true);

        axios.get(process.env.REACT_APP_SERVER_HOST + '/api/Authenfication/PasswordReset/' + data.email)
            .then (function () {
                alert("Ссылка для сброса пароля отправлена на почту.")
                navigate("/login");
            })
            .catch(function (error: AxiosError<MessageResponseType>) {
                if(error.response) {
                    setError('root.serverError', {
                        message: error.response.data.message,
                    })
                }
            })
            .finally(function () {
                setLoading(false);
            });
    }

    return (
        <>
            {loading && <Preloader fixed={false}/>}
            {!loading && 
            <form onSubmit={handleSubmit(formSubmitHanlder)} className="main-form">
                {errors.root && <span className="form__auth-error-text">{errors.root.serverError.message as string }</span>}
                <label className="main-form__label" htmlFor="Email">Email</label>
                {errors.email && <span className="form__auth-error-text">{errors.email.message as string}</span>}
                <input autoComplete="email" type="email" id="Email" className="main-form__input" {...register('email', {
                    required: "Введите email",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                        message: "Неверный email",
                    }
                })}/>
                <input type="submit" className="main-form__submit" value="Сбросить пароль"/>
            </form>}
        </> 
    )
}
