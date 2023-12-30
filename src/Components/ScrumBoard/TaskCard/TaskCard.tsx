import { useState } from 'react';
import { Id, TaskType } from '../../../Types/ScrumBoardTypes';
import ScrumBoardDeleteBtn from '../ScrumBoardDeleteBtn/ScrumBoardDeleteBtn';
import './TaskCard.css';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


type TaskCardProps = {
    task: TaskType,
    deleteTask: (taskId: Id) => void,
    updateTask: (taskId: Id, content: string) => void,
}

export default function TaskCard(props: TaskCardProps) {
    const { task, deleteTask, updateTask } = props;
    const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    
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
        setMouseIsOver(false);
    };

    if(isDragging) {
        return (
            <div ref={setNodeRef} style={style} className="scrum-board__task-card scrum-board__task-card--isDragging"></div>
        )
    }

    if(editMode) {
        return (
            <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="scrum-board__task-card">
                <textarea onKeyDown={e => {
                    if(e.key === "Enter" && e.shiftKey) return;
                    else if(e.key === "Enter") toggleEditMode();
                }} value={task.content} autoFocus onBlur={toggleEditMode} onChange={e => updateTask(task.id, e.target.value)} className="scrum-board__task-card-textarea"></textarea>
            </div>
        )
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} onClick={toggleEditMode} onMouseEnter={() => setMouseIsOver(true)} onMouseLeave={() => setMouseIsOver(false)} className="scrum-board__task-card">
            <p className="scrum-board__task-card-content">{task.content}</p>
            {mouseIsOver && <ScrumBoardDeleteBtn deleteFunction={() => deleteTask(task.id)} />}
        </div>
    )
}