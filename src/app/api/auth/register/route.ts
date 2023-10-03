import { prisma } from "../../../../lib/prisma";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
export const POST = async (req: Request) => {
  try {
    const user_req: User & { confirm_password: string } = await req.json();
    const {
      email,
      password,
      confirm_password,
      first_name,
      last_name,
      other_names,
      dob,
      role,
      phone_number,
      organization_year_group_id,
    } = user_req;

    const existingEMail = await prisma.user.findUnique({ where: { email } });
    const existingPhoneNumber = await prisma.user.findUnique({
      where: { phone_number },
    });

    let errors = [];
    if (password !== confirm_password) {
      errors.push({ message: "passwords don't match" });
    }
    if (existingEMail) {
      errors.push({ message: "email already exist, please use another" });
    }
    if (existingPhoneNumber) {
      errors.push({
        message: "phone number already exist, please use another",
      });
    }

    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 422 });
    }

    const hashedPassword = await hash(password, 10);
    const response: User = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        first_name,
        last_name,
        dob,
        other_names,
        role,
        phone_number,
        organization_year_group_id,
      },
    });

    return NextResponse.json(
      {
        email,
        first_name,
        last_name,
        other_names,
        role,
        phone_number,
        organization_year_group_id,
      },
      { status: 201 }
    );
  } catch (error) {
    NextResponse.json(
      { message: "oops. something went wrong" },
      { status: 500 }
    );
  }
};

export const userBodyRes = {
  id: true,
  email: true,
  first_name: true,
  last_name: true,
  other_names: true,
  dob: true,
  organization_year_group_id: true,
  role: true,
};
