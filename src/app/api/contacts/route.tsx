import { NextResponse } from "next/server";
import getContactsAll from "../getContacts";

export async function GET() {
    console.log("Contacts appelé !");
    const contacts = await getContactsAll();
    return NextResponse.json(contacts);
}