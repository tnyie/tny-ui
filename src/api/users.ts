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
    console.log(request)
    request.body.created_at = await new Date(request.body.created_at*1000)
    request.body.updated_at = await new Date(request.body.updated_at*1000)
    return await request.body;
}

export const CreateUser = async (user: User): Promise<User> => {
    const request = await APIReq("/users", "POST", user, false)
    return await request.body
}
