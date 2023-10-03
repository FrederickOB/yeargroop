import { prisma } from "../../../../../../lib/prisma";
import { OrganizationYearGroup } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async ({
  params,
}: {
  params: { year_group_id: string };
}) => {
  try {
    const { year_group_id } = params;
    const response = await prisma.organizationYearGroup.findFirst({
      where: { id: parseInt(year_group_id) },
    });
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
export const PATCH = async (
  req: Request,
  { params }: { params: { year_group_id: string } }
) => {
  try {
    const { year_group_id } = params;
    const organizationReq: OrganizationYearGroup = await req.json();
    const { year } = organizationReq;
    const response: OrganizationYearGroup =
      await prisma.organizationYearGroup.update({
        where: { id: parseInt(year_group_id) },
        data: { year },
      });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
