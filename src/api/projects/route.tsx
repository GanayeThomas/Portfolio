import { NextRequest, NextResponse } from "next/server";
import getProjectsAll from "../getProjects";

export async function GET(request: NextRequest) {
    console.log("Next URL = ", request.nextUrl);
    const projects = await getProjectsAll();
    console.log("Projects : ", projects);
    return NextResponse.json(projects);
}