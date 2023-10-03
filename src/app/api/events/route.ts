import { prisma } from "../../../lib/prisma";
import { Event } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async () => {
  // bring back events tired to the logged iin user's organization year group
  try {
    const response = await prisma.event.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
            other_names: true,
            dob: true,
            organization_year_group_id: true,
            role: true,
          },
        },
      },
    });
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    NextResponse.json(error, { status: 500 });
  }
};
export const POST = async (req: Request) => {
  try {
    const eventRes: Event = await req.json();

    const response: Event = await prisma.event.create({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
            other_names: true,
            dob: true,
            organization_year_group_id: true,
            role: true,
          },
        },
      },
      data: eventRes,
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    NextResponse.json(error, { status: 500 });
  }
};
