import { APIReq } from "./api"

export const GetUID = (): string => {
    const token = localStorage.getItem("token");
    if (token != null) {
        const claims = JSON.parse(atob(token.split(".")[1]));
        if (claims != null) {
          return claims.UserID;
        }
    }
    return ""
}

interface LoginDetails {
    email:      string,
    password:   string
}

export const Login = async (details: LoginDetails): Promise<string> => {
    const request = await APIReq("/tokens", "POST", details, false)
    return request.body.token
}

export const CheckToken = async (): Promise<boolean> => {
    const request = await APIReq("/tokens", "GET", {}, true)
    return request.err
}