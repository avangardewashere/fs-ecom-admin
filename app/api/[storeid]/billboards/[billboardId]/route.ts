import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ storeid: string; billboardId: string }> }
) {
  try {
    const { userId } = await auth();

    const body = await req.json();

    const { label, imageUrl } = await body;

    const { billboardId } = await params;
    const { storeid } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image Url is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("billboard id is required", { status: 400 });
    }

    if (!storeid) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeid,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorizd", { status: 403 });
    }

    const billboard = await prismadb.billBoard.updateMany({
      where: {
        id: billboardId,
        // storeId: storeId,
      },
      data: { label: label, imageUrl },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
  }
  return new NextResponse("Internal error", { status: 500 });
}

/////////// Delete function

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ storeid: string; billboardId: string }> }
) {
  try {
    const { userId } = await auth();
    const { storeid, billboardId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeid) {
      return new NextResponse("Store Id is required", { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse("Billboard  Id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeid,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorizd", { status: 403 });
    }

    const billboard = await prismadb.billBoard.deleteMany({
      where: {
        id: billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
  }
  return new NextResponse("Internal error", { status: 500 });
}

////// Get function

export async function GET(
  req: Request,
  { params }: { params: Promise<{ billboardId: string }> }
) {
  try {
    // const { userId } = await auth();
    const { billboardId } = await params;

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    if (!billboardId) {
      return new NextResponse("Billboard  Id is required", { status: 400 });
    }

    const billboard = await prismadb.billBoard.findUnique({
      where: {
        id: billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
  }
  return new NextResponse("Internal error", { status: 500 });
}
