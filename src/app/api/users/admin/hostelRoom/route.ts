import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { roomID, roomNumber, capacity, hostelName } = reqBody;

    const existingRoom = await prisma.hostelRoom.findUnique({
      where: {
        roomID: roomID,
      },
    });

    if (existingRoom) {
      return NextResponse.json(
        { error: "Room already exist" },
        { status: 400 }
      );
    }

    await prisma.hostelRoom.create({
      data: {
        roomID: roomID,
        roomNumber: roomNumber,
        capacity: capacity,
        hostelName: hostelName,
      },
    });
    await prisma.$disconnect();
    return NextResponse.json({
      message: "Room Created Successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(response: NextResponse) {
  try {
    const hostelRooms = await prisma.hostelRoom.findMany();
    return NextResponse.json({ hostelRooms });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
