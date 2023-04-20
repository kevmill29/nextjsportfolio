import type { NextApiRequest, NextApiResponse } from "next";
import {groq} from "next-sanity"
import { Project } from "@/typings";
import { client } from "@/sanity";

const query = groq`
    *[_type == "project"]{
        ...,
        technologies[]->
    } 
`;
type Data ={
    projects: Project[];
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    const projects: Project[] = await client.fetch(query)
    res.status(200).json({ projects })
  }
  
  export const fetchProjects = async()=>{
    const res = await client.fetch(query);
    const data = await res.json()
    const projects: Project[] = data.projects;
    return projects;
}