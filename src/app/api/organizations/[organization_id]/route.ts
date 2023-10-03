import { prisma } from "../../../../lib/prisma";
import { Organization } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async ({
  params,
}: {
  params: { organization_id: number };
}) => {
  try {
    const { organization_id } = params;
    const response = await prisma.organization.findFirst({
      where: { id: organization_id },
    });
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    NextResponse.json(error, { status: 500 });
  }
};
export const PATCH = async (
  req: Request,
  { params }: { params: { organization_id: number } }
) => {
  try {
    const { organization_id } = params;
    const organizationReq: Organization = await req.json();
    const { name, logo, color, email } = organizationReq;
    const response: Organization = await prisma.organization.update({
      where: { id: organization_id },

      data: { name, logo, color, email },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    NextResponse.json(error, { status: 500 });
  }
};
