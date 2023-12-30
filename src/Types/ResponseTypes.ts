import { TeamType, UserType } from "./ModelsType";
import { ColumnType } from "./ScrumBoardTypes";

export type LoginProfileResponce = {
    jwt: string,
    user: UserType,
}

export type UpdateProfileResponce = {
    user: UserType,
}

export type MessageResponseType = {
    message: string,
}

export type LogInTypeDto =  {
    email?: string, 
    password?: string
}

export type TeamDto = Omit<Partial <TeamType>, "users"> & { userEmail?: string| null};

export type AddProjectDto = {
    createUserId: number,
    teamId: number,
    teamName: string,
}

export type InviteTeamDto = {
    token: string,
    userEmail: string,
}

export type ScrumBoardColumnsMoveDto = {
    newColumns: ColumnType[],
}


