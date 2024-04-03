import { useRef, useState } from 'react';
import { Id, TaskType } from '../../../Types/ScrumBoardTypes';
import './TaskCard.css';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import NotDoneIcon from '../../../icons/not-done-icon.svg';
import DoneIcon from '../../../icons/done-icon.svg';
import TaskMoreBtn from '../TaskMoreBtn/TaskMoreBtn';


type TaskCardProps = {
    task: TaskType,
    deleteTask: (taskId: Id) => void,
    updateTask: (taskId: Id, content: string) => void,
    changeTaskState: (taskId: Id) => void,
}

export default function TaskCard(props: TaskCardProps) {
    const { task, deleteTask, updateTask, changeTaskState } = props;
    const [editMode, setEditMode] = useState<boolean>(false);
    const taskContentTArea = useRef<HTMLTextAreaElement | null>(null);

    
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

    if(isDragging) {
        return (
            <div ref={setNodeRef} style={style} className="scrum-board__task-card scrum-board__task-card--isDragging"></div>
        )
    }

    if(editMode) {
        return (
            <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="scrum-board__task-card">
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
            </div>
        )
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="scrum-board__task-card">
            <img onClick={() => changeTaskState(task.id)} src={task.isDone ? DoneIcon : NotDoneIcon} alt="done-icon" className="scrum-board__task-card-done-icon" onMouseOver={
                (e) => {
                    e.currentTarget.setAttribute("src", DoneIcon)
                }
            } onMouseOut={(e) => {
                if(!task.isDone) {
                    e.currentTarget.setAttribute("src", NotDoneIcon);
                }
            }}/>
            <textarea onClick={toggleEditMode} readOnly defaultValue={task.content} className="scrum-board__task-card-textarea"></textarea>
            <TaskMoreBtn deleteTaskFunction={() => deleteTask(task.id)} showModalFunction={() => {}} />
            <div className="scrum-board__task-user">
                <p className="scrum-board__task-user-title">Ответственный:</p>
                <div className="scrum-board__task-user-inner-wrapper">
                    <div className="scrum-board__task-user-avatar">
                        <img src={process.env.REACT_APP_SERVER_HOST + "/" + task.responsibleUser!.photo} alt="user-avatar" className="scrum-board__task-user-avatar-img" />
                    </div>
                    <p className="scrum-board__task-user-name">{task.responsibleUser!.lastName + " " + task.responsibleUser!.firstName}</p>
                </div>
            </div>
        </div>
    )
}