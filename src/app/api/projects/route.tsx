import { NextResponse } from "next/server";
import getProjectsAll from "../getProjects";

export async function GET() {
    console.log("Projects appelé !");
    const project = await getProjectsAll();
    return NextResponse.json(project);
}