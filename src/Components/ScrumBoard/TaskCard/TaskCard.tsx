import { useRef, useState } from 'react';
import { Id, TaskType } from '../../../Types/ScrumBoardTypes';
import './TaskCard.css';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import NotDoneIcon from '../../../icons/not-done-icon.svg';
import DoneIcon from '../../../icons/done-icon.svg';
import TaskMoreBtn from '../TaskMoreBtn/TaskMoreBtn';
import { useAppSelector } from '../../../app/hook';


type TaskCardProps = {
    task: TaskType,
    deleteTask: (taskId: Id) => void,
    updateTask: (taskId: Id, content: string) => void,
    changeTaskState: (taskId: Id) => void,
    changeArchivedTask: (taskId: Id) => void,
}

export default function TaskCard(props: TaskCardProps) {
    const { task, deleteTask, updateTask, changeTaskState, changeArchivedTask} = props;
    const [editMode, setEditMode] = useState<boolean>(false);
    const taskContentTArea = useRef<HTMLTextAreaElement | null>(null);
    const { user } = useAppSelector((state) => state.user);
    
    const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        },
        disabled: editMode,
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    const toggleEditMode = () => {
        setEditMode((prev) => !prev);
    };

    function priorityColorChanger(priorityIndex: number): string {
        let mainStr: string = "scrum-board__task-card scrum-board__task-card--priority";

        switch (priorityIndex) {
            case 1:
                return mainStr + "1"
            case 2:
                return mainStr + "2"
            case 3:
                return mainStr + "3"
            case 4:
                return mainStr + "4"
            case 5:
                return mainStr + "5"
        }

        return mainStr;
    }

    if(isDragging) {
        return (
            <div ref={setNodeRef} style={style} className="scrum-board__task-card scrum-board__task-card--isDragging"></div>
        )
    }

    if(editMode) {
        return (
            <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={priorityColorChanger(task.priorityIndex)}>
                <textarea ref={taskContentTArea} onKeyDown={e => {
                    if(e.key === "Enter" && e.shiftKey) return;
                    else if(e.key === "Enter" && taskContentTArea.current!.value !== "") {
                        toggleEditMode();
                        updateTask(task.id, taskContentTArea.current!.value);
                    }
                    else if(e.key === "Escape")
                        toggleEditMode();
                }} defaultValue={task.content} autoFocus onBlur={toggleEditMode} className="scrum-board__task-card-textarea"></textarea>
                <div className="scrum-board__task-user">
                    <p className="scrum-board__task-user-title">Ответственный:</p>
                    <div className="scrum-board__task-user-inner-wrapper">
                        <div className="scrum-board__task-user-avatar">
                            <img src={process.env.REACT_APP_SERVER_HOST + "/" + task.responsibleUser!.photo} alt="user-avatar" className="scrum-board__task-user-avatar-img" />
                        </div>
                        <p className="scrum-board__task-user-name">{task.responsibleUser!.lastName + " " + task.responsibleUser!.firstName}</p>
                    </div>
                </div>
                <p className="scrum-board__date-time-created">Создана: {new Date(task.dateTimeCreated).toLocaleDateString()}</p>
                <p className="scrum-board__date-time-end">Срок: {new Date(task.dateTimeEnd).toLocaleString()}</p>
                <div className="scrum-board__priority-round">{task.priorityIndex}</div>
                <div className="scrum-board__task-user">
                    <p className="scrum-board__task-user-title">Задача создана:</p>
                    <div className="scrum-board__task-user-inner-wrapper">
                        <div className="scrum-board__task-user-avatar">
                            <img src={process.env.REACT_APP_SERVER_HOST + "/" + task.createUserTask!.photo} alt="user-avatar" className="scrum-board__task-user-avatar-img" />
                        </div>
                        <p className="scrum-board__task-user-name">{task.createUserTask!.lastName + " " + task.createUserTask!.firstName}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={priorityColorChanger(task.priorityIndex)}>
            <img onClick={(e) => {
                if(task.createUserTaskId === user?.id || task.responsibleUserId === user?.id) {
                    changeTaskState(task.id)
                }
            }} src={task.isDone ? DoneIcon : NotDoneIcon} alt="done-icon" className="scrum-board__task-card-done-icon" onMouseOver={
                (e) => {
                    if(task.createUserTaskId === user?.id || task.responsibleUserId === user?.id) {
                        e.currentTarget.setAttribute("src", DoneIcon)
                    }
                }
            } onMouseOut={(e) => {
                if(task.createUserTaskId === user?.id || task.responsibleUserId === user?.id) {
                    if(!task.isDone) {
                        e.currentTarget.setAttribute("src", NotDoneIcon);
                    }
                }
            }}/>
            <textarea onClick={(e) => {
                if(task.createUserTaskId === user?.id) {
                    toggleEditMode()
                }
            }} readOnly defaultValue={task.content} className="scrum-board__task-card-textarea"></textarea>
            {task.createUserTaskId === user?.id && <TaskMoreBtn deleteTaskFunction={() => {
                if(task.createUserTaskId === user?.id) {
                    deleteTask(task.id);
                }
                }} changeArchivedTask={() => {
                    if(task.createUserTaskId === user?.id) {
                        changeArchivedTask(task.id);
                    }
                }} />}
            <div className="scrum-board__task-user">
                <p className="scrum-board__task-user-title">Ответственный:</p>
                <div className="scrum-board__task-user-inner-wrapper">
                    <div className="scrum-board__task-user-avatar">
                        <img src={process.env.REACT_APP_SERVER_HOST + "/" + task.responsibleUser!.photo} alt="user-avatar" className="scrum-board__task-user-avatar-img" />
                    </div>
                    <p className="scrum-board__task-user-name">{task.responsibleUser!.lastName + " " + task.responsibleUser!.firstName}</p>
                </div>
            </div>
            <p className="scrum-board__date-time-created">Создана: {new Date(task.dateTimeCreated).toLocaleDateString()}</p>
            <p className="scrum-board__date-time-end">Срок: {new Date(task.dateTimeEnd).toLocaleString()}</p>
            <div className="scrum-board__priority-round">{task.priorityIndex}</div>
            <div className="scrum-board__task-user">
                    <p className="scrum-board__task-user-title">Задача создана:</p>
                    <div className="scrum-board__task-user-inner-wrapper">
                        <div className="scrum-board__task-user-avatar">
                            <img src={process.env.REACT_APP_SERVER_HOST + "/" + task.createUserTask!.photo} alt="user-avatar" className="scrum-board__task-user-avatar-img" />
                        </div>
                        <p className="scrum-board__task-user-name">{task.createUserTask!.lastName + " " + task.createUserTask!.firstName}</p>
                    </div>
                </div>
        </div>
    )
}