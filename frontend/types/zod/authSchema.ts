export type LoginFromSchema = {
    username: string,
    password: string
}


export type RegisterFormSchema = {
    email: string
} & LoginFromSchema