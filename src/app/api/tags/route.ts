import { prisma } from "../../../lib/prisma";
import { Tag } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = await prisma.tag.findMany();
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    NextResponse.json(error, { status: 500 });
  }
};
export const POST = async (req: Request) => {
  try {
    const tagRes: Tag = await req.json();

    const response: Tag = await prisma.tag.create({
      data: tagRes,
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    NextResponse.json(error, { status: 500 });
  }
};
