import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: any) {
  const { staffID } = params;
  const teacher = await prisma.teacher.findUnique({
    where: {
      staffID: staffID,
    },
  });

  if (teacher) {
    
    return NextResponse.json({
      teacher,
    });
  } else {
    return NextResponse.json({
      message: "Teacher Not Found",
    });
  }
}
