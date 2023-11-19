import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { className, year } = reqBody;

    const existingClass = await prisma.classes.findFirst({
      where: {
        className: className,
      },
    });
    if (existingClass) {
      return NextResponse.json(
        { error: "Class already exist" },
        { status: 400 }
      );
    }
    
    const newSchoolClass = await prisma.classes.create({
      data: {
        className: className,
        year: year,
      },
    });

    await prisma.$disconnect();

    return NextResponse.json({
      message: "Class Created Successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const classes = await prisma.classes.findMany();
    return NextResponse.json({ classes });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
