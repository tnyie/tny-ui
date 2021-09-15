import { APIReq } from "./api"

export interface VisitPerDay {
  count: number,
  date: string
}

export const FetchLinkVisits = async (link_id: string): Promise<VisitPerDay[]> => {
  const date = new Date()
  date.setDate(date.getDate()-200)
  const request = await APIReq("/visits/" + link_id + "/" + date.toISOString().split('T')[0], "GET", null, true)
  return await request.body
}