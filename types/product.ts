import { Product as PrismaProduct } from "@/app/generated/prisma/client";

export interface Product extends PrismaProduct {
    originalPrice?: number;
    discount?: number;
    badge?: string;
    category?: string;
}
