import { NextResponse } from "next/server";
import getSkillsAll from "../getSkills";

export async function GET() {
    const skill = await getSkillsAll();
    return NextResponse.json(skill);
}