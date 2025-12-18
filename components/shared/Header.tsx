'use client';

import { useState } from 'react';
import { CiLocationOn, CiUser } from "react-icons/ci";
import { IoCartOutline, IoHome, IoSearch } from "react-icons/io5";
import { FaChessBishop } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { RiContactsBookUploadFill } from "react-icons/ri";
import { GiBilledCap } from "react-icons/gi";



import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [shopOpen, setShopOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false); 

    return (
        <header className="sticky top-0 z-50 shadow-lg bg-white">
            {/* Top Bar */}
            <div className="bg-gray-900">
                <div className="container mx-auto">
                    <div className="topbar-wrapper  text-white text-xs sm:text-sm h-9 sm:h-10 flex items-center justify-between relative overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10 opacity-0 hover:opacity-100 transition-opacity duration-700"></div>
                        {/* Store Location */}
                        <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 relative z-10">
                            <CiLocationOn />
                            <span className="font-medium">Store Location</span>
                        </div>

                        {/* Promo */}
                        <div className="hidden sm:block text-center flex-1 relative z-10">
                            <p className="font-normal leading-6 tracking-wide underline">
                                Get 20% Off the new summer collection 
                            </p>
                        </div>
                        {/* Login/Register */}
                        <div className="text-right relative z-10">
                            <Link href="#" className="font-medium flex items-center space-x-1">
                                <CiUser />
                                <span className="hidden sm:inline">Login/ Register</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* Main Bar */}
            <div className="container mx-auto">
                <div className="header-glass h-14 sm:h-16 md:h-20 lg:h-24 flex items-center justify-between border-b border-gray-200/50 relative">
                {/* Mobile Logo */}
                <div className="lg:hidden flex items-center z-20">
                    <Link href="/" className="group">
                        <div className="logo-container relative">
                            <div className="absolute inset-0 bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                            <Image src="/assets/image/logo/Logo.png" alt="Logo" width={80} height={40} className="h-8 sm:h-10 w-auto relative z-10 transition-transform duration-300 group-hover:scale-110" />
                        </div>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center flex-1 justify-start z-20">
                    <nav className="flex space-x-6 xl:space-x-10 text-base xl:text-lg font-bold uppercase tracking-tight">
                        <Link href="/" className="nav-link-animated text-gray-900">Home</Link>
                        {/* Shop Dropdown */}
                        <div className="relative dropdown">
                            <Link href="/ShopOne" className="nav-link-animated flex items-center text-gray-900 group">
                                Shop
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>
                            <div className="dropdown-menu absolute w-56 bg-white/95 backdrop-blur-lg border border-gray-200 shadow-2xl mt-3 py-2 z-20 overflow-hidden">
                                <Link href="/ShopOne" className="block px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-linear-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 transition-all duration-200 border-l-2 border-transparent hover:border-indigo-500">
                                    <span className="flex items-center"><span className="mr-2"><FaChessBishop /></span>ShopOne</span>
                                </Link>
                                <Link href="/ShopTwo" className="block px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-linear-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 transition-all duration-200 border-l-2 border-transparent hover:border-indigo-500">
                                    <span className="flex items-center"><span className="mr-2"><FaChessBishop /></span>ShopTwo</span>
                                </Link>
                                <Link href="/ProdutctDetails" className="block px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-linear-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 transition-all duration-200 border-l-2 border-transparent hover:border-indigo-500">
                                    <span className="flex items-center"><span className="mr-2"><FaChessBishop /></span>ProdutctDetails</span>
                                </Link>
                            </div>
                        </div>
                        {/* Category Dropdown */}
                        <div className="relative dropdown">
                            <Link  href="#" className="nav-link-animated flex items-center text-gray-900 group">
                                Category
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>
                            <div className="dropdown-menu absolute w-56 bg-white/95 backdrop-blur-lg border border-gray-200 shadow-2xl mt-3 py-2 z-20 overflow-hidden">
                                <Link href="#" className="block px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-linear-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 transition-all duration-200 border-l-2 border-transparent hover:border-indigo-500">
                                    <span className="flex items-center"><span className="mr-2"><GiBilledCap /></span> Hat & Cap</span>
                                </Link>
                                <Link href="#" className="block px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-linear-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 transition-all duration-200 border-l-2 border-transparent hover:border-indigo-500">
                                    <span className="flex items-center"><span className="mr-2"><GiBilledCap /></span> Baseball Caps</span>
                                </Link>
                                <Link href="#" className="block px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-linear-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 transition-all duration-200 border-l-2 border-transparent hover:border-indigo-500">
                                    <span className="flex items-center"><span className="mr-2"><GiBilledCap /></span> Beanies</span>
                                </Link>
                                <Link href="#" className="block px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-linear-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 transition-all duration-200 border-l-2 border-transparent hover:border-indigo-500">
                                    <span className="flex items-center"><span className="mr-2"><GiBilledCap /></span> Docker Hat</span>
                                </Link>
                                <Link href="#" className="block px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-linear-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 transition-all duration-200 border-l-2 border-transparent hover:border-indigo-500">
                                    <span className="flex items-center"><span className="mr-2"><GiBilledCap /></span> 5 Panel Cap</span>
                                </Link>
                            </div>
                        </div>

                        <Link href="#" className="nav-link-animated text-gray-900">Contact</Link>
                    </nav>
                </div>

                {/* Desktop Center Logo */}
                <Link href="/" className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-auto group">
                    <div className="logo-container relative">
                        <div className="absolute inset-0 bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                        <Image src="/assets/image/logo/Logo.png" alt="Logo" width={120} height={60} className="h-10 lg:h-14 xl:h-16 w-auto relative z-10 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                </Link>

                {/* Action Icons */}
                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 z-20">
                    {/* Search with Expand */}
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            placeholder="Search..."
                            className={`transition-all duration-300 ease-in-out border-b px-3 py-1 text-sm sm:text-base outline-0 w-full ${
                                searchOpen ? "w-64 opacity-100" : "w-0 opacity-0 p-0 border-b"
                            }`}
                        />
                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
                            className="cursor-pointer transition"
                        >
                            <IoSearch size={24} />
                        </button>
                    </div>

                    {/* Compare */}
                    <Link href="/Compare" className="relative group">
                        <svg className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.2 15.089V13.3L19.95 16.15L15.2 19V17.014C12.2763 16.5963 9.73874 14.6855 8.55276 11.918L8.55 11.9117L8.54725 11.918C7.19998 15.0617 4.10883 17.1 0.688588 17.1H0V15.2H0.688588C3.34878 15.2 5.753 13.6146 6.80091 11.1695L7.51643 9.5L6.80091 7.83047C5.753 5.38534 3.34878 3.8 0.688588 3.8H0V1.9H0.688588C4.10883 1.9 7.19998 3.93829 8.54725 7.08199L8.55 7.08834L8.55276 7.08199C9.73874 4.31452 12.2763 2.40371 15.2 1.98598V0L19.95 2.85L15.2 5.7V3.911C13.0403 4.31075 11.185 5.76337 10.2991 7.83047L9.5836 9.5L10.2991 11.1695C11.185 13.2366 13.0403 14.6893 15.2 15.089Z" fill="currentColor" />
                        </svg>
                        <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
                    </Link>

                    {/* Cart */}
                    <Link href="/Cart" className="relative group">
                        <IoCartOutline size={32} />
                        <span className="absolute top-0 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">5</span>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-1.5 sm:p-2 ml-1 sm:ml-2 hover:bg-linear-to-br hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-900 group-hover:text-indigo-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
                </div>
            </div>
            {/* Mobile Menu */}
            <div className={`lg:hidden absolute w-full bg-white/95 backdrop-blur-lg shadow-2xl z-40 border-b border-gray-200/50 transition-all duration-300 ease-out ${mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <nav className="flex flex-col space-y-0.5 px-3 sm:px-4 py-4 sm:py-5 text-sm sm:text-base font-bold">
                    <Link href="#" className="text-gray-700 hover:text-indigo-600 transition-all duration-200 p-2.5 sm:p-3 hover:bg-linear-to-r hover:from-indigo-50 hover:to-purple-50 flex items-center space-x-2.5 sm:space-x-3 border-l-4 border-transparent hover:border-indigo-500">
                        <span className="text-lg sm:text-xl"><IoHome /></span><span>HOME</span>
                    </Link>
                    {/* Shop Dropdown */}
                    <div>
                        <button
                            onClick={() => setShopOpen(!shopOpen)}
                            className="w-full text-gray-700 hover:text-indigo-600 transition-all duration-200 p-2.5 sm:p-3 hover:bg-linear-to-r hover:from-indigo-50 hover:to-purple-50 flex items-center justify-between border-l-4 border-transparent hover:border-indigo-500"
                        >
                            <div className="flex items-center space-x-2.5 sm:space-x-3">
                                <span className="text-lg sm:text-xl"><FaShop /></span><span>SHOP</span>
                            </div>
                            <svg className={`w-5 h-5 transition-transform ${shopOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {shopOpen && (
                            <div className="pl-6 sm:pl-8 pr-3 sm:pr-4 py-1.5 sm:py-2 space-y-0.5 sm:space-y-1">
                                <Link href="/ShopOne" className="block p-2 text-xs sm:text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                                    <span className="flex items-center"><span className="mr-2"><FaChessBishop /></span>ShopOne</span>
                                </Link>
                                <Link href="ShopTwo" className="block p-2 text-xs sm:text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                                    <span className="flex items-center"><span className="mr-2"><FaChessBishop /></span>ShopTwo</span>
                                </Link>
                                <Link href="/ProdutctDetails" className="block p-2 text-xs sm:text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                                    <span className="flex items-center"><span className="mr-2"><FaChessBishop /></span>ProdutctDetails</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Category Dropdown */}
                    <div>
                        <button
                            onClick={() => setCategoryOpen(!categoryOpen)}
                            className="w-full text-gray-700 hover:text-indigo-600 transition-all duration-200 p-2.5 sm:p-3 hover:bg-linear-to-r hover:from-indigo-50 hover:to-purple-50 flex items-center justify-between border-l-4 border-transparent hover:border-indigo-500"
                        >
                            <div className="flex items-center space-x-2.5 sm:space-x-3">
                                <span className="text-lg sm:text-xl"><MdCategory /></span><span>CATEGORY</span>
                            </div>
                            <svg className={`w-5 h-5 transition-transform ${categoryOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {categoryOpen && (
                            <div className="pl-6 sm:pl-8 pr-3 sm:pr-4 py-1.5 sm:py-2 space-y-0.5 sm:space-y-1">
                                <Link href="#" className="block p-2 text-xs sm:text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                                    <span className="mr-2"><GiBilledCap /></span> Hat & Cap 
                                </Link>
                                <Link href="#" className="block p-2 text-xs sm:text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                                    <span className="mr-2"><GiBilledCap /></span> Baseball Caps 
                                </Link>
                                <Link href="#" className="block p-2 text-xs sm:text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                                    <span className="mr-2"><GiBilledCap /></span> Beanies
                                </Link>
                                <Link href="#" className="block px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-linear-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 transition-all duration-200 border-l-2 border-transparent hover:border-indigo-500">
                                    <span className="flex items-center"><span className="mr-2"><GiBilledCap /></span> Docker Hat</span>
                                </Link>
                                <Link href="#" className="block px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-linear-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 transition-all duration-200 border-l-2 border-transparent hover:border-indigo-500">
                                    <span className="flex items-center"><span className="mr-2"><GiBilledCap /></span> 5 Panel Cap</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    <Link href="#" className="text-gray-700 hover:text-indigo-600 transition-all duration-200 p-2.5 sm:p-3 hover:bg-linear-to-r hover:from-indigo-50 hover:to-purple-50 flex items-center space-x-2.5 sm:space-x-3 border-l-4 border-transparent hover:border-indigo-500">
                        <span className="text-lg sm:text-xl"><RiContactsBookUploadFill /></span><span>CONTACT</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
}
