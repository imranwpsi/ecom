import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { getOrderById } from "../actions"
import { ORDER_STATUSES, type OrderStatus } from "../order-status-options"
import { OrderStatusForm } from "../order-status-form"

const statusBadgeClass = (status: string) => {
    switch (status) {
        case "delivered":
            return "bg-emerald-100 text-emerald-700 border-emerald-200"
        case "processing":
            return "bg-amber-100 text-amber-700 border-amber-200"
        case "shipped":
            return "bg-sky-100 text-sky-700 border-sky-200"
        case "cancelled":
            return "bg-rose-100 text-rose-700 border-rose-200"
        default:
            return "bg-slate-100 text-slate-700 border-slate-200"
    }
}

const formatStatus = (status: string) =>
    status ? status[0].toUpperCase() + status.slice(1) : "Unknown"

const normalizeStatus = (status: string): OrderStatus =>
    ORDER_STATUSES.includes(status as OrderStatus) ? (status as OrderStatus) : "pending"

export default async function OrderDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const orderId = Number(id)
    const result = Number.isNaN(orderId) ? null : await getOrderById(orderId)

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
                            {result?.success && result.data ? (
                                <>
                                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h1 className="text-3xl font-bold">
                                                    Order #{result.data.id}
                                                </h1>
                                                <Badge
                                                    variant="outline"
                                                    className={statusBadgeClass(
                                                        result.data.status
                                                    )}
                                                >
                                                    {formatStatus(result.data.status)}
                                                </Badge>
                                            </div>
                                            <p className="text-muted-foreground mt-1">
                                                Placed on{" "}
                                                {new Date(
                                                    result.data.createdAt
                                                ).toLocaleString()}
                                            </p>
                                        </div>
                                        <OrderStatusForm
                                            orderId={result.data.id}
                                            initialStatus={normalizeStatus(
                                                result.data.status
                                            )}
                                        />
                                    </div>

                                    <div className="grid gap-6 lg:grid-cols-3">
                                        <div className="space-y-4 rounded-lg border p-4 lg:col-span-2">
                                            <h2 className="text-lg font-semibold">
                                                Items
                                            </h2>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Product</TableHead>
                                                        <TableHead>Price</TableHead>
                                                        <TableHead>Qty</TableHead>
                                                        <TableHead className="text-right">
                                                            Total
                                                        </TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {result.data.items.length ===
                                                        0 ? (
                                                        <TableRow>
                                                            <TableCell
                                                                colSpan={4}
                                                                className="text-center text-muted-foreground"
                                                            >
                                                                No items found.
                                                            </TableCell>
                                                        </TableRow>
                                                    ) : (
                                                        result.data.items.map((item) => (
                                                            <TableRow key={item.id}>
                                                                <TableCell>
                                                                    <div className="font-medium">
                                                                        {item.name}
                                                                    </div>
                                                                    {item.productId && (
                                                                        <div className="text-xs text-muted-foreground">
                                                                            Product ID:{" "}
                                                                            {item.productId}
                                                                        </div>
                                                                    )}
                                                                </TableCell>
                                                                <TableCell>
                                                                    ৳{item.price}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {item.quantity}
                                                                </TableCell>
                                                                <TableCell className="text-right">
                                                                    ৳{item.total}
                                                                </TableCell>
                                                            </TableRow>
                                                        ))
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="rounded-lg border p-4">
                                                <h2 className="text-lg font-semibold">
                                                    Customer
                                                </h2>
                                                <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                                                    <div className="font-medium text-foreground">
                                                        {result.data.fullName}
                                                    </div>
                                                    <div>{result.data.email}</div>
                                                    <div>{result.data.phone}</div>
                                                </div>
                                            </div>
                                            <div className="rounded-lg border p-4">
                                                <h2 className="text-lg font-semibold">
                                                    Shipping
                                                </h2>
                                                <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                                                    <div>
                                                        {result.data.addressLine1}
                                                    </div>
                                                    {result.data.addressLine2 && (
                                                        <div>
                                                            {result.data.addressLine2}
                                                        </div>
                                                    )}
                                                    <div>
                                                        {result.data.city}
                                                        {result.data.postalCode
                                                            ? `, ${result.data.postalCode}`
                                                            : ""}
                                                    </div>
                                                    <div className="font-medium text-foreground">
                                                        {result.data.shippingMethod}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="rounded-lg border p-4">
                                                <h2 className="text-lg font-semibold">
                                                    Payment
                                                </h2>
                                                <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                                                    <div className="font-medium text-foreground">
                                                        {result.data.paymentMethod.toUpperCase()}
                                                    </div>
                                                    <div>
                                                        Subtotal: ৳{result.data.subtotal}
                                                    </div>
                                                    <div>
                                                        Shipping: ৳{result.data.shippingCost}
                                                    </div>
                                                    <div className="font-semibold text-foreground">
                                                        Total: ৳{result.data.total}
                                                    </div>
                                                </div>
                                            </div>
                                            {result.data.note && (
                                                <div className="rounded-lg border p-4">
                                                    <h2 className="text-lg font-semibold">
                                                        Note
                                                    </h2>
                                                    <p className="mt-2 text-sm text-muted-foreground">
                                                        {result.data.note}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <Link
                                            href="/admin/orders"
                                            className="text-sm font-medium text-muted-foreground hover:text-foreground"
                                        >
                                            ← Back to orders
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <div className="border rounded-lg p-8 text-center text-destructive">
                                    {result?.error ||
                                        "Order not found. Return to the orders list."}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
