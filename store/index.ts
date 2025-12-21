import { configureStore } from "@reduxjs/toolkit"
import cartReducer, { CartItem } from "./cartSlice"

// Load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
    if (typeof window === "undefined") return []
    try {
        const saved = localStorage.getItem("cart")
        return saved ? JSON.parse(saved) : []
    } catch {
        return []
    }
}

// Save cart to localStorage
const saveCartToStorage = (items: CartItem[]) => {
    if (typeof window === "undefined") return
    try {
        localStorage.setItem("cart", JSON.stringify(items))
    } catch {
        // Ignore localStorage errors
    }
}

// Create store with preloaded state
const preloadedState = {
    cart: {
        items: loadCartFromStorage(),
    },
}

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
    preloadedState,
})

// Subscribe to store changes to persist cart
store.subscribe(() => {
    saveCartToStorage(store.getState().cart.items)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
