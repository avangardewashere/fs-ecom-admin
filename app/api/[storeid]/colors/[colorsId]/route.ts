import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeid: string; colorsId: string } }
) {
  try {
    const { userId } = await auth();

    const body = await req.json();

    const { name,value } = await body;

    const { colorsId } = await params;
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

    if (!colorsId) {
      return new NextResponse("Colors id is required", { status: 400 });
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
    
    const colors = await prismadb.color.updateMany({
      where: {
        id: colorsId,
        // storeid: storeid,
      },
      data: { name:name , value:value },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLORS_PATCH]", error);
  }
  return new NextResponse("Internal error", { status: 500 });
}

/////////// Delete function

export async function DELETE(
  req: Request,
  { params }: { params: { storeid: string; colorsId: string } }
) {
  try {
    const { userId } = await auth();
    const { storeid, colorsId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeid) {
      return new NextResponse("Store Id is required", { status: 400 });
    }
    if (!colorsId) {
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

    const color = await prismadb.color.deleteMany({
      where: {
        id: colorsId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_DELETE]", error);
  }
  return new NextResponse("Internal error", { status: 500 });
}

////// Get function

export async function GET(
  req: Request,
  { params }: { params: { colorsId: string } }
) {
  try {
    const { userId } = await auth();
    const { colorsId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!colorsId) {
      return new NextResponse("colors Id is required", { status: 400 });
    }

    const color = await prismadb.color.findUnique({
      where: {
        id: colorsId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_GET]", error);
  }
  return new NextResponse("Internal error", { status: 500 });
}
