"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export type ProductFormData = {
    name: string
    price: number | string
    description: string
    categoryId: number
    image?: string
}

export async function getProducts() {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                id: "desc",
            },
            include: {
                category: true,
            },
        })
        return { success: true, data: products }
    } catch (error) {
        console.error("Error fetching products:", error)
        return { success: false, error: "Failed to fetch products" }
    }
}

export async function getProductById(id: number) {
    try {
        const product = await prisma.product.findUnique({
            where: { id },
        })
        if (!product) {
            return { success: false, error: "Product not found" }
        }
        return { success: true, data: product }
    } catch (error) {
        console.error("Error fetching product:", error)
        return { success: false, error: "Failed to fetch product" }
    }
}

export async function createProduct(data: ProductFormData) {
    try {
        const product = await prisma.product.create({
            data: {
                name: data.name,
                price: Number(data.price),
                description: data.description,
                categoryId: data.categoryId,
                image: data.image || null,
            },
        })
        revalidatePath("/admin/products")
        return { success: true, data: product }
    } catch (error) {
        console.error("Error creating product:", error)
        return { success: false, error: "Failed to create product" }
    }
}

export async function updateProduct(id: number, data: ProductFormData) {
    try {
        const product = await prisma.product.update({
            where: { id },
            data: {
                name: data.name,
                price: Number(data.price),
                description: data.description,
                categoryId: data.categoryId,
                image: data.image || null,
            },
        })
        revalidatePath("/admin/products")
        revalidatePath(`/admin/products/${id}/edit`)
        return { success: true, data: product }
    } catch (error) {
        console.error("Error updating product:", error)
        return { success: false, error: "Failed to update product" }
    }
}

export async function deleteProduct(id: number) {
    try {
        await prisma.product.delete({
            where: { id },
        })

        revalidatePath("/admin/products")
        return { success: true }
    } catch (error) {
        console.error("Error deleting product:", error)
        return { success: false, error: "Failed to delete product" }
    }
}
