import prisma from "@/libs/prismadb";

export default async function getContactsAll(){
    const allContact = await prisma.contact.findMany()
    return allContact;
}