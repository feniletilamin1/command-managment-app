import './ProjectAdd.css';
import axios from "axios";
import { FormEvent, LegacyRef, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectType } from "../../Types/ModelsType";
import { useAppSelector } from '../../app/hook';
import { AddProjectDto } from '../../Types/ResponseTypes';
import { useUserCookies } from '../../hooks/useUserCokies';

type ProjectFormProps = {
    setProjects: Function,
    formRef: LegacyRef<HTMLDivElement>,
    closeForm: Function,
}

export default function ProjectAddForm(props: ProjectFormProps) {
    const token = useUserCookies();
    const {user} = useAppSelector((state) => state.user);
    const { cards } = useAppSelector((state) => state.teams);
    const {closeForm, formRef, setProjects} = props;
    const nameInput = useRef <HTMLInputElement | null>(null);
    const teamSelect = useRef <HTMLSelectElement | null>(null);
    const navigate = useNavigate();

    const addProjectFormHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!user) {
            navigate("/login");
            return;
        }
        
        const project: AddProjectDto = {
            createUserId: user.id,
            teamName: nameInput.current?.value!,
            teamId: Number.parseInt(teamSelect.current?.value!),
        }

        axios.post<ProjectType>(process.env.REACT_APP_SERVER_HOST + '/api/Projects/AddProject', project, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(function (response) {
                setProjects((prevState: ProjectType[]) => [...prevState, response.data]);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                closeForm();
            });
    }

    return(
        <div ref={formRef} className="project-form-container">
            <form className="project-form" onSubmit={addProjectFormHandler}>
                <label className="project-form__label" htmlFor="Name">Название</label>
                <input className="project-form__input" id="Name" required ref={nameInput} type="text" />
                <label className="project-form__label" htmlFor="Team">Название</label>
                <select ref={teamSelect} id="Team" className="project-form__select">
                    {cards.map(item =>
                        <option key={item.id} value={item.id} className="project-form__select-option">{item.teamName}</option>    
                    )}
                </select>
                <button className="project__form-submit" type="submit">Добавить проект</button>
            </form>
            <div onClick={() => closeForm()} className="project-form-container__cross"></div>
        </div>
    )
}