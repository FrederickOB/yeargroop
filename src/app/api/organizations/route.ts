import { prisma } from "../../../lib/prisma";
import { Organization } from "@prisma/client";

import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = await prisma.organization.findMany();
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    NextResponse.json(error, { status: 500 });
  }
};
export const POST = async (req: Request) => {
  try {
    const organizationReq: Organization = await req.json();
    const { name, logo, color } = organizationReq;
    const existingOrganization = await prisma.organization.findUnique({
      where: { name },
    });

    if (existingOrganization) {
      return NextResponse.json(
        { message: "Organization with the name already exists" },
        { status: 409 }
      );
    }

    const response: Organization = await prisma.organization.create({
      data: organizationReq,
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    NextResponse.json(error, { status: 500 });
  }
};
