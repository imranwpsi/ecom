"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { createProduct, updateProduct, type ProductFormData } from "./actions"
import { useToast } from "@/hooks/use-toast"
import { ImageUpload } from "@/components/image-upload"
import { uploadImage } from "@/lib/upload-image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Category } from "@/app/generated/prisma/client"
import { getCategories } from "../categories/actions"
import { Textarea } from "@/components/ui/textarea"

interface ProductFormProps {
    product?: {
        id: number
        name: string
        price: number
        description: string
        categoryId: number
        image: string | null
    }
}

export function ProductForm({ product }: ProductFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [name, setName] = useState(product?.name || "")
    const [price, setPrice] = useState(product?.price || 0)
    const [description, setDescription] = useState(product?.description || "")
    const [categoryId, setCategoryId] = useState(product?.categoryId.toString() || "")
    const [file, setFile] = useState<File | null>(null)
    const router = useRouter()
    const { toast } = useToast()
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        const fetchCategories = async () => {
            const result = await getCategories()
            if (result.success && result.data) {
                setCategories(result.data)
            }
        }
        fetchCategories()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            let imageUrl = product?.image || "";

            if (file) {
                setIsUploading(true)
                const uploadResponse = await uploadImage(file, "products")
                setIsUploading(false)
                imageUrl = uploadResponse
            }

            const formData: ProductFormData = {
                name,
                price,
                description,
                categoryId: parseInt(categoryId),
                image: imageUrl || undefined,
            }

            const result = product
                ? await updateProduct(product.id, formData)
                : await createProduct(formData)

            if (result.success) {
                toast({
                    title: "Success",
                    description: product
                        ? "Product updated successfully"
                        : "Product created successfully",
                })
                router.push("/admin/products")
                router.refresh()
            } else {
                toast({
                    title: "Error",
                    description: result.error || "Failed to save product",
                    variant: "destructive",
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "An unexpected error occurred",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
            setIsUploading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>{product ? "Edit" : "Create"} Product</CardTitle>
                    <CardDescription>
                        {product
                            ? "Update the product information below"
                            : "Fill in the details to create a new product"}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="categoryId">
                            Category <span className="text-destructive">*</span>
                        </Label>
                        <Select
                            value={categoryId}
                            onValueChange={(value) => setCategoryId(value.toString())}
                            required
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories?.length > 0 && categories.map((category) => (
                                    <SelectItem key={category.id} value={category.id.toString()}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name">
                            Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Electronics, Clothing, etc."
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">
                            Description <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description of the product"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="price">
                            Price <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            placeholder="Price of the product"
                            required
                        />
                    </div>
                    <ImageUpload
                        label="Product Image"
                        value={product?.image || ""}
                        disabled={isSubmitting || isUploading}
                        onFileSelected={(file) => setFile(file)}
                    />
                </CardContent>
                <CardFooter className="flex gap-2">
                    <Button type="submit" disabled={isSubmitting || !name || isUploading}>
                        {isUploading
                            ? "Uploading..."
                            : isSubmitting
                                ? "Saving..."
                                : product
                                    ? "Update Product"
                                    : "Create Product"}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/admin/categories")}
                        disabled={isSubmitting || isUploading}
                    >
                        Cancel
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}
