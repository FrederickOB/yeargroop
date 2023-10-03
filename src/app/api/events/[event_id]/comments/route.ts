import { prisma } from "../../../../../lib/prisma";
import { Comments } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { event_id: string } }
) => {
  try {
    const { event_id } = params;
    const response = await prisma.comments.findMany({
      where: { event_id: parseInt(event_id) },
      include: {
        by: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            other_names: true,
            organization_year_group_id: true,
            role: true,
          },
        },
      },
    });
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
};
export const POST = async (
  req: Request,
  { params }: { params: { event_id: string } }
) => {
  try {
    const { event_id } = params;
    const commentReq: Comments = await req.json();

    const response: Comments = await prisma.comments.create({
      include: {
        by: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            other_names: true,
            organization_year_group_id: true,
            role: true,
          },
        },
      },
      data: { ...commentReq, event_id: parseInt(event_id) },
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
