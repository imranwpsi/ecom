"use server"

import prisma from "@/lib/prisma"
import { revalidatePath, unstable_noStore as noStore } from "next/cache"
import { ORDER_STATUSES, type OrderStatus } from "./order-status-options"

export async function getOrders() {
    try {
        noStore()
        const orders = await prisma.order.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                _count: {
                    select: {
                        items: true,
                    },
                },
            },
        })
        return { success: true, data: orders }
    } catch (error) {
        console.error("Error fetching orders:", error)
        return { success: false, error: "Failed to fetch orders" }
    }
}

export async function getOrderById(id: number) {
    try {
        noStore()
        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                items: {
                    orderBy: {
                        id: "asc",
                    },
                },
            },
        })
        if (!order) {
            return { success: false, error: "Order not found" }
        }
        return { success: true, data: order }
    } catch (error) {
        console.error("Error fetching order:", error)
        return { success: false, error: "Failed to fetch order" }
    }
}

export async function updateOrderStatus(id: number, status: OrderStatus) {
    try {
        if (!ORDER_STATUSES.includes(status)) {
            return { success: false, error: "Invalid order status" }
        }

        const order = await prisma.order.update({
            where: { id },
            data: { status },
        })

        revalidatePath("/admin/orders")
        revalidatePath(`/admin/orders/${id}`)

        return { success: true, data: order }
    } catch (error) {
        console.error("Error updating order status:", error)
        return { success: false, error: "Failed to update order status" }
    }
}
