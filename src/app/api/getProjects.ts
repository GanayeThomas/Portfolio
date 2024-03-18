import { Project } from "@/components/Projects";
import prisma from "@/libs/prismadb";

export default async function getProjectsAll(): Promise<Project[]> {
    return prisma.projet.findMany();
}   