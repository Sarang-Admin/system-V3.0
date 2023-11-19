import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: any) {
  const { studentID } = params;
  const student = await prisma.student.findUnique({
    where: {
      studentID: studentID,
    },
  });

  if (student) {
    
    return NextResponse.json({
        student,
    });
  } else {
    return NextResponse.json({
      message: "Student Not Found",
    });
  }
}
