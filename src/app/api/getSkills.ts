import { Skill } from "@/components/Skills";
import prisma from "@/libs/prismadb";

export default async function getSkillsAll(): Promise<Skill[]>{
    return prisma.skill.findMany()
}