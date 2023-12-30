import PlusIcon from '../PlusIcon';
import './ScrumBoardAddBtn.css';

type ScrumBoardAddProps = {
    btnText: string,
    onClickFunction: Function,
    isSmall?: boolean,
}

export default function ScrumBoardAddBtn(props: ScrumBoardAddProps) {
    const { btnText, onClickFunction, isSmall } = props;

    return (
        <>
            <button onClick={() => onClickFunction()} className={"scrum-board__add-btn" + (isSmall ? ' scrum-board__add-btn--small' : '')}>
                <PlusIcon />
                {btnText}
            </button>
        </>
    )
}