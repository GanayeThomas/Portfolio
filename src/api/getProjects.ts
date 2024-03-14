import prisma from "@/libs/prismadb";

export default async function getProjectsAll() {
    const allProjects = await prisma.projet.findMany();
    return allProjects;
}