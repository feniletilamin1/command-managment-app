import { TeamCardType, UserType } from "./ModelsType"

export type UserStateType = {
    user: UserType | null
} & FetchingInfoType

type FetchingInfoType = {
    Error: string | null,
    isLoading: boolean,
}

export type TeamStateType = {
    cards: TeamCardType[]
} & FetchingInfoType