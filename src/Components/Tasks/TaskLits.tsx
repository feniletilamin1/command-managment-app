import "./TaskList.css";
import { Id, TaskType } from "../../Types/ScrumBoardTypes";
import TaskRow from "./TaskRow/TaskRow";


type ProjectListProps = {
    tasks: TaskType[]
    isArchived: boolean,
    unarchiveTask?: (taskId: Id) => void
}

export default function TaskList(props: ProjectListProps) {
    const { tasks, isArchived, unarchiveTask} = props;

    return(
        <>
            {tasks.length !== 0 && 
                <div className="task-list">
                    {tasks.map(item =>
                        <TaskRow unarchiveTask={unarchiveTask} isArchived={isArchived} key={item.id} task={item} />    
                    )}
                </div>
            }
        </>
    )
}
