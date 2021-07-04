import { APIReq } from "./api";

export const RequestData = async () => {
    const request = APIReq("/gdpr", "GET", {}, true)

    return await (await request).body
}