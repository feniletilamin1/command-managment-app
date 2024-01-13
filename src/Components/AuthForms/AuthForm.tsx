import "./AuthForms.css"
import axios, { AxiosError } from "axios";
import {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Preloader from "../Preloader/Preloader";
import { MessageResponseType, LoginProfileResponce, LogInTypeDto } from "../../Types/ResponseTypes";
import { useAppDispatch } from "../../app/hook";
import { setUser } from "../../app/slices/userSlice";
import {useForm} from "react-hook-form";
import { getTeamsAsync } from "../../app/slices/teamSlice";

export default function  AuthForm() {
    const { register, formState: { errors }, handleSubmit, setError} = useForm({
        mode: "onBlur",
    });

    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const formSubmitHanlder = (data: LogInTypeDto) => {        

        setLoading(true);

        const cookies = new Cookies();
        const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);

        axios.post<LoginProfileResponce>(process.env.REACT_APP_SERVER_HOST + '/api/Authenfication/Login', data)
            .then (function (response) {
                cookies.set('jwt', response.data.jwt, { expires: expireDate, path: '/' });

                dispatch(setUser(response.data.user));
                dispatch(getTeamsAsync())
                navigate("/");
            })
            .catch(function (error: AxiosError<MessageResponseType>) {
                if(error.response) {
                    const errorMessage = error.response.data.message;
                    if(errorMessage === "Wrong login data")
                        setError('root.serverError', {
                        message: "Неверный логин или пароль",
                    })
                }
                else
                setError('root.serverError', {
                    message: error.message,
                })
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
                <label className="main-form__label" htmlFor="Password">Пароль</label>
                {errors.password && <span className="form__auth-error-text">{errors.password?.message as string }</span>}
                <input autoComplete='current-password' type="password" id="Password" className="main-form__input" {...register('password', {
                    required: "Введите пароль",
                })}/>
                <input type="submit" className="main-form__submit" value="Войти"/>
                <Link to="/password-reset" className="form__auth-link">Забыли пароль?</Link>
            </form>}
        </> 
    )
}
