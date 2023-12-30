import "./ScrumBoardDeleteBtn.css";
import TrashIcon from "../TrashIcon";

type ScrumBoardDeleteBtnProps = {
    deleteFunction: Function,
}

export default function ScrumBoardDeleteBtn(props: ScrumBoardDeleteBtnProps) {
    const { deleteFunction } = props

    return (
        <div onClick={() => deleteFunction()} className="scrum-board__column-delete-btn">
            <TrashIcon />
        </div>
    )
}