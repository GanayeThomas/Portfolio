import prisma from "@/libs/prismadb";
import { Contact } from "../page";

export default async function getContactsAll(): Promise<Contact[]> {
    return prisma.contact.findMany();
}