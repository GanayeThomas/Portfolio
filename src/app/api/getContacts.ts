import prisma from "@/libs/prismadb";
import { Contact } from "@/components/Contacts";

export default async function getContactsAll(): Promise<Contact[]> {
    return prisma.contact.findMany();
}