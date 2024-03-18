import { NextResponse } from "next/server";
import getEducationAll from "../getEducation";

export async function GET() {
    const education = await getEducationAll();
    return NextResponse.json(education);
}