import prisma from "@/libs/prismadb";
import { Contact } from "@/components/Contacts";

export default async function getContactsAll(): Promise<Contact[]> {
    const contacts = await prisma.contact.findMany();
    return contacts.map(contact => ({
        ...contact,
        type: determineContactType(contact),
    }));
}

function determineContactType(contact: any): string {
    return "defaultType"; 
}
