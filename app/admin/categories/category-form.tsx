"use client"

import { useState } from "react"
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
import { createCategory, updateCategory, type CategoryFormData } from "./actions"
import { useToast } from "@/hooks/use-toast"
import { ImageUpload } from "@/components/image-upload"
import { uploadImage } from "@/lib/upload-image"

interface CategoryFormProps {
    category?: {
        id: number
        name: string
        image: string | null
    }
}

export function CategoryForm({ category }: CategoryFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [name, setName] = useState(category?.name || "")
    const [file, setFile] = useState<File | null>(null)
    const router = useRouter()
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            let imageUrl = category?.image || "";

            if (file) {
                setIsUploading(true)
                const uploadResponse = await uploadImage(file, "categories")
                setIsUploading(false)
                imageUrl = uploadResponse
            }

            const formData: CategoryFormData = {
                name,
                image: imageUrl || undefined,
            }

            const result = category
                ? await updateCategory(category.id, formData)
                : await createCategory(formData)

            if (result.success) {
                toast({
                    title: "Success",
                    description: category
                        ? "Category updated successfully"
                        : "Category created successfully",
                })
                router.push("/admin/categories")
                router.refresh()
            } else {
                toast({
                    title: "Error",
                    description: result.error || "Failed to save category",
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
                    <CardTitle>{category ? "Edit" : "Create"} Category</CardTitle>
                    <CardDescription>
                        {category
                            ? "Update the category information below"
                            : "Fill in the details to create a new category"}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                    <ImageUpload
                        label="Category Image"
                        value={category?.image || ""}
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
                                : category
                                    ? "Update Category"
                                    : "Create Category"}
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
