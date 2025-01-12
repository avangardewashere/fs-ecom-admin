import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeid: string; categoryId: string } }
) {
  try {
    const { userId } = await auth();

    const body = await req.json();

    const { name,billboardId } = await body;

    const { categoryId } = await params;
    const { storeid } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard Id is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
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
    console.log(name,billboardId)
    const category = await prismadb.category.updateMany({
      where: {
        id: categoryId,
        // storeid: storeid,
      },
      data: { name:name , billboardId },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
  }
  return new NextResponse("Internal error", { status: 500 });
}

/////////// Delete function

export async function DELETE(
  req: Request,
  { params }: { params: { storeid: string; categoryId: string } }
) {
  try {
    const { userId } = await auth();
    const { storeid, categoryId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeid) {
      return new NextResponse("Store Id is required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("category  Id is required", { status: 400 });
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

    const category = await prismadb.category.deleteMany({
      where: {
        id: categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
  }
  return new NextResponse("Internal error", { status: 500 });
}

////// Get function

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { userId } = await auth();
    const { categoryId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!categoryId) {
      return new NextResponse("category  Id is required", { status: 400 });
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: categoryId,
      },include:{
        billboard:true
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_GET]", error);
  }
  return new NextResponse("Internal error", { status: 500 });
}
