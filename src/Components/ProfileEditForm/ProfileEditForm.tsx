import { UpdateDto } from '../../Types/AuthenficationTypes';
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
    setLoading: Function,
}

export default function ProfileEditForm (props: ProfileEditFormProps) {
    const { user, setLoading } = props;
    const dispatch = useAppDispatch();

    const cookies = new Cookies();
    const token: string | null = cookies.get("jwt");

    const { register, formState: { errors }, handleSubmit, setError} = useForm({
        mode: "onBlur",
    });

    const profileInfoUpdateHandler = (data: UpdateDto) => {

        data.id = user.id;
        data.photo = data.fileList![0];

        setLoading(true);

        axios.put<UpdateProfileResponce>('https://localhost:7138/api/Authenfication/ProfileUpdate', data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer " + token,
                }
            })
            .then(function (response) {
                cookies.set("email", response.data.user.email);
                dispatch(setUser(response.data.user));
            })
            .catch(function (error: AxiosError<MessageResponseType>) {
                if(error.response) {
                    const errorMessage = error.response.data.message;
                    setError('root.serverError', {
                        message: errorMessage,
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

    return (
        <>
            <div className="profile__edit-form">
                    <form onSubmit={handleSubmit(profileInfoUpdateHandler)} className="edit-form">
                        {errors.root && <span className="profile__edit-form-error">{errors.root.serverError.message as string }</span>}
                        <div className="edit-form__form-group">
                            <label className="edit-form__label" htmlFor="LastName">Фамилия:</label>
                            {errors.lastName && <span className="profile__edit-form-error">{errors.lastName.message as string}</span>}
                            <input className="edit-form__input" type="text" id="LastName" defaultValue={user.lastName} {...register('lastName', {
                                required: "Введите фамилию",
                            })}/>
                        </div>
                        <div className="edit-form__form-group">
                            <label className="edit-form__label" htmlFor="FirstName">Имя:</label>
                            {errors.firstName && <span className="profile__edit-form-error">{errors.firstName.message as string}</span>}
                            <input className="edit-form__input" type="text" id="FirstName" defaultValue={user.firstName} {...register('firstName', {
                                required: "Введите имя",
                            })}/>
                        </div>
                        <div className="edit-form__form-group">
                            <label className="edit-form__label" htmlFor="MiddleName">Отчество:</label>
                            <input className="edit-form__input" type="text" id="MiddleName" defaultValue={user.middleName ? user.middleName : ""} {...register('middleName')}/>
                        </div>
                        <div className="edit-form__form-group">
                            <label className="edit-form__label" htmlFor="Specialization">Специализация:</label>
                            {errors.specialization && <span className="profile__edit-form-error">{errors.specialization.message as string}</span>}
                            <input className="edit-form__input" type="text" id="Specialization" defaultValue={user.specialization} {...register('specialization', {
                                required: "Введите специализацию",
                            })}/>
                        </div>
                        <div className="edit-form__form-group">
                            <label className="edit-form__label" htmlFor="avatar">Фото:</label>
                            <input accept="image/png, image/jpeg, image/bmp, image/webp" className="edit-form__input" type="file" id="avatar" {...register("fileList")}/>
                        </div>
                        <button className="edit-form__submit" type="submit">Сохранить</button>
                    </form>
                </div>
        </>
    )
}