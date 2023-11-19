import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { year } = reqBody;

    const existingYear = await prisma.academicYear.findUnique({
      where: {
        year: year,
      },
    });

    if (existingYear) {
      return NextResponse.json(
        { error: "Year already exists" },
        { status: 400 }
      );
    }

    const newYear = await prisma.academicYear.create({
      data: {
        year: year,
      },
    });

    return NextResponse.json({
      message: "Academic Year Created Successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(response: NextResponse) {
  try {
    const years = await prisma.academicYear.findMany();
    return NextResponse.json({ years });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { year } = reqBody;

    const existingYear = await prisma.academicYear.findUnique({
      where: {
        year: year,
      },
    });

    if (!existingYear) {
      return NextResponse.json(
        { error: "Year does not exist" },
        { status: 400 }
      );
    }

    await prisma.academicYear.delete({
      where: {
        year: year,
      },
    });

    return NextResponse.json({ message: "Academic Year Deleted Successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
