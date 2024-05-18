import { FormEvent, useEffect, useRef, useState } from 'react';
import Layout from '../Components/Layout/Layout';
import { useTitle } from '../hooks/useTitle';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserCookies } from '../hooks/useUserCokies';
import Preloader from '../Components/Preloader/Preloader';
import { MessageResponseType } from '../Types/ResponseTypes';
import { Id, TaskType } from '../Types/ScrumBoardTypes';
import TaskList from '../Components/Tasks/TaskLits';
import Search from '../Components/Search/Search';

export default function ArchivedTasksPage() {

    useTitle("WorkFlow - Архивные задачи");

    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filteredTasks, setFilteredTasks] = useState<TaskType[] | null>(null);
    const navigate = useNavigate();

    const searchInput = useRef<HTMLInputElement | null>(null);

    const searchFormHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const searchText: string = searchInput.current?.value!;

        if(searchText !== "") {
            let newItems: TaskType[] = structuredClone(tasks);
            newItems = newItems.filter(item => item.content.toLowerCase().includes(searchText.toLowerCase()));
            setFilteredTasks(newItems);
        }
        else {
            setFilteredTasks(null);
        }
    }

    const unarchiveTask = (taskId: Id) => {
        const currentTask = tasks.find(task => task.id === taskId);

        if(currentTask) {
            currentTask.isArchived = false;

            axios.put(process.env.REACT_APP_SERVER_HOST + '/api/ScrumBoard/TaskUpdate/', currentTask, 
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(function () {
                const newTasks: TaskType[] = tasks.filter(task => task.id !== taskId);
                setTasks(newTasks);
            })
            .catch(function (error:AxiosError<MessageResponseType>) {
                console.log(error.response);
            })
        }
        else return;
    }

    const token = useUserCookies();
    
    useEffect(() => {
        if(!token) {
            navigate("/login");
            return;
        }

        axios.get<TaskType[]>(process.env.REACT_APP_SERVER_HOST + `/api/Projects/GetUserArchivedTasks`, 
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        )
        .then(function (response) {
            setTasks(response.data)
        })
        .catch(function (error: AxiosError<MessageResponseType>) {
            setError(error.message);
        })
        .finally (function () {
            setLoading(false);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
       <>
        {loading && <Preloader fixed={false} />}
        {!loading && tasks && 
            <Layout title={"Архивные задачи"}>
                <Search searchInput={searchInput} searchFormHandler={searchFormHandler}/>
                <div className="scrum-button">Архив задач</div>
                <TaskList unarchiveTask={unarchiveTask} isArchived={true} tasks={filteredTasks ? filteredTasks : tasks} />
            </Layout>
        }
        {error && <p>Ошибка: {error}</p>}
       </>
    )
}