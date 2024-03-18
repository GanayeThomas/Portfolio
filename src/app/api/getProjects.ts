import prisma from "@/libs/prismadb";
import { Project } from "../page";

export default async function getProjectsAll(): Promise<Project[]> {
    return prisma.projet.findMany();
}