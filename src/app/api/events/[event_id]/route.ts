import { prisma } from "../../../../lib/prisma";
import { Event } from "@prisma/client";
import { NextResponse } from "next/server";
import { userBodyRes } from "../../auth/register/route";

export const GET = async (
  req: Request,
  { params }: { params: { event_id: string } }
) => {
  userBodyRes;
  try {
    const { event_id } = params;
    const response = await prisma.event.findFirst({
      where: { id: parseInt(event_id) },
      include: {
        user: {
          select: userBodyRes,
        },
        Comments: {
          select: {
            comment: true,
            by: {
              select: {
                first_name: true,
                last_name: true,
                role: true,
                id: true,
              },
            },
          },
        },
        _count: { select: { Likes: true } },
      },
    });

    const { _count, ...responseWithoutCount } = response;
    return NextResponse.json(
      { ...responseWithoutCount, likes: response?._count.Likes },
      { status: 200 }
    );
  } catch (error) {
    NextResponse.json(error, { status: 500 });
  }
};
export const PATCH = async (
  req: Request,
  { params }: { params: { event_id: string } }
) => {
  try {
    const { event_id } = params;
    const eventReq: Event = await req.json();
    const { topic, body, image, isDonatable, date } = eventReq;
    const response: Event = await prisma.event.update({
      where: { id: parseInt(event_id) },
      include: {
        user: {
          select: userBodyRes,
        },
      },
      data: { topic, body, image, isDonatable, date },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log("error", error);

    return NextResponse.json(error, { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { event_id: string } }
) => {
  try {
    const { event_id } = params;

    const existingEvent = await prisma.event.findUnique({
      where: { id: parseInt(event_id) },
    });

    if (!existingEvent) {
      return NextResponse.json(
        { message: "Event does not exist" },
        { status: 422 }
      );
    }
    const response: Event = await prisma.event.delete({
      where: { id: parseInt(event_id) },
    });

    return NextResponse.json({ message: "deleted" }, { status: 200 });
  } catch (error) {
    NextResponse.json(error, { status: 500 });
  }
};
