import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeid: string } }
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
      return new NextResponse("Store Id is required" + params.storeid, {
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

    const size = await prismadb.size.create({
      data: {
        name: name,
        value:value,
        storeId: storeid,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZES_POST] : error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeid: string } }
) {
  try {
    const { storeid } = await params;

    if (!storeid) {
      return new NextResponse("Store id is reqruired", { status: 400 });
    }
    const sizes = await prismadb.size.findMany({
      where: {
        storeId: storeid,
      },
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.log("[SIZES_GET]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
