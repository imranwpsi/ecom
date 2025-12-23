"use client";
import Image from "next/image";
import Link from "next/link";
import RelatedProduct from "@/components/shared/RelatedProduct";
import ShoppingStep from "@/components/shared/ShoppingStep";
import { steps } from "@/components/shared/steps";
import { GoArrowSwitch } from "react-icons/go";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GiReturnArrow } from "react-icons/gi";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { increaseQty, decreaseQty, removeFromCart } from "@/store/cartSlice";


const images = [
    "/assets/image/payment/AMEX.webp",
    "/assets/image/payment/Bkash.webp",
    "/assets/image/payment/Nagad.webp",
    "/assets/image/payment/Rocket.webp",
    "/assets/image/payment/Mastercard.webp",
    "/assets/image/payment/visa-logo.webp",
    "/assets/image/payment/surface1.webp",
    "/assets/image/payment/Group 65.webp",
];
const shippingOptions = [
    { label: "Outside Of Dhaka", price: 120 },
    { label: "Inside Dhaka", price: 60 },
    { label: "Express Delivery (Dhaka Only)", price: 150 }
];

export default function Cart() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const cartItems = useAppSelector((state) => state.cart.items);

    // Coupon and shipping state
    const [open, setOpen] = useState(false);
    const [shippingSelected, setShippingSelected] = useState(shippingOptions[0]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const checkoutSelectionKey = "checkoutSelection";

    useEffect(() => {
        if (selectedItems.length === 0) return;
        const availableIds = new Set(cartItems.map((item) => item.id));
        const nextSelected = selectedItems.filter((id) => availableIds.has(id));
        if (nextSelected.length !== selectedItems.length) {
            setSelectedItems(nextSelected);
        }
    }, [cartItems, selectedItems]);

    // Select All Logic
    const allSelected = cartItems.length > 0 && selectedItems.length === cartItems.length;

    const toggleSelectAll = () => {
        if (allSelected) {
            setSelectedItems([]);
        } else {
            setSelectedItems(cartItems.map((item) => item.id));
        }
    };

    const toggleItem = (id: number) => {
        setSelectedItems(prev =>
            prev.includes(id)
                ? prev.filter(itemId => itemId !== id)
                : [...prev, id]
        );
    };

    const selectedCartItems = useMemo(() => {
        if (selectedItems.length === 0) return [];
        const selectedSet = new Set(selectedItems);
        return cartItems.filter((item) => selectedSet.has(item.id));
    }, [cartItems, selectedItems]);

    const selectedSubtotal = useMemo(
        () =>
            selectedCartItems.reduce(
                (sum, item) => sum + Number(item.price) * item.quantity,
                0
            ),
        [selectedCartItems]
    );

    const selectedItemsCount = useMemo(
        () => selectedCartItems.reduce((sum, item) => sum + item.quantity, 0),
        [selectedCartItems]
    );

    const shippingCost = selectedCartItems.length > 0 ? shippingSelected.price : 0;
    const totalCost = selectedSubtotal + shippingCost;

    const handleProceedToCheckout = () => {
        if (selectedItems.length === 0) return;
        if (typeof window !== "undefined") {
            localStorage.setItem(
                checkoutSelectionKey,
                JSON.stringify(selectedItems)
            );
        }
        router.push("/Checkout");
    };

    return (
        <main>
            {/* Active Step = 0 */}
            <ShoppingStep steps={steps} activeStep={0} />
            {/* CART PAGE */}
            <section className="maincart-wrapper text-slate-800 mt-10 md:mt-20">
                <div className="container mx-auto px-4 sm:px-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-16">
                        {/* LEFT SECTION */}
                        <div className="lg:col-span-2">
                            {/* Select All */}
                            <div className="flex justify-between pb-6 border-b border-slate-100">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="peer hidden"
                                        checked={allSelected}
                                        onChange={toggleSelectAll}
                                        disabled={cartItems.length === 0}
                                    />
                                    <div className="h-5 w-5 border-2 border-zinc-500 flex items-center justify-center peer-checked:bg-black peer-checked:border-black transition">
                                        <svg
                                            className="h-4 w-4 text-white peer-checked:opacity-100 transition"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                        >
                                            <path d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-zinc-700 text-2xl font-bold">
                                        Select {selectedItems.length}/{cartItems.length}
                                    </span>
                                </label>
                                <h2 className="text-2xl text-stone-600">Add to Wishlist</h2>
                            </div>

                            {/* CART ITEMS */}
                            <div className="space-y-6">
                                {cartItems.length === 0 ? (
                                    <div className="py-12 text-center">
                                        <p className="text-xl text-gray-500">Your cart is empty</p>
                                        <Link href="/ShopOne" className="inline-block mt-4 px-6 py-3 bg-gray-900 text-white font-semibold hover:bg-gray-800 transition">
                                            Continue Shopping
                                        </Link>
                                    </div>
                                ) : (
                                    cartItems.map((item) => (
                                        <article
                                            key={item.id}
                                            className="flex  flex-col sm:flex-row gap-4 items-start border-b border-slate-100 py-6"
                                        >
                                            <div className="flex items-start gap-4">
                                                {/* Checkbox */}
                                                <label className="cursor-pointer mt-2">
                                                    <input
                                                        type="checkbox"
                                                        className="peer hidden"
                                                        checked={selectedItems.includes(item.id)}
                                                        onChange={() => toggleItem(item.id)}
                                                    />
                                                    <div className="h-5 w-5 border-2 border-zinc-500 flex items-center justify-center peer-checked:bg-black peer-checked:border-black transition">
                                                        <svg
                                                            className="h-4 w-4 text-white peer-checked:opacity-100 transition"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="3"
                                                        >
                                                            <path d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                </label>

                                                {/* IMAGE */}
                                                <Image
                                                    src={item.image || '/assets/image/placeholder.png'}
                                                    alt={item.name}
                                                    width={400}
                                                    height={400}
                                                    className="w-24 h-24 object-cover -md"
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <h3 className="text-lg text-stone-800 font-semibold">
                                                    {item.name}
                                                </h3>

                                                {/* Color / Size */}
                                                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                                                    <div>
                                                        <span className="font-bold text-slate-700">Color:</span>{" "}
                                                        Default
                                                    </div>
                                                    <div>
                                                        <span className="font-bold text-slate-700">Size:</span>{" "}
                                                        Free Size
                                                    </div>
                                                </div>

                                                {/* ACTIONS */}
                                                <div className="mt-4 flex items-center justify-between">
                                                    <div className="flex items-center gap-3 text-slate-500">
                                                        <button className="icon-btn p-1"><FaRegHeart /></button>
                                                        <button className="icon-btn p-1"><GoArrowSwitch /></button>
                                                        <button
                                                            className="icon-btn p-1 hover:text-red-500 transition-colors"
                                                            onClick={() => dispatch(removeFromCart(item.id))}
                                                        >
                                                            <RiDeleteBin5Fill />
                                                        </button>
                                                    </div>

                                                    <div className="flex items-center gap-6">
                                                        {/* Quantity */}
                                                        <div className="flex items-center border border-slate-100 -md overflow-hidden">
                                                            <button
                                                                className="px-3 text-lg text-zinc-500 hover:bg-gray-100 transition-colors"
                                                                onClick={() => dispatch(decreaseQty(item.id))}
                                                            >
                                                                −
                                                            </button>
                                                            <input
                                                                type="text"
                                                                value={item.quantity}
                                                                readOnly
                                                                className="w-12 text-center border-x border-slate-100 outline-none text-zinc-500"
                                                            />
                                                            <button
                                                                className="px-3 text-lg text-zinc-500 hover:bg-gray-100 transition-colors"
                                                                onClick={() => dispatch(increaseQty(item.id))}
                                                            >
                                                                +
                                                            </button>
                                                        </div>

                                                        {/* Price */}
                                                        <div className="price font-semibold">৳{(Number(item.price) * item.quantity).toFixed(0)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    ))
                                )}
                            </div>
                        </div>
                        {/* RIGHT SUMMARY */}
                        <div className="lg:col-span-1">
                            <div className="flex justify-between pb-6 border-b border-slate-100">
                                <span className="text-neutral-800 text-2xl font-semibold">Summary</span>
                                <h2 className="text-2xl text-stone-600 font-semibold">
                                    {selectedItemsCount} Items
                                </h2>
                            </div>

                            <div className="py-6 text-neutral-800">
                                <div className="space-y-3">
                                    <div className="flex justify-between pb-6 border-b border-slate-100 text-lg font-semibold">
                                        <span>Subtotal</span>
                                        <span>৳{selectedSubtotal.toFixed(0)}</span>
                                    </div>
                                    <div className="Coupon-section">
                                        {/* Top Row */}
                                        <div className="flex justify-between items-center border-b border-slate-100 pb-6 text-lg font-semibold">
                                            <span>Coupon Discount</span>

                                            <button
                                                onClick={() => setOpen(!open)}
                                                className="underline cursor-pointer"
                                            >
                                                Apply Coupon
                                            </button>
                                        </div>

                                        {/* Input Field (toggle open/close) */}
                                        {open && (
                                            <div className="mt-4 flex gap-3">
                                                <input
                                                    type="text"
                                                    placeholder="Enter coupon code"
                                                    className="w-full border border-slate-300 px-4 py-2"
                                                />
                                                <button className="bg-black text-white px-5 cursor-pointer">
                                                    Apply
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    {/* Shipping Dropdown */}
                                    <div className="w-full">
                                        <div className="flex justify-between items-center pb-4">
                                            {/* Dropdown Button */}
                                            <div
                                                className="flex items-center gap-2 cursor-pointer select-none"
                                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                            >
                                                <span>{shippingSelected.label}</span>
                                                <IoIosArrowDown />
                                            </div>

                                            {/* Price */}
                                            <span className="text-lg font-semibold">৳{shippingCost}</span>
                                        </div>

                                        {/* Dropdown Menu */}
                                        {dropdownOpen && (
                                            <div className="mt-2 bg-white border border-slate-200 rounded-md shadow-md">
                                                {shippingOptions.map((option, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => {
                                                            setShippingSelected(option);
                                                            setDropdownOpen(false);
                                                        }}
                                                        className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
                                                    >
                                                        {option.label}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="border-t border-dashed border-stone-300 my-4"></div>
                                    {/* Subtotal */}
                                    <div className="flex justify-between text-lg font-semibold">
                                        <span>Subtotal</span>
                                        <span>৳{selectedSubtotal.toFixed(0)}</span>
                                    </div>

                                    {/* Total Cost (Subtotal + Shipping) */}
                                    <div className="flex justify-between text-lg font-semibold">
                                        <span>Total Cost</span>
                                        <span>৳{totalCost.toFixed(0)}</span>
                                    </div>
                                </div>
                                <button
                                    className="w-full mt-6 py-4 bg-gray-900 text-white text-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={selectedItems.length === 0}
                                    onClick={handleProceedToCheckout}
                                >
                                    PROCEED TO CHECKOUT
                                </button>

                                {/* Payment Icons */}
                                <div className="mt-6">
                                    <p className="text-base text-stone-800 font-semibold">
                                        We Using Safe Payment For
                                    </p>
                                    <div className="flex items-center mt-3">
                                        {images.map((src, i) => (
                                            <div key={i} className="flex items-center justify-center">
                                                <Image
                                                    src={src}
                                                    alt={`product-${i}`}
                                                    width={44}
                                                    height={16}
                                                    className="h-4 object-contain opacity-80"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Extra Info */}
                                <div className="border-t border-dashed border-stone-300 my-6"></div>

                                <div className="space-y-4 text-sm text-slate-600">
                                    <div className="flex gap-3 items-start">
                                        <GiReturnArrow className="w-5 h-5 mt-1 text-slate-400" />
                                        <div>
                                            <div className="text-base text-stone-800 font-semibold">
                                                Return & Refund Policy:
                                            </div>
                                            <div className="text-slate-500">Within 45 Days of Purchase</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <MdOutlinePrivacyTip className="w-5 h-5 mt-1 text-slate-400" />
                                        <div>
                                            <div className="text-base text-stone-800 font-semibold">
                                                Security & Privacy
                                            </div>
                                            <div className="text-slate-500">
                                                We protect your privacy and keep your personal details safe
                                                and secure.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* END RIGHT SUMMARY */}
                    </div>
                </div>
            </section>
            {/* RELATED PRODUCTS */}
            <RelatedProduct />
        </main>
    );
}
