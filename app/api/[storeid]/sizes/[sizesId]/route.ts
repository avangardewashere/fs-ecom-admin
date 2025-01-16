import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ storeid: string; sizesId: string }> }
) {
  try {
    const { userId } = await auth();

    const body = await req.json();

    const { name,value } = await body;

    const { sizesId } = await params;
    const { storeid } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("value is required", { status: 400 });
    }

    if (!sizesId) {
      return new NextResponse("Sizes id is required", { status: 400 });
    }

    if (!storeid) {
      return new NextResponse("Store Id is required this", { status: 400 });
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
    
    const sizes = await prismadb.size.updateMany({
      where: {
        id: sizesId,
        // storeid: storeid,
      },
      data: { name:name , value:value },
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.log("[SIZES_PATCH]", error);
  }
  return new NextResponse("Internal error", { status: 500 });
}

/////////// Delete function

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ storeid: string; sizesId: string }> }
) {
  try {
    const { userId } = await auth();
    const { storeid, sizesId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeid) {
      return new NextResponse("Store Id is required", { status: 400 });
    }
    if (!sizesId) {
      return new NextResponse("Size  Id is required", { status: 400 });
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

    const size = await prismadb.size.deleteMany({
      where: {
        id: sizesId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_DELETE]", error);
  }
  return new NextResponse("Internal error", { status: 500 });
}

////// Get function

export async function GET(
  req: Request,
  { params }: { params: Promise<{ sizesId: string }> }
) {
  try {
    const { userId } = await auth();
    const { sizesId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!sizesId) {
      return new NextResponse("sizes Id is required", { status: 400 });
    }

    const sizes = await prismadb.size.findUnique({
      where: {
        id: sizesId,
      },
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.log("[SIZES_GET]", error);
  }
  return new NextResponse("Internal error", { status: 500 });
}
