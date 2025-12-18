"use client";
import { useState } from "react";
import Image from "next/image";
import RelatedProduct from "@/components/shared/RelatedProduct";
import ShoppingStep from "@/components/shared/ShoppingStep";
import { steps } from "@/components/shared/steps";
import { GoArrowSwitch } from "react-icons/go";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GiReturnArrow } from "react-icons/gi";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";


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
 
    // ---- Sample Cart Data ---
    const [items, setItems] = useState([
        {
        id: 1,
        title: "New York Yankees Essential Black Cap",
        color: "Brown",
        size: "Free Size",
        qty: 1,
        price: 28846,
        img: "/assets/image/best-deal/best-deal-1.png",
        selected: false,
        },
        {
        id: 2,
        title: "New York Yankees Essential Black Cap",
        color: "Brown",
        size: "Free Size",
        qty: 1,
        price: 28846,
        img: "/assets/image/best-deal/best-deal-2.png",
        selected: false,
        },
        {
        id: 3,
        title: "New York Yankees Essential Black Cap",
        color: "Brown",
        size: "Free Size",
        qty: 1,
        price: 28846,
        img: "/assets/image/best-deal/best-deal-3.png",
        selected: false,
        },
    ]);

    // Select All Logic
    const [open, setOpen] = useState(false);
    const allSelected = items.every((i) => i.selected);
    const [shippingSelected, setShippingSelected] = useState(shippingOptions[0]);
    const [dropdownOpen, setDropdownOpen] = useState(false);


    const toggleSelectAll = () => {
        setItems(items.map((i) => ({ ...i, selected: !allSelected })));
    };

    const toggleItem = (id: number) => {
        setItems(items.map((i) => (i.id === id ? { ...i, selected: !i.selected } : i)));
    };

    // Quantity logic
    const increase = (id: number) => {
        setItems(items.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
    };

    const decrease = (id: number) => {
        setItems(
        items.map((i) =>
            i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i
        )
        );
    };

    // Summary Calculations
    const subtotal = items.reduce(
        (sum, i) => sum + (i.selected ? i.price * i.qty : 0),
        0
    );
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
                            Select {items.filter((i) => i.selected).length}/{items.length}
                            </span>
                        </label>
                        <h2 className="text-2xl text-stone-600">Add to Wishlist</h2>
                        </div>

                        {/* CART ITEMS */}
                        <div className="space-y-6">
                        {items.map((item) => (
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
                                    checked={item.selected}
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
                                src={item.img}
                                alt={item.img}
                                width={400}
                                height={400}
                                className="w-24 h-24 object-cover -md"
                                />
                            </div>

                            <div className="flex-1">
                                <h3 className="text-lg text-stone-800 font-semibold">
                                {item.title}
                                </h3>

                                {/* Color / Size */}
                                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                                <div>
                                    <span className="font-bold text-slate-700">Color:</span>{" "}
                                    {item.color}
                                </div>
                                <div>
                                    <span className="font-bold text-slate-700">Size:</span>{" "}
                                    {item.size}
                                </div>
                                </div>

                                {/* ACTIONS */}
                                <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center gap-3 text-slate-500">
                                    <button className="icon-btn p-1"><FaRegHeart /></button>
                                    <button className="icon-btn p-1"><GoArrowSwitch /></button>
                                    <button className="icon-btn p-1"><RiDeleteBin5Fill /></button>
                                </div>

                                <div className="flex items-center gap-6">
                                    {/* Quantity */}
                                    <div className="flex items-center border border-slate-100 -md overflow-hidden">
                                    <button
                                        className="px-3 text-lg text-zinc-500"
                                        onClick={() => decrease(item.id)}
                                    >
                                        −
                                    </button>
                                    <input
                                        type="text"
                                        value={item.qty}
                                        readOnly
                                        className="w-12 text-center border-x border-slate-100 outline-none text-zinc-500"
                                    />
                                    <button
                                        className="px-3 text-lg text-zinc-500"
                                        onClick={() => increase(item.id)}
                                    >
                                        +
                                    </button>
                                    </div>

                                    {/* Price */}
                                    <div className="price">৳{item.price}</div>
                                </div>
                                </div>
                            </div>
                            </article>
                        ))}
                        </div>
                    </div>
                    {/* RIGHT SUMMARY */}
                    <div className="lg:col-span-1">
                        <div className="flex justify-between pb-6 border-b border-slate-100">
                        <span className="text-neutral-800 text-2xl font-semibold">Summary</span>
                        <h2 className="text-2xl text-stone-600 font-semibold">
                            {items.length} Items
                        </h2>
                        </div>

                        <div className="py-6 text-neutral-800">
                        <div className="space-y-3">
                            <div className="flex justify-between pb-6 border-b border-slate-100 text-lg font-semibold">
                            <span>Subtotal</span>
                            <span>৳{subtotal}</span>
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
                                    <span className="text-lg font-semibold">৳{shippingSelected.price}</span>
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
                                    <span>৳{subtotal}</span>
                                </div>

                                {/* Total Cost (Subtotal + Shipping) */}
                                <div className="flex justify-between text-lg font-semibold">
                                    <span>Total Cost</span>
                                    <span>৳{subtotal + shippingSelected.price}</span>
                                </div>
                            </div>
                        <button className="w-full mt-6 py-4 bg-gray-900 text-white text-lg font-semibold hover:opacity-90 transition">
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
                            <GiReturnArrow className="w-5 h-5 mt-1 text-slate-400"/>
                            <div>
                                <div className="text-base text-stone-800 font-semibold">
                                Return & Refund Policy:
                                </div>
                                <div className="text-slate-500">Within 45 Days of Purchase</div>
                            </div>
                            </div>
                            <div className="flex gap-3 items-start">
                            <MdOutlinePrivacyTip className="w-5 h-5 mt-1 text-slate-400"/>
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
            <RelatedProduct/>
        </main>
    );
}
