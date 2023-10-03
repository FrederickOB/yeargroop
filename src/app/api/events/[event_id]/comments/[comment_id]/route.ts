import { prisma } from "../../../../../../lib/prisma";
import { Comments } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { event_id: string; comment_id: string } }
) => {
  try {
    const { comment_id, event_id } = params;
    const response = await prisma.comments.findFirst({
      where: { id: parseInt(comment_id) },
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
    return NextResponse.json(error, { status: 500 });
  }
};
export const PATCH = async (
  req: Request,
  { params }: { params: { comment_id: string } }
) => {
  try {
    const { comment_id } = params;
    const commentReq: Comments = await req.json();
    const { comment } = commentReq;
    const response: Comments = await prisma.comments.update({
      where: { id: parseInt(comment_id) },
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
      data: { comment },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export const DELETE = async ({
  params,
}: {
  params: { comment_id: string };
}) => {
  try {
    const { comment_id } = params;

    const existingEvent = await prisma.comments.findUnique({
      where: { id: parseInt(comment_id) },
    });

    if (!existingEvent) {
      return NextResponse.json(
        { message: "Comment does not exist" },
        { status: 422 }
      );
    }
    const response: Comments = await prisma.comments.delete({
      where: { id: parseInt(comment_id) },
    });

    return NextResponse.json({ message: "deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
