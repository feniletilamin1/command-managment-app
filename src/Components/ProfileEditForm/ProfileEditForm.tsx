import { ChangePasswordDto, UpdateDto } from '../../Types/AuthenficationTypes';
import './ProfileEditForm.css';
import axios, { AxiosError } from 'axios';
import { UserType } from '../../Types/ModelsType';
import { MessageResponseType, UpdateProfileResponce } from '../../Types/ResponseTypes';
import Cookies from 'universal-cookie';
import { useAppDispatch } from '../../app/hook';
import { setUser } from '../../app/slices/userSlice';
import { useForm } from 'react-hook-form';

type ProfileEditFormProps = {
    user: UserType,
}

export default function ProfileEditForm (props: ProfileEditFormProps) {
    const { user } = props;
    const dispatch = useAppDispatch();

    const cookies = new Cookies();
    const token: string | null = cookies.get("jwt");

    const updateProfileForm = useForm({
        mode: "onBlur",
    });

    const updatePasswordForm = useForm({
        mode: "onBlur",
    });
    

    const changePassWordHandler = (data: ChangePasswordDto) => {
        axios.put<MessageResponseType>(process.env.REACT_APP_SERVER_HOST + '/api/Authenfication/PasswordChange', data, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
        .then(function () {
            updatePasswordForm.reset();
            alert("Пароль успешно изменен.");
        })
        .catch(function (error: AxiosError<MessageResponseType>) {
            if(error.response) {
                const errorMessage = error.response.data.message;
                updatePasswordForm.setError('root.serverError', {
                    message: errorMessage,
                })
            }
            else
                updatePasswordForm.setError('root.serverError', {
                    message: error.message,
                })
        })
    }

    const profileInfoUpdateHandler = (data: UpdateDto) => {

        data.id = user.id;
        data.photo = data.fileList![0];


        axios.put<UpdateProfileResponce>(process.env.REACT_APP_SERVER_HOST + '/api/Authenfication/ProfileUpdate', data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer " + token,
                }
            })
            .then(function (response) {
                dispatch(setUser(response.data.user));
            })
            .catch(function (error: AxiosError<MessageResponseType>) {
                if(error.response) {
                    const errorMessage = error.response.data.message;
                    updateProfileForm.setError('root.serverError', {
                        message: errorMessage,
                    })
                }
                else
                    updateProfileForm.setError('root.serverError', {
                        message: error.message,
                    })
            })
    }

    return (
        <>
            <div className="profile__edit-form">
                <form onSubmit={updateProfileForm.handleSubmit(profileInfoUpdateHandler)} className="edit-form">
                    {updateProfileForm.formState.errors.root && <span className="profile__edit-form-error">{updateProfileForm.formState.errors.root.serverError.message as string }</span>}
                    <div className="edit-form__form-group">
                        <label className="edit-form__label" htmlFor="LastName">Фамилия:</label>
                        {updateProfileForm.formState.errors.lastName && <span className="profile__edit-form-error">{updateProfileForm.formState.errors.lastName.message as string}</span>}
                        <input className="edit-form__input" type="text" id="LastName" defaultValue={user.lastName} {...updateProfileForm.register('lastName', {
                            required: "Введите фамилию",
                        })}/>
                    </div>
                    <div className="edit-form__form-group">
                        <label className="edit-form__label" htmlFor="FirstName">Имя:</label>
                        {updateProfileForm.formState.errors.firstName && <span className="profile__edit-form-error">{updateProfileForm.formState.errors.firstName.message as string}</span>}
                        <input className="edit-form__input" type="text" id="FirstName" defaultValue={user.firstName} {...updateProfileForm.register('firstName', {
                            required: "Введите имя",
                        })}/>
                    </div>
                    <div className="edit-form__form-group">
                        <label className="edit-form__label" htmlFor="MiddleName">Отчество:</label>
                        <input className="edit-form__input" type="text" id="MiddleName" defaultValue={user.middleName ? user.middleName : ""} {...updateProfileForm.register('middleName')}/>
                    </div>
                    <div className="edit-form__form-group">
                        <label className="edit-form__label" htmlFor="Specialization">Специализация:</label>
                        {updateProfileForm.formState.errors.specialization && <span className="profile__edit-form-error">{updateProfileForm.formState.errors.specialization.message as string}</span>}
                        <input className="edit-form__input" type="text" id="Specialization" defaultValue={user.specialization} {...updateProfileForm.register('specialization', {
                            required: "Введите специализацию",
                        })}/>
                    </div>
                    <div className="edit-form__form-group">
                        <label className="edit-form__label" htmlFor="avatar">Фото:</label>
                        <input accept="image/png, image/jpeg, image/bmp, image/webp" className="edit-form__input" type="file" id="avatar" {...updateProfileForm.register("fileList")}/>
                    </div>
                    <button disabled={updateProfileForm.formState.isSubmitting} className="edit-form__submit" type="submit">Сохранить</button>
                </form>
                <form onSubmit={updatePasswordForm.handleSubmit(changePassWordHandler)} className="edit-form">
                    <div className="edit-form__form-group">
                        <label className="edit-form__label" htmlFor="oldPassword">Текущий пароль:</label>
                        {updatePasswordForm.formState.errors.root && <span className="profile__edit-form-error">{updatePasswordForm.formState.errors.root.serverError.message as string }</span>}
                        {updatePasswordForm.formState.errors.oldPassword && <span className="profile__edit-form-error">{updatePasswordForm.formState.errors.oldPassword.message as string}</span>}
                        <input autoComplete='current-password' className="edit-form__input" type="password" id="oldPassword" {...updatePasswordForm.register('oldPassword', {
                            required: "Введите старый пароль",
                        })}/>
                    </div>
                    <div className="edit-form__form-group">
                        <label className="edit-form__label" htmlFor="newPassword">Новый пароль:</label>
                        {updatePasswordForm.formState.errors.newPassword && <span className="profile__edit-form-error">{updatePasswordForm.formState.errors.newPassword.message as string}</span>}
                        <input autoComplete='new-password' className="edit-form__input" type="password" id="newPassword" {...updatePasswordForm.register('newPassword', {
                            required: "Введите новый пароль",
                        })}/>
                    </div>
                    <div className="edit-form__form-group">
                        <label className="edit-form__label" htmlFor="newPasswordMatch">Повторите новый пароль:</label>
                        {updatePasswordForm.formState.errors.newPasswordMatch && <span className="profile__edit-form-error">{updatePasswordForm.formState.errors.newPasswordMatch.message as string}</span>}
                        <input  className="edit-form__input" type="password" id="newPasswordMatch" {...updatePasswordForm.register('newPasswordMatch', {
                            required: "Введите новый пароль повторно",
                            validate: (val: string) => {
                                if (updatePasswordForm.watch('newPassword') !== val) {
                                    return "Пароли не совпадают";
                                }
                            },
                        })}/>
                    </div>
                    <button disabled={updatePasswordForm.formState.isSubmitting} className="edit-form__submit" type="submit">Изменить пароль</button>
                </form>
            </div>
        </>
    )
}