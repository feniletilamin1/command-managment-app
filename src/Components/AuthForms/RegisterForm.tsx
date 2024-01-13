import './AuthForms.css'
import axios, { AxiosError } from "axios";
import {useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterDto } from "../../Types/AuthenficationTypes";
import Preloader from '../Preloader/Preloader';
import { imageValidator } from '../../functions/ImageValidator';
import { useForm } from 'react-hook-form';
import { MessageResponseType } from '../../Types/ResponseTypes';

function RegisterForm() {
    const [loading, setLoading] = useState<boolean>(false);

    const { register, formState: { errors }, handleSubmit, watch, setError} = useForm({
        mode: "onBlur",
    });
    
    const navigate = useNavigate();

    const formSubmitHanlder = (data: RegisterDto) => {
        setLoading(true);

        data.photo = data.fileList![0];

        axios.post(process.env.REACT_APP_SERVER_HOST + '/api/Authenfication/Register', data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
        })
        .then(function () {
            navigate("/login");
        })
        .catch(function (error: AxiosError<MessageResponseType>) {
            if(error.response) {
                const errorMessage = error.response.data.message;
                if(errorMessage === "Email already taken")
                    setError('root.serverError', {
                    message: "Аккаунт с указанным email уже существует",
                })
            }
            else
            setError('root.serverError', {
                message: error.message,
            })
        })
        .finally(function () {
            setLoading(false);
        })
    }

    return(
        <>
            {loading && <Preloader fixed={false}/>}
            {!loading && 
                <form onSubmit={handleSubmit(formSubmitHanlder)} encType="multipart/form-data" className="main-form">
                    {errors.root && <span className="form__auth-error-text">{errors.root.serverError.message as string }</span>}
                    <label className="main-form__label" htmlFor="Photo">Фото png, jpeg, bmp, webp</label>
                    {errors.fileList && <span className="form__auth-error-text">{errors.fileList.message as string }</span>}
                    <input accept="image/png, image/jpeg, image/bmp, image/webp" type="file" id="Photo" className="main-form__input" {...register("fileList", {
                        required: "Загрузите фото",
                        validate: (file: FileList) => {
                            const validateImageResult: string | boolean = imageValidator(file[0]);
                            if(validateImageResult !== true){
                                console.log(validateImageResult)
                                return validateImageResult;
                            }
                        },
                    })}/>
                    <label className="main-form__label" htmlFor="LastName">Фамилия</label>
                    {errors.lastName && <span className="form__auth-error-text">{errors.lastName.message as string }</span>}
                    <input type="text" id="LastName" {...register("lastName", {
                        required: "Укажите фамилию"
                    })} className="main-form__input"/>
                    <label className="main-form__label" htmlFor="FirstName">Имя</label>
                    {errors.firstName && <span className="form__auth-error-text">{errors.firstName.message as string }</span>}
                    <input type="text" id="FirstName" className="main-form__input" {...register("firstName", {
                        required: "Укажите имя"
                    })}/>
                    <label className="main-form__label" htmlFor="MiddleName">Отчество</label>
                    <input type="text" id="MiddleName" className="main-form__input" {...register("middleName")}/>
                    <label className="main-form__label" htmlFor="Specialization">Специализация</label>
                    {errors.specialization && <span className="form__auth-error-text">{errors.specialization.message as string }</span>}
                    <input type="text" id="Specialization" className="main-form__input" {...register("specialization", {
                        required: "Укажите специализацию"
                    })}/>
                    <label className="main-form__label" htmlFor="Email">Email</label>
                    {errors.email && <span className="form__auth-error-text">{errors.email.message as string }</span>}
                    <input autoComplete="email"  type="email" id="Email" className="main-form__input" {...register('email', {
                        required: "Укажите email",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                            message: "Неверный email",
                        }
                    })}/>
                    <label className="main-form__label" htmlFor="Password">Пароль</label>
                    {errors.password && <span className="form__auth-error-text">{errors.password.message as string }</span>}
                    <input autoComplete="new-password" type="password" id="Password" className="main-form__input" {...register("password", {
                        required: "Введите пароль"
                    })}/>
                    <label className="main-form__label" htmlFor="PasswordSecure">Подтверждение пароля</label>
                    {errors.confirmPassword && <span className="form__auth-error-text">{errors.confirmPassword.message as string }</span>}
                    <input autoComplete="new-password" type="password" id="PasswordSecure" className="main-form__input" {...register("confirmPassword", {
                        required: "Подвердите пароль",
                        validate: (val: string) => {
                            if (watch('password') !== val) {
                                return "Пароли не совпадают";
                            }
                        },
                    })}/>
                    <input type="submit" className="main-form__submit" value="Создать аккаунт"/>
                </form>
            }
        </>
    )
}

export default RegisterForm;