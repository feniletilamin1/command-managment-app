import { UserType } from "./ModelsType"

export type UpdateDto = Omit<Partial <UserType>, "photo" | "email"> & {
    photo?: File | null,
    fileList?: FileList,
}

export type RegisterDto = Omit<Partial <UserType>, "id" | "photo"> & {
    photo?: File,
    password?: string,
    fileList?: FileList,
}

export type ChangePasswordDto = {
    oldPassword?: string
    newPassword?: string,
    newPasswordMath?: string
}

export type ResetPasswordDto = Pick<Partial <UserType>, "email">

