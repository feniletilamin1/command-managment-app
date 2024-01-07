import { TeamType, UserType } from "./ModelsType";

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



