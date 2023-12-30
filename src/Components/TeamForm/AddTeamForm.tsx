import { useForm } from "react-hook-form";
import "./TeamForm.css";
import {useAppDispatch, useAppSelector } from "../../app/hook";
import { TeamDto, MessageResponseType } from "../../Types/ResponseTypes";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import Preloader from "../Preloader/Preloader";
import { useUserCookies } from "../../hooks/useUserCokies";
import { addTeam } from "../../app/slices/teamSlice";
import { TeamCardType } from "../../Types/ModelsType";

export default function AddTeamForm() {
    const { register, formState: { errors }, handleSubmit, setError} = useForm({
        mode: "onBlur",
    });

    const token = useUserCookies();
    const navigate = useNavigate();

    const { user } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState<boolean>(false);

    const addTeamHandler = (data: TeamDto) => {
        setLoading(true);
        data.createUserId = user ? user.id : 0;

        axios.post<TeamCardType>('https://localhost:7138/api/Teams/AddTeam/', data, 
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        )
        .then(function (response) {
            dispatch(addTeam(response.data))
            navigate("/teams")
        })
        .catch(function (error: AxiosError<MessageResponseType>) {
            if(error.response) {
                setError('root.serverError', {
                    message: error.response.data.message,
                })
            }
        })
        .finally (function () {
            setLoading(false);
        })
    }

    return(
        <>
            {loading && <Preloader fixed={false}/>}
            {!loading && 
            <form onSubmit={handleSubmit(addTeamHandler)} className="add-team-form">
                {errors.root && <span className="add-team-form-error">{errors.root.serverError.message as string }</span>}
                <label className="add-team-form__label" htmlFor="teamName">Название:</label>
                {errors.teamName && <span className="add-team-form-error">{errors.teamName.message as string }</span>}
                <input className="add-team-form__input" type="text" id="teamName" {...register("teamName", {
                    required: "Введите название команды"
                })}/>
                <label className="add-team-form__label" htmlFor="teamDescription">Описание:</label>
                {errors.teamDescription && <span className="add-team-form-error">{errors.teamDescription.message as string }</span>}
                <textarea className="add-team-form__input add-team-form__input--textarea" id="teamDescription" {...register("teamDescription", {
                    required: "Введите описание команды"
                })}></textarea>
                <button className="add-team-form__button">Добавить команду</button>
            </form>}
        </>
    )
}