import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hook";
import { useUserCookies } from "../../hooks/useUserCokies";
import "./TeamForm.css";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { TeamDto, MessageResponseType } from "../../Types/ResponseTypes";
import { TeamType } from "../../Types/ModelsType";

type TeamTypeProps = {
    team: TeamType,
}

export default function UpdateTeamForm(props: TeamTypeProps) {
    const { team } = props;

    const { register, formState: { errors }, handleSubmit, setError} = useForm({
        mode: "onBlur",
    });

    const token = useUserCookies();
    const navigate = useNavigate();

    const { user } = useAppSelector((state) => state.user);


    const updateTeamHandler = (data: TeamDto) => {

        data.id = team.id;
        data.createUserId = user ? user.id : 0;

        axios.put('https://localhost:7138/api/Teams/UpdateTeam/', data, 
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        )
        .then(function () {
            navigate(-1)
        })
        .catch(function (error: AxiosError<MessageResponseType>) {
            if(error.response) {
                setError('root.serverError', {
                    message: error.response.data.message,
                })
            }
        })
    }
    
    return (
        <form onSubmit={handleSubmit(updateTeamHandler)} className="add-team-form">
            {errors.root && <span className="add-team-form-error">{errors.root.serverError.message as string }</span>}
            <label className="add-team-form__label" htmlFor="teamName">Название:</label>
            {errors.teamName && <span className="add-team-form-error">{errors.teamName.message as string }</span>}
            <input defaultValue={team.teamName} className="add-team-form__input" type="text" id="teamName" {...register("teamName", {
                required: "Введите название команды"
            })}/>
            <label className="add-team-form__label" htmlFor="teamDescription">Описание:</label>
            {errors.teamDescription && <span className="add-team-form-error">{errors.teamDescription.message as string }</span>}
            <textarea defaultValue={team.teamDescription} className="add-team-form__input add-team-form__input--textarea" id="teamDescription" {...register("teamDescription", {
                required: "Введите описание команды"
            })}></textarea>
            <button className="add-team-form__button">Изменить данные</button>
        </form>
    )
}