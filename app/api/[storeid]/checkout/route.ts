import prismadb from "@/lib/prismadb";
import {stripe} from "@/lib/stripe"
import { Currency } from "lucide-react";
import { NextResponse } from "next/server"
import Stripe from "stripe";

const corsHeaders ={
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT,DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-TYpe, Authorization",
}


export async function OPTIONS(){
    return NextResponse.json({},{headers:corsHeaders});
}


export async function POST(
    req:Request,{params}:{params:{storeid:string}}
){
    const {productIds} = await req.json()

    if(!productIds || productIds.length ===0) {
        return new NextResponse("Product Ids are required",{status:400})


    }

    const products = await prismadb.product.findMany({
        where:{
            id:{
                in:productIds
            }
        }
    })

    const lineItems:Stripe.Checkout.SessionCreateParams.LineItem[] = []

    products.forEach((product)=>{
        line_items.push({
            quantity:1,
            price_data:{
                Currency:'USD',
            }
        })
    })
}
