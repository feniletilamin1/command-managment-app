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

        axios.post('https://localhost:7138/api/Authenfication/Register', data, {
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
                <form onSubmit={handleSubmit(formSubmitHanlder)} encType="multipart/form-data" className="form-auth">
                    {errors.root && <span className="form__auth-error-text">{errors.root.serverError.message as string }</span>}
                    <label className="form-auth__label" htmlFor="Photo">Фото png, jpeg, bmp, webp</label>
                    {errors.fileList && <span className="form__auth-error-text">{errors.fileList.message as string }</span>}
                    <input accept="image/png, image/jpeg, image/bmp, image/webp" type="file" id="Photo" className="form-auth__input" {...register("fileList", {
                        required: "Загрузите фото",
                        validate: (file: FileList) => {
                            const validateImageResult: string | boolean = imageValidator(file[0]);
                            if(validateImageResult !== true){
                                console.log(validateImageResult)
                                return validateImageResult;
                            }
                        },
                    })}/>
                    <label className="form-auth__label" htmlFor="LastName">Фамилия</label>
                    {errors.lastName && <span className="form__auth-error-text">{errors.lastName.message as string }</span>}
                    <input type="text" id="LastName" {...register("lastName", {
                        required: "Укажите фамилию"
                    })} className="form-auth__input"/>
                    <label className="form-auth__label" htmlFor="FirstName">Имя</label>
                    {errors.firstName && <span className="form__auth-error-text">{errors.firstName.message as string }</span>}
                    <input type="text" id="FirstName" className="form-auth__input" {...register("firstName", {
                        required: "Укажите имя"
                    })}/>
                    <label className="form-auth__label" htmlFor="MiddleName">Отчество</label>
                    <input type="text" id="MiddleName" className="form-auth__input" {...register("middleName")}/>
                    <label className="form-auth__label" htmlFor="Specialization">Специализация</label>
                    {errors.specialization && <span className="form__auth-error-text">{errors.specialization.message as string }</span>}
                    <input type="text" id="Specialization" className="form-auth__input" {...register("specialization", {
                        required: "Укажите специализацию"
                    })}/>
                    <label className="form-auth__label" htmlFor="Email">Email</label>
                    {errors.email && <span className="form__auth-error-text">{errors.email.message as string }</span>}
                    <input  type="email" id="Email" className="form-auth__input" {...register('email', {
                        required: "Укажите email",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                            message: "Неверный email",
                        }
                    })}/>
                    <label className="form-auth__label" htmlFor="Password">Пароль</label>
                    {errors.password && <span className="form__auth-error-text">{errors.password.message as string }</span>}
                    <input autoComplete="true" type="password" id="Password" className="form-auth__input" {...register("password", {
                        required: "Введите пароль"
                    })}/>
                    <label className="form-auth__label" htmlFor="PasswordSecure">Подтверждение пароля</label>
                    {errors.confirmPassword && <span className="form__auth-error-text">{errors.confirmPassword.message as string }</span>}
                    <input autoComplete="true" type="password" id="PasswordSecure" className="form-auth__input" {...register("confirmPassword", {
                        required: "Подвердите пароль",
                        validate: (val: string) => {
                            if (watch('password') !== val) {
                                return "Пароли не совпадают";
                            }
                        },
                    })}/>
                    <input type="submit" className="form-auth__submit" value="Создать аккаунт"/>
                </form>
            }
        </>
    )
}

export default RegisterForm;