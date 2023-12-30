import { useNavigate } from "react-router-dom";
import ProjectList from "../Components/Projects/ProjectList/ProjectList";
import {useEffect, useRef, useState } from "react";
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

    useEffect(() => {
        if(!token) {
            navigate("/login");
            return;
        }
        
        axios.get<ProjectType[]>('https://localhost:7138/api/Projects/GetProjects/', 
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
            })
            .finally (function () {
                setLoading(false);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Layout title="Проекты">
            {!loading && error &&
                <p>Ошибка: {error}</p>
            }
            {token && loading && !error && <Preloader fixed={false}/>}
            {token && !loading && !error && 
            <>
                <Search items={projects} setItems={setFilteredProjects}/>
                <button className="section__button button" onClick={showProjectForm}>Добавить проект</button>
                <ProjectAddForm closeForm={closeForm} formRef={projectForm} setProjects={setProjects} />
                <ProjectList projects={filteredProjects ? filteredProjects : projects} /> 
            </>}
        </Layout>
    )

}