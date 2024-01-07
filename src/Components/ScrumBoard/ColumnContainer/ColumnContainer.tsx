import './ColumnContainer.css';
import { ColumnType, Id, TaskType } from "../../../Types/ScrumBoardTypes"
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useMemo, useRef, useState } from 'react';
import ScrumBoardAddBtn from '../ScrumBoardAddBtn/ScrumBoardAddBtn';
import TaskCard from '../TaskCard/TaskCard';
import ScrumBoardDeleteBtn from '../ScrumBoardDeleteBtn/ScrumBoardDeleteBtn';

type ColumnContainerProps = {
    column: ColumnType,
    deleteColumn: (id: Id) => void,
    updateColumn: (id: Id, title: string) => void,
    createTask: (columnId: Id) => void,
    deleteTask: (taskId: Id) => void,
    updateTask: (taskId: Id, content: string) => void,
    tasks: TaskType[],
}

export default function ColumnContainer (props: ColumnContainerProps) {
    const { column, deleteColumn, updateColumn, createTask, tasks, deleteTask, updateTask} = props;
    const [editMode, setEditMode] = useState<boolean>(false);
    const columnInputName = useRef<HTMLInputElement | null>(null);
    
    const tasksIds = useMemo(() => { 
        return tasks.map(task => task.id);
    }, [tasks]);

    const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column,
        },
        disabled: editMode,
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    if(isDragging) {
        return (
            <div ref={setNodeRef} style={style} className="scrum-board__column scrum-board__column--dragged"></div>
        )
    }

    return (
        <div ref={setNodeRef} style={style} className="scrum-board__column">
            <div className="scrum-board__column-wrapper" {...attributes} {...listeners}>
                <div className="scrum-board__column-info-wrapper">
                    <span className="scrum-board__column-tasks-counter">{tasks.length}</span>
                    <h2 onClick={() => {
                        if(column.name !== 'В работе' && column.name !== 'Сделать' &&  column.name !== 'Сделано') {
                            setEditMode(true);
                        }
                    }} className="scrum-board__column-title">
                        {!editMode && column.name}
                        {editMode && <input ref={columnInputName} className="scrum-board__update-title-input" 
                            defaultValue={column.name} autoFocus onBlur={() => setEditMode(false)} onKeyDown={(e) => {
                            if(e.key === "Enter" && column.name !== 'В работе' && column.name !== 'Сделать' &&  column.name !== 'Сделано' && column.name !== "") {
                                updateColumn(column.id, columnInputName.current!.value);
                            }
                            else {
                                return;
                            }
                            setEditMode(false);
                        }}/>}
                    </h2>
                </div>
                {column.name !== 'В работе' && column.name !== 'Сделать' &&  column.name !== 'Сделано' && <ScrumBoardDeleteBtn deleteFunction={() => deleteColumn(column.id)} />}
            </div>
            <div className="scrum-board__column-content">
                <SortableContext items={tasksIds}>
                    {tasks.map(task => 
                        <TaskCard key={task.id} deleteTask={deleteTask} task={task} updateTask={updateTask}/>
                    )}
                </SortableContext>
            </div>
            <div className="scrum-board__column-footer">
                <ScrumBoardAddBtn isSmall={true} btnText="Добавить задачу" onClickFunction={() => createTask(column.id)}  />              
            </div>
        </div>
    )
}
