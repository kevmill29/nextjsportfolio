import type { NextApiRequest, NextApiResponse } from "next";
import {groq} from "next-sanity"
import { client } from "@/sanity";
import { Social } from "@/typings";

const query = groq`
    *[_type == "social"] 
`
type Data ={
    socials: Social[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    const socials: Social[] = await client.fetch(query)
    res.status(200).json({ socials })
  }
  

  export const fetchSocials = async()=>{
    const res = await client.fetch(query);
    const data = await res.json()
    const socials: Social[] = data.socials;
    return socials;
}