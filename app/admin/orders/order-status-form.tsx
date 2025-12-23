"use client"

import { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { updateOrderStatus } from "./actions"
import { ORDER_STATUSES, type OrderStatus } from "./order-status-options"

type OrderStatusFormProps = {
    orderId: number
    initialStatus: OrderStatus
}

export function OrderStatusForm({ orderId, initialStatus }: OrderStatusFormProps) {
    const [status, setStatus] = useState<OrderStatus>(initialStatus)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const { toast } = useToast()

    useEffect(() => {
        setStatus(initialStatus)
    }, [initialStatus])

    const handleUpdate = () => {
        startTransition(async () => {
            const result = await updateOrderStatus(orderId, status)
            if (result.success) {
                toast({
                    title: "Status updated",
                    description: `Order #${orderId} is now ${status}.`,
                })
                router.refresh()
            } else {
                toast({
                    title: "Update failed",
                    description: result.error || "Failed to update status",
                    variant: "destructive",
                })
            }
        })
    }

    return (
        <div className="flex flex-wrap items-center gap-3">
            <Select
                value={status}
                onValueChange={(value) => setStatus(value as OrderStatus)}
            >
                <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                    {ORDER_STATUSES.map((option) => (
                        <SelectItem key={option} value={option}>
                            {option[0].toUpperCase() + option.slice(1)}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button onClick={handleUpdate} disabled={isPending || status === initialStatus}>
                {isPending ? "Updating..." : "Update Status"}
            </Button>
        </div>
    )
}
