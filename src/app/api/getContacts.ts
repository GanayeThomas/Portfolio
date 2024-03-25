import prisma from "@/libs/prismadb";
import { Contact } from "@/components/Contacts";

export default async function getContactsAll(): Promise<Contact[]> {
    const contacts = await prisma.contact.findMany();
    // Mappage de chaque contact récupéré pour inclure la propriété `type`,
    // en utilisant la fonction `determineContactType` pour déterminer cette propriété.
    return contacts.map(contact => ({
        ...contact, // Utilisation de l'opérateur de décomposition pour inclure toutes les propriétés existantes du contact.
        type: determineContactType(contact), // Ajout ou écrasement de la propriété `type` avec le résultat de `determineContactType`.
    }));
}

function determineContactType(contact: any): string {
    return "defaultType"; 
}
