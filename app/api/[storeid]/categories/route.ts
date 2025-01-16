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

    const { name, billboardId } = body;
    const { storeid } = await params;
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is Rerquried");
    }

    if (!billboardId) {
      return new NextResponse("Billboard Id is required", { status: 400 });
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

    const category = await prismadb.category.create({
      data: {
        name: name,
        billboardId: billboardId,
        storeId: storeid,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[BILLBOARD_POST] : error", error);
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
    const categories = await prismadb.category.findMany({
      where: {
        storeId: storeid,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES_GET]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
