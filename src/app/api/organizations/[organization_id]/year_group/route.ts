import { prisma } from "../../../../../lib/prisma";
import { OrganizationYearGroup } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  {
    params,
  }: {
    params: { organization_id: string };
  }
) => {
  try {
    const { organization_id } = params;

    const response = await prisma.organizationYearGroup.findMany({
      where: { organization_id: parseInt(organization_id) },
      include: { organization: true },
    });
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error, { status: 500 });
  }
};
export const POST = async (
  req: Request,
  { params }: { params: { organization_id: string } }
) => {
  try {
    const { organization_id } = params;
    console.log("organization_id", organization_id);

    const organizationYearGroupReq: OrganizationYearGroup = await req.json();
    const { year } = organizationYearGroupReq;

    const response: OrganizationYearGroup =
      await prisma.organizationYearGroup.upsert({
        where: {
          OrganizationYearGroupIdentifier: {
            year,
            organization_id: parseInt(organization_id),
          },
        },
        update: {},
        create: { year, organization_id: parseInt(organization_id) },
        include: { organization: true },
      });
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
