import prisma from "@/libs/prismadb";

export default async function getEducationAll(){
    const allEducation = await prisma.exp_education.findMany()
    return allEducation;
}