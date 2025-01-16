import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ storeid: string }> }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const { name, value } = body;
    const { storeid } = await params;
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is Rerquried");
    }

    if (!value) {
      return new NextResponse("value  is required", { status: 400 });
    }

    if (!storeid) {
      return new NextResponse("Store Id is required" +  storeid, {
        status: 400,
      });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeid,
        userId, 
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const color = await prismadb.color.create({
      data: {
        name: name,
        value:value,
        storeId: storeid,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_POST] : error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ storeid: string }> }
) {
  try {
    const { storeid } = await params;

    if (!storeid) {
      return new NextResponse("Store id is reqruired", { status: 400 });
    }
    const colors = await prismadb.color.findMany({
      where: {
        storeId: storeid,
      },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLOR_GET]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
