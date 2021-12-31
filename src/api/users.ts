import {APIReq} from "./api"

export interface User {
    uid: string,
    username: string,
    email: string,
    created_at: Date,
    updated_at: Date
}

export const GetUser = async (id: string): Promise<User> => {
    const request = await APIReq("/users/"+id, "GET", null, true);
    request.body.created_at = await new Date(request.body.created_at*1000)
    request.body.updated_at = await new Date(request.body.updated_at*1000)
    return await request.body;
}

export const CreateUser = async (user: any): Promise<User> => {
    const request = await APIReq("/users", "POST", user, false)
    return await request.body
}

export const PasswordResetRequest = async (email: string): Promise<boolean> =>  {
    const request = await APIReq("/users/password", "PUT", {email: email}, false)

    return !request.err
}

export const PasswordReset = async (token: string, password: string): Promise<boolean> => {
    const request = await APIReq("/users/password/" + token, "PUT", {password: password}, false)

    return !request.err
}
