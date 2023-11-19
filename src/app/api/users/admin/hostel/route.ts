import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { hostelName } = reqBody;

    const existingHostel = await prisma.hostels.findUnique({
      where: {
        hostelName: hostelName,
      },
    });
    if (existingHostel) {
      return NextResponse.json(
        { error: "Hostel already exist" },
        { status: 400 }
      );
    }

    await prisma.hostels.create({
      data: {
        hostelName: hostelName,
      },
    });
    await prisma.$disconnect();
    return NextResponse.json({
      message: "Hostel Created Successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const hostels = await prisma.hostels.findMany();
    const hostelData = await Promise.all(
      hostels.map(async (hostel) => {
        const roomCount = await prisma.hostelRoom.count({
          where: {
            hostelName: hostel.hostelName,
          },
        });
        return {
          ...hostel,
          roomCount,
        };
      })
    );
    return NextResponse.json({ hostels: hostelData });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
