import { APIReq } from "./api"

interface LoginDetails {
    email:      string,
    password:   string
}

export const Login = async (details: LoginDetails): Promise<string> => {
    const request = await APIReq("/tokens", "POST", details, false)
    return request.body.token
}

export const CheckToken = async (): Promise<string> => {
    const request = await APIReq("/tokens", "GET", {}, true)
    return request.body.user_id
}

export const GetAPIKey = async (details: LoginDetails): Promise<string> => {
    const request = await APIReq("/keys", "POST", details, false)
    return request.body.key
}

export const GetUID = async (): Promise<string> => {
    return await CheckToken()
}