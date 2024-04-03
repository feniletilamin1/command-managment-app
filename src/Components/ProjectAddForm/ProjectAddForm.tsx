import './ProjectAdd.css';
import axios from "axios";
import { FormEvent, LegacyRef, useRef, useState } from "react";
import { ProjectType } from "../../Types/ModelsType";
import { useAppSelector } from '../../app/hook';
import { AddProjectDto } from '../../Types/ResponseTypes';
import { useUserCookies } from '../../hooks/useUserCokies';
import Select from "react-select";
import { OptionTeamType } from '../../Types/SelectTypes';

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
    const [loading, setLoading] = useState<boolean>(false);

    let currentTeamId: number = 0;

    const options: OptionTeamType[] = [];

    cards.map(team => 
        options.push({
            label: team.teamName,
            value: team.id
        })
    );

    const addProjectFormHandler = (e: FormEvent<HTMLFormElement>) => {
        setLoading(true);

        e.preventDefault();
        
        const project: AddProjectDto = {
            createUserId: user!.id,
            teamName: nameInput.current?.value!,
            teamId: currentTeamId,
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
            setLoading(false);
            closeForm();
        });
    }

    return(
        <div ref={formRef} className="project-form-container">
            <form className="project-form" onSubmit={addProjectFormHandler}>
                <label className="project-form__label" htmlFor="Name">Название</label>
                <input className="project-form__input" id="Name" required ref={nameInput} type="text" />
                <label className="project-form__label" htmlFor="Team">Команда</label>
                <Select isSearchable noOptionsMessage={() => "Нечего выбирать"} styles={{control: (styles) => 
                    ({...styles, fontFamily: 'Mulish', fontSize: "12"})
                }} placeholder="Выберите команду" required onChange={(selectedOption) => {
                    currentTeamId = selectedOption!.value;
                }} options={options}></Select>
                <button disabled={loading ? true: false} className="project__form-submit" type="submit">Добавить проект</button>
            </form>
            <div onClick={() => closeForm()} className="project-form-container__cross"></div>
        </div>
    )
}