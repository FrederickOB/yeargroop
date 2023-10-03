import { prisma } from "../../../../../lib/prisma";
import { Likes } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
  { params }: { params: { event_id: string } }
) => {
  try {
    const { event_id } = params;
    const likesReq: Likes = await req.json();
    const { user_id, like } = likesReq;

    const existingEvent = await prisma.likes.findUnique({
      where: { LikesIdentifier: { user_id, event_id: parseInt(event_id) } },
    });

    if (!existingEvent) {
      const response: Likes = await prisma.likes.upsert({
        where: { LikesIdentifier: { user_id, event_id: parseInt(event_id) } },
        update: { like },
        create: { user_id, event_id: parseInt(event_id), like },
      });

      return NextResponse.json(response, { status: 201 });
    } else {
      const response: Likes = await prisma.likes.delete({
        where: { LikesIdentifier: { user_id, event_id: parseInt(event_id) } },
      });

      return NextResponse.json({ message: "deleted" }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
