'use client'

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useState } from "react"

interface ImageUploadProps {
    label: string
    value: string
    disabled?: boolean
    onFileSelected: (file: File) => void
}

export function ImageUpload({
    label,
    value,
    disabled,
    onFileSelected
}: ImageUploadProps) {
    const [previewUrl, setPreviewUrl] = useState(value || "")

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            onFileSelected(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div>
            <div className="space-y-2">
                <Label htmlFor="image">{label}</Label>
                <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={disabled}
                />
                <p className="text-sm text-muted-foreground">
                    Upload an image for this {label} (JPEG, PNG, WEBP, or GIF, max 5MB)
                </p>

                {previewUrl && (
                    <div className="space-y-2">
                        <Label>{label} Image Preview</Label>
                        <div className="relative w-40 h-40 border rounded-lg overflow-hidden">
                            <Image
                                src={previewUrl}
                                alt={`${label} preview`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}