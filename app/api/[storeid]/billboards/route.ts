import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const { label, imageUrl } = body;
    const { storeId } = await params;
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Label is Rerquried");
    }

    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    if (!storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const billBoard = await prismadb.billBoard.create({
      data: {
        label,
        imageUrl,
        storeId: storeId,
      },
    });

    return NextResponse.json(billBoard);
  } catch (error) {
    console.log("[BILLBOARD_POST] : error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
