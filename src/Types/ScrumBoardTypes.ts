import { ProjectType, UserType } from "./ModelsType";

export type Id = string | number;

export type ColumnType = {
    id: Id,
    name: string,
    order: number,
    scrumBoardId: number,
}
export type TaskType = {
    id: Id,
    scrumBoardColumnId: Id,
    content: string,
    scrumBoardId: number,
    order: number,
    isDone: boolean,
    responsibleUserId: number,
    responsibleUser?: UserType,
    dateTimeCreated: Date,
    priorityIndex: number,
    dateTimeEnd: Date,
    isArchived: boolean,
    createUserTaskId: number,
    createUserTask?: UserType
}

export type ScrumBoardType = {
    id: number,
    scrumBoardColumns: ColumnType[],
    scrumBoardTasks: TaskType[],
    teamUsers: UserType[],
    project: ProjectType,
}