import { NextResponse } from "next/server";
import getContactsAll from "../getContacts";

export async function GET() {
    const contacts = await getContactsAll();
    return NextResponse.json(contacts);
}