import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { gatepassID, studentID, careTaker, leavingDate, time, reason, returnDate } = reqBody;

    const existingGatePass = await prisma.gatePass.findUnique({
      where: {
        gatepassID: gatepassID
      },
    });
    if (existingGatePass) {
      return NextResponse.json(
        { error: "Gate Pass already exist" },
        { status: 400 }
      );
    }

    await prisma.gatePass.create({
      data: {
        gatepassID: gatepassID,
        studentID: studentID,
        careTaker: careTaker,
        leavingDate: leavingDate,
        time: time,
        reason: reason,
        returnDate: returnDate
      },
    });
    await prisma.$disconnect();
    return NextResponse.json({
      message: "Gate Pass Created Successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
    try {
      const gatePasses = await prisma.gatePass.findMany();
      return NextResponse.json({ gatePasses });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
