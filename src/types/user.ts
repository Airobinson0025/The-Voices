export type User = {
    id: string
    email: string
    password: string
    created_at: Date
    updated_at: Date
    display_name?: string
    bio?: string
}

export type UserRegistrationData = {
    username: string
    email: string
    password: string
}