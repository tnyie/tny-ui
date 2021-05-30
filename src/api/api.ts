export * as links from "./links"
export * as tokens from "./tokens"
export * as visits from "./visits"
export * as users from "./users"

export const API_DOMAIN = "https://tny.ie"

interface APIResponse {
    status_code:    number,
    status_text:    string,
    body:           any,
    err:            boolean
}

export interface GenericResponse {
    data: string
}

export const APIReq = async (path: string, method: string, body: any = undefined, authenticated = true) => {
    let request;
    if (authenticated) {
        request = await fetch(API_DOMAIN + path, {
            method: method,
            mode: "cors",
            headers: {
                "Authorization": (authenticated) ? `Bearer ${localStorage.getItem("token")}` : "",
                "Content-Type": (body != {}) ? "application/json" : "text/plain",
            },
            body: (method === "GET") ? null:(!body) ? null:JSON.stringify(body)
        })
    } else {
        request = await fetch(API_DOMAIN + path, {
            method: method,
            mode: "cors",
            headers: {
                "Content-Type": (body != {}) ? "application/json" : "text/plain",
            },
            body: JSON.stringify(body)
        })
    }

    return {
        status_code: await request.status,
        status_text: await request.statusText,
        body: await request.json(),
        err: await (200 <= request.status && request.status <= 299) ? false:true
    };
}