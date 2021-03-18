import { APIReq, tokens } from "./api"

export interface Link {
    id: string
    url: string
    slug: string
    owner_id: string
    lease: number | string,
    created_at: number | string
    updated_at: number | string
}

export const FetchOwnLinks = async (): Promise<Link[]> => {
    const uid = tokens.GetUID()
    const request = await APIReq("/links/user/"+uid, "GET", {}, true)

    if (await request.err) {
        return []
    }

    return await request.body;
}

export const DeleteLink = async (linkID: string): Promise<boolean> => {
    const request = await APIReq("/links/"+linkID, "DELETE", {}, true)
    return await request.err
}
