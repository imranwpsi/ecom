"use client";

import React, { useState } from "react";
import { BiSolidOffer } from "react-icons/bi";
import { GiSelfLove } from "react-icons/gi";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { AiFillStar as Star } from "react-icons/ai";
import Image from "next/image";
import { Product } from "@/app/generated/prisma/client";
import { useAppDispatch } from "@/store/hooks";
import { addToCartWithQty } from "@/store/cartSlice";

const ProductDetails = ({ product }: { product: Product }) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(true);
    const [openReviews, setOpenReviews] = useState(true);
    const [openShipping, setOpenShipping] = useState(false);
    const [openReturn, setOpenReturn] = useState(false);
    const [openShare, setOpenShare] = useState(false);
    const [qty, setQty] = useState(1);

    // const images = [
    //     "/assets/image/product/cap-1.jpg",
    //     "/assets/image/product/cap-2.jpg",
    //     "/assets/image/product/cap-3.jpg",
    //     "/assets/image/product/cap-4.jpg",
    //     "/assets/image/product/cap-5.jpg",
    //     "/assets/image/product/cap-6.jpg",
    // ];

    const colors = [
        { id: 1, img: "/assets/image/product/cap-1.jpg" },
        { id: 2, img: "/assets/image/product/cap-2.jpg" },
        { id: 3, img: "/assets/image/product/cap-3.jpg" },
    ];

    return (
        <div className="container mx-auto">
            <div className="w-full pb-20 px-3 text-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
                    {/* LEFT IMAGES */}
                    {/* <div className="grid grid-cols-2 gap-6">
                        {images.map((src, i) => (
                            <div key={i} className="relative w-full overflow-hidden">
                                <Image
                                    src={src}
                                    alt="cap"
                                    width={600}
                                    height={600}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                        ))}
                    </div> */}
                    <Image
                        src={product.image!}
                        alt={product.name}
                        width={600}
                        height={600}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />

                    {/* RIGHT DETAILS */}
                    <div className="w-full space-y-4">
                        {/* Reviews */}
                        {/* Stars */}
                        <div className="flex items-center gap-1 mt-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star
                                    key={i}
                                    size={18}
                                    className="fill-yellow-400 text-yellow-400"
                                />
                            ))}
                            <span className="text-sm text-[#6B7280] mt-1">(5k+ Reviews)</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl text-gray-900 font-bold">
                            {product.name}
                        </h1>

                        {/* Price */}
                        <div className="flex items-center gap-4">
                            <span className="text-2xl text-gray-900 font-bold">
                                ${product.price}
                            </span>
                            {/* <span className="text-lg text-gray-400 line-through">
                                $260.00
                            </span>
                            <span className="flex items-center bg-gray-800 text-white text-xs font-bold px-2 py-1">
                                <BiSolidOffer />
                                20% OFF
                            </span> */}
                        </div>

                        {/* Offer Box */}
                        <div className="text-zinc-500 py-2">
                            <div className="flex items-start gap-2">
                                <span>
                                    <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_1141_1885)">
                                            <path d="M0 11.3777V10.8727C0.10072 10.4834 0.265053 10.1327 0.549323 9.84228C3.57954 6.7504 6.60712 3.65717 9.63402 0.563258C9.99648 0.192937 10.4332 0.00472946 10.9427 0.00405245C13.256 0.00202144 15.5692 -0.00542561 17.8818 0.00676047C18.9175 0.0121765 19.6239 0.756205 19.6265 1.81301C19.6318 4.16086 19.6279 6.50871 19.6285 8.85656C19.6285 9.38733 19.4496 9.84025 19.0812 10.2167C16.053 13.3092 13.0274 16.4052 9.99185 19.4903C9.79703 19.6886 9.54059 19.8565 9.28283 19.95C8.57249 20.2079 7.9675 19.9764 7.448 19.4442C5.24275 17.1871 3.03751 14.9293 0.824978 12.6803C0.453904 12.3025 0.120599 11.9132 0.000662633 11.3764L0 11.3777ZM13.7291 4.75662C13.7371 5.46409 14.3003 6.03752 14.9881 6.03819C15.6792 6.03819 16.2637 5.43701 16.2537 4.73564C16.2438 4.03494 15.6719 3.45542 14.9894 3.45407C14.2937 3.45271 13.7211 4.04442 13.7291 4.75662Z" fill="#70747D" />
                                            <path d="M11.5244 20.3101C11.5927 20.26 11.6742 20.2153 11.7365 20.1517C14.7388 17.0869 17.7379 14.018 20.7443 10.9573C21.1352 10.5592 21.3168 10.1097 21.3148 9.54576C21.3049 7.0449 21.3115 4.54405 21.3122 2.0432C21.3122 1.95248 21.3122 1.86108 21.3122 1.74599C21.8217 1.73854 22.2226 1.93758 22.5526 2.29572C22.8594 2.6288 22.9979 3.03501 22.9986 3.48725C23.0012 5.86556 23.0006 8.24456 22.9992 10.6229C22.9992 11.1381 22.8091 11.5734 22.4532 11.9369C19.6735 14.7756 16.8984 17.6184 14.1133 20.4509C13.346 21.2315 12.244 21.1767 11.5251 20.3108L11.5244 20.3101Z" fill="#70747D" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1141_1885">
                                                <rect width="23" height="21" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </span>
                                <p>
                                    <span className="text-lg font-semibold">Flat 20% </span>
                                    Off on orders above
                                    <span className="text-lg font-semibold"> TK. 2000</span>
                                    , Use Code:
                                    <span className="font-semibold"> HIUKLS34</span>
                                </p>
                            </div>
                        </div>

                        {/* Colors */}
                        <div className="color-img">
                            <p className="text-gray-700 text-lg font-semibold mb-2">
                                COLOR: <span className="text-gray-400">Brown</span>
                            </p>
                            <div className="flex items-center gap-3">
                                {colors.map((color) => (
                                    <div
                                        key={color.id}
                                        className="w-14 h-14 border border-slate-200 overflow-hidden"
                                    >
                                        <Image
                                            src={color.img}
                                            alt="color"
                                            width={60}
                                            height={60}
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Size */}
                        <div className="border-b border-slate-200 pb-3">
                            <p className="text-gray-700 text-lg font-semibold mb-2">
                                SIZE: <span className="text-gray-400">Free Size</span>
                            </p>

                            <button className="px-4 py-2 text-black bg-zinc-300">
                                Free Size
                            </button>

                            <p className="text-lime-600 text-lg mt-2">● 13 in stock</p>
                        </div>

                        {/* Quantity + Cart */}
                        <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center border border-slate-200">
                                <button
                                    className="px-3 py-2 text-gray-700 border-r border-slate-200"
                                    onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                                >
                                    -
                                </button>

                                <span className="px-4 py-2 text-gray-700 border-r border-slate-200">
                                    {qty}
                                </span>

                                <button
                                    className="px-3 py-2 text-gray-700"
                                    onClick={() => setQty(qty + 1)}
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={() => dispatch(addToCartWithQty({ product, quantity: qty }))}
                                className="flex-1 text-sm sm:text-lg bg-white text-gray-700 py-3 border font-semibold hover:bg-gray-100 transition-colors"
                            >
                                ADD TO CART
                            </button>

                            <button className="w-10 h-10 sm:w-12 sm:h-12 text-gray-700 bg-white border flex items-center justify-center">
                                <GiSelfLove />
                            </button>

                            <button className="w-10 h-10 sm:w-12 sm:h-12 text-gray-700 bg-white border flex items-center justify-center">
                                <svg className="w-4 h-4 text-gray-700" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.2 15.089V13.3L19.95 16.15L15.2 19V17.014C12.2763 16.5963 9.73874 14.6855 8.55276 11.918L8.55 11.9117L8.54725 11.918C7.19998 15.0617 4.10883 17.1 0.688588 17.1H0V15.2H0.688588C3.34878 15.2 5.753 13.6146 6.80091 11.1695L7.51643 9.5L6.80091 7.83047C5.753 5.38534 3.34878 3.8 0.688588 3.8H0V1.9H0.688588C4.10883 1.9 7.19998 3.93829 8.54725 7.08199L8.55 7.08834L8.55276 7.08199C9.73874 4.31452 12.2763 2.40371 15.2 1.98598V0L19.95 2.85L15.2 5.7V3.911C13.0403 4.31075 11.185 5.76337 10.2991 7.83047L9.5836 9.5L10.2991 11.1695C11.185 13.2366 13.0403 14.6893 15.2 15.089Z" fill="currentColor" />
                                </svg>
                            </button>
                        </div>

                        <button className="w-full text-lg bg-gray-900 text-white py-3 mt-2 font-semibold">
                            BUY NOW
                        </button>
                        {/* COLLAPSIBLE DESCRIPTION */}
                        <div className="border-b border-slate-200 pb-4">
                            <button
                                onClick={() => setOpen(!open)}
                                className="w-full flex items-center justify-between"
                            >
                                <h1 className="text-gray-700 text-2xl font-bold">
                                    Product Description
                                </h1>

                                {open ? (
                                    <FiChevronUp className="w-6 h-6 text-gray-700" />
                                ) : (
                                    <FiChevronDown className="w-6 h-6 text-gray-700" />
                                )}
                            </button>

                            <div
                                className={`transition-all duration-300 overflow-hidden ${open ? "max-h-[500px] mt-4" : "max-h-0"
                                    }`}
                            >
                                <div className="space-y-3">
                                    {/* {Object.entries(product.description).map(
                                        ([label, value], idx) => (
                                            <div key={idx} className="flex">
                                                <span className="max-w-24 w-full text-gray-700 text-lg font-semibold">
                                                    {label}:
                                                </span>
                                                <span className="text-gray-700 text-lg font-normal">{value}</span>
                                            </div>
                                        )
                                    )} */}
                                </div>
                            </div>
                        </div>

                        {/* Extra Info */}
                        <div className="border-b border-slate-200 pb-4">
                            <button
                                onClick={() => setOpenShipping(!openShipping)}
                                className="w-full flex items-center justify-between"
                            >
                                <h1 className="text-gray-700 text-2xl font-bold">Shipping Details</h1>

                                {openShipping ? (
                                    <FiChevronUp className="w-6 h-6 text-gray-700" />
                                ) : (
                                    <FiChevronDown className="w-6 h-6 text-gray-700" />
                                )}
                            </button>

                            <div
                                className={`transition-all duration-300 overflow-hidden ${openShipping ? "max-h-[500px] mt-4" : "max-h-0"
                                    }`}
                            >
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    • Processing Time: 1–2 business days <br />
                                    • Standard Delivery: 3–7 business days <br />
                                    • Express Delivery: 1–3 business days <br />
                                    • International Shipping: 7–15 days <br />
                                    • Tracking Number provided <br />
                                    • Shipping cost calculated at checkout
                                </p>
                            </div>
                        </div>
                        <div className="border-b border-slate-200 pb-4">
                            <button
                                onClick={() => setOpenReturn(!openReturn)}
                                className="w-full flex items-center justify-between"
                            >
                                <h1 className="text-gray-700 text-2xl font-bold">Returns Policy</h1>

                                {openReturn ? (
                                    <FiChevronUp className="w-6 h-6 text-gray-700" />
                                ) : (
                                    <FiChevronDown className="w-6 h-6 text-gray-700" />
                                )}
                            </button>

                            <div
                                className={`transition-all duration-300 overflow-hidden ${openReturn ? "max-h-[500px] mt-4" : "max-h-0"
                                    }`}
                            >
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    • 7-day easy returns <br />
                                    • Must be unused & in original packaging   <br />
                                    • Refund issued after inspection
                                </p>
                            </div>
                        </div>
                        <div className="border-b border-slate-200 pb-4">
                            <button
                                onClick={() => setOpenShare(!openShare)}
                                className="w-full flex items-center justify-between"
                            >
                                <h1 className="text-gray-700 text-2xl font-bold">Share</h1>

                                {openShare ? (
                                    <FiChevronUp className="w-6 h-6 text-gray-700" />
                                ) : (
                                    <FiChevronDown className="w-6 h-6 text-gray-700" />
                                )}
                            </button>
                            <div
                                className={`transition-all duration-300 overflow-hidden ${openShare ? "max-h-[500px] mt-4" : "max-h-0"
                                    }`}
                            >
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    Returns accepted within 7 days if the product is unused and in original packaging.
                                </p>
                            </div>
                        </div>
                        <div className="border-b border-slate-200 pb-4">
                            <button
                                onClick={() => setOpenReviews(!openReviews)}
                                className="w-full flex items-center justify-between"
                            >
                                <h1 className="text-gray-700 text-2xl font-bold">Reviews</h1>

                                {openReviews ? (
                                    <FiChevronUp className="w-6 h-6 text-gray-700" />
                                ) : (
                                    <FiChevronDown className="w-6 h-6 text-gray-700" />
                                )}
                            </button>
                            <div
                                className={`transition-all duration-300 overflow-hidden ${openReviews ? "max-h-[500px] mt-4" : "max-h-0"
                                    }`}
                            >
                                {/* Reviews */}
                                <div className="w-full flex flex-col xl:flex-row gap-8 items-start xl:items-center justify-between bg-white py-6">
                                    {/* Left Section */}
                                    <div className="flex items-center gap-4">
                                        <span className="text-5xl font-bold text-[#111827]">4.8</span>

                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-[#111827]">
                                                Average Rating
                                            </span>

                                            {/* Stars */}
                                            <div className="flex items-center gap-1 mt-1">
                                                {[1, 2, 3, 4, 5].map((i) => (
                                                    <Star
                                                        key={i}
                                                        size={18}
                                                        className="fill-yellow-400 text-yellow-400"
                                                    />
                                                ))}
                                                <span className="text-sm text-[#6B7280] mt-1">(5k+ Reviews)</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Right Buttons */}
                                    <div className="flex flex-col items-center gap-5">
                                        <button className="px-6 py-3 text-sm font-semibold text-white bg-[#111827]">
                                            WRITE A REVIEW
                                        </button>
                                        <button className="text-sm font-semibold text-[#111827] underline">
                                            SEE ALL REVIEWS
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;