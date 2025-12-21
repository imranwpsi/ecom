import { Product } from "@/app/generated/prisma/client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface CartItem extends Product {
    quantity: number
}

interface CartState {
    items: CartItem[]
}

const initialState: CartState = {
    items: [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existing = state.items.find(
                (item) => item.id === action.payload.id
            )

            if (existing) {
                existing.quantity += 1
            } else {
                state.items.push({ ...action.payload, quantity: 1 })
            }
        },

        addToCartWithQty: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
            const { product, quantity } = action.payload
            const existing = state.items.find(
                (item) => item.id === product.id
            )

            if (existing) {
                existing.quantity += quantity
            } else {
                state.items.push({ ...product, quantity })
            }
        },

        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            )
        },

        increaseQty: (state, action: PayloadAction<number>) => {
            const item = state.items.find(i => i.id === action.payload)
            if (item) item.quantity += 1
        },

        decreaseQty: (state, action: PayloadAction<number>) => {
            const item = state.items.find(i => i.id === action.payload)
            if (item && item.quantity > 1) {
                item.quantity -= 1
            }
        },

        clearCart: (state) => {
            state.items = []
        },

        setCart: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload
        },
    },
})

export const {
    addToCart,
    addToCartWithQty,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    setCart,
} = cartSlice.actions

export default cartSlice.reducer
