import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import prisma from "@/lib/prisma"

const orderItemSchema = z.object({
    productId: z.number().int().positive(),
    name: z.string().min(1),
    image: z.string().optional().nullable(),
    price: z.number().int().nonnegative(),
    quantity: z.number().int().positive(),
})

const orderSchema = z.object({
    customer: z.object({
        fullName: z.string().min(2),
        email: z.string().email(),
        phone: z.string().min(6),
        addressLine1: z.string().min(5),
        addressLine2: z.string().optional().nullable(),
        city: z.string().min(2),
        postalCode: z.string().optional().nullable(),
        note: z.string().optional().nullable(),
    }),
    items: z.array(orderItemSchema).min(1),
    shipping: z.object({
        method: z.string().min(1),
        cost: z.number().int().nonnegative(),
    }),
    paymentMethod: z.enum(["online", "cod"]),
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const parsed = orderSchema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Invalid order data",
                    issues: parsed.error.flatten(),
                },
                { status: 400 }
            )
        }

        const { customer, items, shipping, paymentMethod } = parsed.data
        const normalizedItems = items.map((item) => ({
            productId: item.productId,
            name: item.name,
            image: item.image ?? null,
            price: item.price,
            quantity: item.quantity,
            total: item.price * item.quantity,
        }))

        const subtotal = normalizedItems.reduce((sum, item) => sum + item.total, 0)
        const total = subtotal + shipping.cost

        const order = await prisma.order.create({
            data: {
                fullName: customer.fullName,
                email: customer.email,
                phone: customer.phone,
                addressLine1: customer.addressLine1,
                addressLine2: customer.addressLine2 ?? null,
                city: customer.city,
                postalCode: customer.postalCode ?? null,
                note: customer.note ?? null,
                paymentMethod,
                shippingMethod: shipping.method,
                shippingCost: shipping.cost,
                subtotal,
                total,
                items: {
                    create: normalizedItems,
                },
            },
            select: {
                id: true,
            },
        })

        revalidatePath("/admin/orders")
        revalidatePath(`/admin/orders/${order.id}`)

        return NextResponse.json(
            {
                success: true,
                data: {
                    orderId: order.id,
                },
            },
            { status: 201 }
        )
    } catch (error) {
        console.error("Error creating order:", error)
        return NextResponse.json(
            { success: false, error: "Failed to create order" },
            { status: 500 }
        )
    }
}
