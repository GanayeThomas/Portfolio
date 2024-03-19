import { Education } from "@/components/Educations";
import prisma from "@/libs/prismadb";

export default async function getEducationAll(): Promise<Education[]>{
    return prisma.exp_education.findMany()
}