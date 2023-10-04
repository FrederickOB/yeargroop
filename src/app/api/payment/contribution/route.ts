import { prisma } from "@/lib/prisma";
import { PaymentInput } from "@/types";
import { Donations, EventContributions, User } from "@prisma/client";
import { NextResponse } from "next/server";
import { green, red } from "colors";

export const POST = async (req: Request) => {
  try {
    const eventContributionsRes: EventContributions = await req.json();

    const response = await prisma.eventContributions.create({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
      data: eventContributionsRes,
    });
    console.log(green(JSON.stringify(response)));
    const paymentProviderResponse = await fetch(
      `${process.env.PAYMENT_URL}/transaction/initialize`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYMENT_SECRET_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          amount: response.amount,
          email: response?.user.email,
          reference: response.transaction_id,
          currency: "GHS",
        }),
      }
    );

    const data = await paymentProviderResponse.json();

    return NextResponse.json(
      { status: response.status, data },
      { status: 200 }
    );
  } catch (error) {
    console.log(red(JSON.stringify(error)));

    return NextResponse.json(error, { status: 500 });
  }
};
