import { APIReq, GenericResponse, tokens } from "./api"

export interface Link {
    id: string
    url: string
    slug: string
    owner_id: string
    lease: number | string,
    created_at: number | string
    updated_at: number | string
    unlock_time: number | string
}

export const CreateLink = async (link: any): Promise<[Promise<Link>, boolean]> => {
    const request = await APIReq("/links", "POST", link, true)
    return await [request.body, request.err]
}

export const UpdateLinkLease = async (link: any):  Promise<boolean> => {
    const request = await APIReq("/links/"+link.id, "PUT", {}, true)

    return !request.err
}

export const FetchLinkBySlug = async (slug: string): Promise<Link> => {
    const request = await APIReq("/links/"+slug, "GET", {}, true)
    return request.body
}

export const FetchLink = async (id: string): Promise<Link> => {
    const request = await APIReq("/links/link/"+id, "GET", {}, true)
    return request.body
}

export const FetchOwnLinks = async (): Promise<Link[]> => {
    const uid = await tokens.GetUID()
    const request = await APIReq("/links/user/"+uid, "GET", {}, true)

    if (await request.err) {
        return []
    }
    return await request.body;
}

export const FetchAuthenticatedLinks = async (slug: string, password: string): Promise<GenericResponse> => {
    const request = await APIReq(
        "/links/authenticated/"+slug, "PUT", {"password": password}, false
    )

    return await request.body
}

export const UpdateLinkURL = async (linkID: string, url: string): Promise<boolean> => {
    const request = await APIReq(
        "/links/"+linkID+"/url", "PUT", {"url": url}, true
    )
    return request.err
}

export const DeleteLink = (linkID: string): void => {
    APIReq("/links/"+linkID, "DELETE", {}, true)
}
