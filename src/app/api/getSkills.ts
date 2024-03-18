import prisma from "@/libs/prismadb";

export default async function getSkillsAll(){
    const allSkills = await prisma.skill.findMany()
    return allSkills;
}