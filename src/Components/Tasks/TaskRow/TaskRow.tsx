import "./TaskRow.css";
import { Id, TaskType } from "../../../Types/ScrumBoardTypes";
import { Link } from "react-router-dom";

type ProjectCardProps = {
    task: TaskType,
    isArchived: boolean,
    unarchiveTask?: (taskId: Id) => void,
}

export default function TaskRow(props: ProjectCardProps) {
    const { task, isArchived, unarchiveTask} = props;

    const dateTimeCreated = new Date(task.dateTimeCreated);
    const dateTimeEnd = new Date(task.dateTimeEnd);

    return (
        <div className="task">
            <div className="task__header">
                <h2 className="task__title">{task.content}</h2>
                <div className={`task__status ${task.isDone ? `task__status--completed` : ""}`}>{task.isDone}</div>
            </div>
            <div className="task__info">
                <p className="task__info-text">Создано: {dateTimeCreated.toLocaleDateString()}</p>
                <p className="task__info-text">Дедлайн: {dateTimeEnd.toLocaleString()}</p>
                <p className="task__info-text">Приоритет: {task.priorityIndex}</p>
                {!isArchived ? <Link to={"/board/" + task.scrumBoardId} className="scrum-button">Открыть доску задач</Link> : <div onClick={() => {
                    if(unarchiveTask)
                        unarchiveTask(task.id)
                }} className="scrum-button">Убрать из архива</div>}
            </div>
        </div>
    )
}