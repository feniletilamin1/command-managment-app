import { useNavigate } from "react-router-dom";
import ProjectList from "../Components/Projects/ProjectList/ProjectList";
import {FormEvent, useEffect, useRef, useState } from "react";
import { ProjectType } from "../Types/ModelsType";
import axios, { AxiosError } from "axios";
import ProjectAddForm from "../Components/ProjectAddForm/ProjectAddForm";
import Preloader from "../Components/Preloader/Preloader";
import Layout from "../Components/Layout/Layout";
import Search from "../Components/Search/Search";
import { useTitle } from "../hooks/useTitle";
import { useUserCookies } from "../hooks/useUserCokies";

export default function ProjectsPage() {
    useTitle("WorkFlow - Проекты");

    const navigate = useNavigate();
    const token = useUserCookies();

    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<ProjectType[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const projectForm = useRef<HTMLDivElement | null>(null);

    const showProjectForm = () => {
        projectForm.current?.classList.add("project-form-container--active");
    }

    const closeForm = () => {
        projectForm.current?.classList.remove("project-form-container--active");
    }

    const deleteProject = (projectId: number) => {
        setLoading(true);
        axios.delete(process.env.REACT_APP_SERVER_HOST + '/api/Projects/DeleteProject/' + projectId, 
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function ()  {
            setProjects(projects.filter(project => project.id !== projectId));
        })
        .catch(function (error: AxiosError) {
            setError(error.message);
        })
        .finally (function () {
            setLoading(false);
        })
    }

    useEffect(() => {
        if(!token) {
            navigate("/login");
            return;
        }
        
        axios.get<ProjectType[]>(process.env.REACT_APP_SERVER_HOST + '/api/Projects/GetProjects/', 
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        )
            .then(function (response) {
                setProjects(response.data)
            })
            .catch(function (error: AxiosError) {
                setError(error.message);
                console.log(error)
            })
            .finally (function () {
                setLoading(false);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    const searchInput = useRef<HTMLInputElement | null>(null);

    const searchFormHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const searchText: string = searchInput.current?.value!;

        if(searchText !== "") {
            let newItems: ProjectType[] = structuredClone(projects);
            newItems = newItems.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
            setFilteredProjects(newItems);
        }
        else {
            setFilteredProjects(null);
        }
    }


    return (
        <Layout title="Проекты">
            {!loading && error &&
                <p>Ошибка: {error}</p>
            }
            {token && loading && !error && <Preloader fixed={false}/>}
            {token && !loading && !error && 
            <>
                <Search searchFormHandler={searchFormHandler} searchInput={searchInput}/>
                <button className="section__button button" onClick={showProjectForm}>Добавить проект</button>
                <ProjectAddForm closeForm={closeForm} formRef={projectForm} setProjects={setProjects} />
                <ProjectList projects={filteredProjects ? filteredProjects : projects} deleteProject={deleteProject}/> 
            </>}
        </Layout>
    )

}