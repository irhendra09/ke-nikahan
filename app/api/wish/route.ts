import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { invitationId, name, message } = body;

        const wish = await prisma.wish.create({
            data: {
                invitationId,
                name,
                message,
            },
        });

        return NextResponse.json(wish);
    } catch (error) {
        console.error("Wish Error:", error);
        return NextResponse.json({ error: "Failed to submit wish" }, { status: 500 });
    }
}
