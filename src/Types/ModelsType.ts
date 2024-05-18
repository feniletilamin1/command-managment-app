import { ScrumBoardType } from "./ScrumBoardTypes"

export type ProjectType = {
    id: number,
    name: string,
    createUser: UserType,
    team: TeamType,
    board: ScrumBoardType,
}

export type UserType = {
    id: number,
    firstName: string,
    lastName: string,
    middleName?: string | null,
    email: string,
    photo: string,
    specialization: string,
}

export type TeamCardType = {
    id: number,
    teamName: string,
    users: UserType[],
}

export type TeamType = {
    id: number,
    teamName: string,
    teamDescription: string,
    users: UserType[],
    createUserId: number
}