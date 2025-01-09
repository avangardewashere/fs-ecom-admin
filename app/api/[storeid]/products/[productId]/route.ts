import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
 
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeid: string; productId: string } }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();

  
 
    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived,
    } = body;

    const { productId } = await params;
    const { storeid } = await params;
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is Rerquried");
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Color ID is required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("Size ID is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!storeid) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    if (!productId) {
      return new NextResponse("Product Id is required", { status: 400 });
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

    await prismadb.product.update({
      where: {
        id: productId,
        // storeId: storeId,
      },
      data: {
        name,
        price: Number(price),
        categoryId,
        colorId,
        sizeId,
        images: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
      },
    });

    const product = await prismadb.product.update({
      where: {
        id: productId,
      },
      data: {
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image),
            ],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
 
    console.log("[PRODUCT_PATCH]", error);
  }
  return new NextResponse("Internal error", { status: 500 });
}

/////////// Delete function

export async function DELETE(
  req: Request,
  { params }: { params: { storeid: string; productId: string } }
) {
  try {
    const { userId } = await auth();
    const { storeid, productId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeid) {
      return new NextResponse("Store Id is required", { status: 400 });
    }
    if (!productId) {
      return new NextResponse("Product  Id is required", { status: 400 });
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

    const product = await prismadb.product.deleteMany({
      where: {
        id: productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    //checking this later
    console.log("[product_DELETE]", error);
  }
  return new NextResponse("Internal error", { status: 500 });
}

////// Get function

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    // const { userId } = await auth(); 
    const { productId } = await params;

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    if (!productId) {
      return new NextResponse("product  Id is required", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    });

    // if (product && product.price instanceof Decimal) {
    //   product.price = product.price.toNumber() ; // Convert Decimal to number
    // }

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
  }
  return new NextResponse("Internal error", { status: 500 });
}
