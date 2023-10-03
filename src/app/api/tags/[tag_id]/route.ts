import { prisma } from "../../../../lib/prisma";
import { Tag } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async ({ params }: { params: { tag_id: number } }) => {
  try {
    const { tag_id } = params;
    const response = await prisma.tag.findFirst({
      where: { id: tag_id },
    });
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    NextResponse.json(error, { status: 500 });
  }
};
export const PATCH = async (
  req: Request,
  { params }: { params: { tag_id: number } }
) => {
  try {
    const { tag_id } = params;
    const tagReq: Tag = await req.json();
    const { tag } = tagReq;
    const response: Tag = await prisma.tag.update({
      where: { id: tag_id },

      data: { tag },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    NextResponse.json(error, { status: 500 });
  }
};
