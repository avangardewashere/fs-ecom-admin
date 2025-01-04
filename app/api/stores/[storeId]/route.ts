import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = await auth();

    const body = await req.json();

    const { name } = await body();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        userId: userId,
      },
      data: { name: name },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_PATCH]", error);
  }
  return new NextResponse("Internal error", { status: 500 });
}


export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string } }
  ) {
    try {
      const { userId } = await auth();
  
     
  
   
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      if (!params.storeId) {
        return new NextResponse("Store Id is required", { status: 400 });
      }
  
      const store = await prismadb.store.deleteMany({
        where: {
          id: params.storeId,
          userId: userId,
        },
      
      });
  
      return NextResponse.json(store);
    } catch (error) {
      console.log("[STORE_DELETE]", error);
    }
    return new NextResponse("Internal error", { status: 500 });
  }
  