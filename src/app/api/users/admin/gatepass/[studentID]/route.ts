import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: any) {
  const { studentID } = params;
  const gatepass = await prisma.gatePass.findFirst({
    where: {
      studentID: studentID,
    },
  });

  if (gatepass) {
    return NextResponse.json({
      gatepass,
    });
  } else {
    return NextResponse.json({
      message: "Gatepass Not Found",
    });
  }
}
