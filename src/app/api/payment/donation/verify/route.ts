import { prisma } from "@/lib/prisma";
import { Donations } from "@prisma/client";
import { NextResponse } from "next/server";
import { green, red } from "colors";

export const PATCH = async (req: Request) => {
  try {
    const { reference }: { reference: string } = await req.json();
    const paymentProviderResponse = await fetch(
      `${process.env.PAYMENT_URL}/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYMENT_SECRET_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const data = await paymentProviderResponse.json();
    const { data: paymentProviderResponseData } = data;

    const response: Donations = await prisma.donations.update({
      where: { transaction_id: reference },
      data: {
        status: paymentProviderResponseData.status,
        channel: paymentProviderResponseData.channel,
        payment_provider_transaction_id: `${paymentProviderResponseData.id}`,
      },
    });
    console.log(green(JSON.stringify(response)));

    return NextResponse.json(
      { status: response.status, response },
      { status: 200 }
    );
  } catch (error) {
    console.log(red(JSON.stringify(error)));

    return NextResponse.json(error, { status: 500 });
  }
};
