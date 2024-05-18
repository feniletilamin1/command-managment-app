import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { useUserCookies } from "../../hooks/useUserCokies";
import "./TeamForm.css";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { TeamDto, MessageResponseType } from "../../Types/ResponseTypes";
import { TeamType } from "../../Types/ModelsType";
import { updateTeam } from "../../app/slices/teamSlice";

type TeamTypeProps = {
    team: TeamType,
}

export default function UpdateTeamForm(props: TeamTypeProps) {
    const { team } = props;
    const { user } = useAppSelector((state) => state.user);

    const dispatch = useAppDispatch();
    const token = useUserCookies();
    const navigate = useNavigate();

    const { register, formState: { errors }, handleSubmit, setError} = useForm({
        mode: "onBlur",
    });


    const updateTeamHandler = (data: TeamDto) => {

        data.id = team.id;
        data.createUserId = user ? user.id : 0;

        axios.put(process.env.REACT_APP_SERVER_HOST + '/api/Teams/UpdateTeam/', data, 
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        )
        .then(function () {
            navigate(-1)
            dispatch(updateTeam(data));
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
            <textarea defaultValue={team.teamDescription} className="add-team-form__input add-team-form__input--textarea" id="teamDescription" {...register("teamDescription")}></textarea>
            <button className="add-team-form__button">Изменить данные</button>
        </form>
    )
}