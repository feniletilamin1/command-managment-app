import './ScrumBoard.css';
import { useEffect, useMemo, useState } from "react"
import { ColumnType, Id, ScrumBoardType, TaskType } from "../../Types/ScrumBoardTypes"
import ColumnContainer from "./ColumnContainer/ColumnContainer"
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import ScrumBoardAddBtn from './ScrumBoardAddBtn/ScrumBoardAddBtn';
import TaskCard from './TaskCard/TaskCard';
import axios, { AxiosError } from 'axios';
import { useUserCookies } from '../../hooks/useUserCokies';
import { MessageResponseType, ScrumBoardColumnsMoveDto } from '../../Types/ResponseTypes';
import uuid from 'react-uuid';


export default function ScrumBoard (props: ScrumBoardType) {
    const token = useUserCookies();
    const [columns, setColumns] = useState<ColumnType[]>(props.scrumBoardColumns);
    const columnsId = useMemo(() => columns.map(col => col.id), [columns]);
    const [tasks, setTasks] = useState<TaskType[]>(props.scrumBoardTasks);
    const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null);
    const [activeTask, setActiveTask] = useState<TaskType | null>(null);
    const [disableUpdate, setDisableUpdate] = useState<boolean>(true);
    
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3,
            }
        })
    )

    useEffect(() => {
           if(!disableUpdate) {
            columns.forEach((obj, index) => {
                obj.order = index;
            });

            const columnsMoveDto: ScrumBoardColumnsMoveDto = {
                newColumns: columns,
            }

            axios.post('https://localhost:7138/api/ScrumBoard/ColumnsMove/', columnsMoveDto, 
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .catch(function (error:AxiosError<MessageResponseType>) {
                console.log(error.response);
            })
           }
           else setDisableUpdate(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps       
    }, [columns]);

    return (
        <div className="scrum-board">
            <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
                <div className="scrum-board__wrapper">
                    <div className="scrum-board__container">
                       <SortableContext items={columnsId}>
                        {columns.map(col => 
                                <ColumnContainer tasks={tasks.filter(task => task.scrumBoardColumnId === col.id)} key={col.id} column={col} 
                                deleteColumn={deleteColumn} updateColumn={updateColumn} createTask={createTask} deleteTask={deleteTask} 
                                updateTask={updateTask}/>
                            )}
                       </SortableContext>
                    </div>
                   <ScrumBoardAddBtn btnText="Добавить колонку" onClickFunction={createNewColumn}/>
                </div>
                {
                    createPortal(
                        <DragOverlay>
                            {activeColumn && <ColumnContainer tasks={tasks.filter(task => task.scrumBoardColumnId === activeColumn.id)} 
                            column={activeColumn} deleteColumn={deleteColumn} updateColumn={updateColumn} createTask={createTask} 
                            deleteTask={deleteTask} updateTask={updateTask}/> }
                            {activeTask && <TaskCard task={activeTask} deleteTask={deleteTask} updateTask={updateTask}/>}
                        </DragOverlay>, document.body
                    )
                }
            </DndContext>
        </div>
    )

    function createNewColumn() {
        const columnToAdd: ColumnType = {
            id: uuid(),
            name: `Колонка ${columns.length + 1}`,
            order: columns.length + 1,
            scrumBoardId: props.id,
        }

        axios.post<ColumnType>('https://localhost:7138/api/ScrumBoard/ColumnAdd/', columnToAdd, 
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function (response) {
            columnToAdd.id = response.data.id;
            setColumns([...columns, columnToAdd]);
        })
        .catch(function (error:AxiosError<MessageResponseType>) {
            console.log(error.response);
        })
    }

    function deleteColumn(id: Id) {
        const filteredColumns = columns.filter(col => col.id !== id);

        const deletedColumn = columns.find(col => col.id === id);

        axios.post('https://localhost:7138/api/ScrumBoard/ColumnDelete/', deletedColumn, 
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .catch(function (error:AxiosError<MessageResponseType>) {
            console.log(error.response);
        })

        setColumns(filteredColumns);

        const newTasks = tasks.filter(task => task.scrumBoardColumnId !== id);

        setTasks(newTasks);
    }

    function onDragStart(event: DragStartEvent) {
        if(event.active.data.current?.type === 'Column') {
            setActiveColumn(event.active.data.current.column);
        }

        if(event.active.data.current?.type === 'Task') {
            setActiveTask(event.active.data.current.task);
        }
    }

    function onDragEnd(event: DragEndEvent) {
        setActiveColumn(null);
        setActiveTask(null);

        const { active, over} = event;
        if(!over) return;

        const activeColumnId = active.id;
        const overColumnId = over.id;

        if(activeColumnId === overColumnId) return;

        setColumns(columns => {
            const activeColumnIndex = columns.findIndex(column => column.id === activeColumnId);
            
            const overColumnIndex = columns.findIndex(column => column.id === overColumnId);

            return arrayMove(columns, activeColumnIndex, overColumnIndex);
        })

    }

    function updateColumn(id: Id, name: string) {
        const newColumns: ColumnType[] = columns.map(col => {
            if (col.id !== id) return col;
            return {...col, name};
        })

        setColumns(newColumns);
        setDisableUpdate(true);

        const updatedColumn = columns.find(col => col.id === id);

        updatedColumn!.name = name;

        axios.post('https://localhost:7138/api/ScrumBoard/ColumnUpdate/', updatedColumn, 
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .catch(function (error:AxiosError<MessageResponseType>) {
            console.log(error.response);
        })
    }

    function createTask(columnId: Id) {
        const scrumBoardTask: TaskType = {
            id: uuid(),
            scrumBoardColumnId: columnId,
            content: `Задача ${tasks.length}`,
            scrumBoardId: props.id,
            order: tasks.length,
        }

        console.log(scrumBoardTask);
    
        axios.post<TaskType>('https://localhost:7138/api/ScrumBoard/TaskAdd/', scrumBoardTask, 
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function (response) {
            scrumBoardTask.id = response.data.id;
            setTasks([...tasks, scrumBoardTask]);
        })
        .catch(function (error:AxiosError<MessageResponseType>) {
            console.log(error);
        })

    }

    function deleteTask(taskId: Id) {
        const newTasks = tasks.filter((task) => task.id !== taskId);

        setTasks(newTasks);
    }

    function updateTask(taskId: Id, content: string) {
        const newTasks: TaskType[] = tasks.map((task) => {
            if(task.id !== taskId) return task;
            return {...task, content}
        });

        setTasks(newTasks);
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over} = event;
        if(!over) return;

        const activeColumnId = active.id;
        const overColumnId = over.id;

        if(activeColumnId === overColumnId) return;

        const isActiveTask = active.data.current?.type === "Task";
        const isOverTask = over.data.current?.type === "Task";

        if(!isActiveTask) return;

        if(isActiveTask && isOverTask) {
            setTasks(tasks => {
                const actvieIndex = tasks.findIndex(t => t.id === activeColumnId);
                const overIndex = tasks.findIndex(t => t.id === overColumnId);
                
                tasks[actvieIndex].scrumBoardColumnId = tasks[overIndex].scrumBoardColumnId;

                return arrayMove(tasks, actvieIndex, overIndex);
            })
        }

        const isOverColumn = over.data.current?.type === 'Column';

        if(isActiveTask && isOverColumn) {
            setTasks(tasks => {
                const actvieIndex = tasks.findIndex(t => t.id === activeColumnId);
                const overIndex = tasks.findIndex(t => t.id === overColumnId);
                
                tasks[actvieIndex].scrumBoardColumnId = overColumnId;

                return arrayMove(tasks, actvieIndex, overIndex);
            })
        }
    }
}