import './TaskMoreBtn.css';
import '../ScrumBoardIcon.css';
import DotsIcon from "../DotsIcon";

type TaskMoreBtnProps = {
    showModalFunction: () => void,
    deleteTaskFunction: Function,
}

export default function TaskMoreBtn(props: TaskMoreBtnProps) {
    const { showModalFunction, deleteTaskFunction } = props;
    return <>
    <div onClick={showModalFunction} className="scrum-board__icon">
            <DotsIcon />
    </div>
    <ul className="scrum-board__task-events-list">
        <li className="scrum-board__task-events-list-item">О задаче</li>
        <li onClick={() => deleteTaskFunction()} className="scrum-board__task-events-list-item">Удалить</li>
        <li className="scrum-board__task-events-list-item">Архивировать</li>
    </ul>
    </>
}