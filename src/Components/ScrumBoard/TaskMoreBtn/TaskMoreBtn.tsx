import './TaskMoreBtn.css';
import '../ScrumBoardIcon.css';
import DotsIcon from "../DotsIcon";

type TaskMoreBtnProps = {
    changeArchivedTask: () => void,
    deleteTaskFunction: () => void,
}

export default function TaskMoreBtn(props: TaskMoreBtnProps) {
    const { deleteTaskFunction, changeArchivedTask } = props;
    return <>
    <div className="scrum-board__icon">
            <DotsIcon />
    </div>
    <ul className="scrum-board__task-events-list">
        <li onClick={deleteTaskFunction} className="scrum-board__task-events-list-item">Удалить</li>
        <li onClick={changeArchivedTask} className="scrum-board__task-events-list-item">Архивировать</li>
    </ul>
    </>
}