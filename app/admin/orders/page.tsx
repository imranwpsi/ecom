import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { getOrders } from "./actions"

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

export default async function OrdersPage() {
    const result = await getOrders()

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
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold">Orders</h1>
                                    <p className="text-muted-foreground mt-1">
                                        Track and manage customer orders
                                    </p>
                                </div>
                            </div>

                            {result.success && result.data ? (
                                <div className="border rounded-lg">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Order</TableHead>
                                                <TableHead>Customer</TableHead>
                                                <TableHead>Items</TableHead>
                                                <TableHead>Total</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Placed</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {result.data.length === 0 ? (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={7}
                                                        className="text-center py-8 text-muted-foreground"
                                                    >
                                                        No orders found.
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                result.data.map((order) => (
                                                    <TableRow key={order.id}>
                                                        <TableCell className="font-medium">
                                                            #{order.id}
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="text-sm font-medium">
                                                                {order.fullName}
                                                            </div>
                                                            <div className="text-xs text-muted-foreground">
                                                                {order.email}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>{order._count.items}</TableCell>
                                                        <TableCell>৳{order.total}</TableCell>
                                                        <TableCell>
                                                            <Badge
                                                                className={statusBadgeClass(
                                                                    order.status
                                                                )}
                                                                variant="outline"
                                                            >
                                                                {formatStatus(order.status)}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            {new Date(
                                                                order.createdAt
                                                            ).toLocaleDateString()}
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <Button
                                                                asChild
                                                                variant="outline"
                                                                size="sm"
                                                            >
                                                                <Link href={`/admin/orders/${order.id}`}>
                                                                    View
                                                                </Link>
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            ) : (
                                <div className="border rounded-lg p-8 text-center text-destructive">
                                    {result.error || "Failed to load orders"}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
