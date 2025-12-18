import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-[#1a1a1a] text-white shadow-lg mt-[50px] md:mt-20 lg:mt-[120px]">
            {/* Main Footer Content */}
            <div className="max-w-[1737px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 md:py-16 lg:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 lg:gap-12">

                    {/* Brand Section */}
                    <div className="lg:col-span-2 flex items-center">
                        <Link href="/" className="transition-transform duration-300">
                            <Image src="/assets/image/logo/footer-logo.png" alt="Footer Logo" width={120} height={56} className="h-10 sm:h-12 md:h-14 w-auto" />
                        </Link>
                    </div>

                    {/* Link Columns */}
                    <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">

                        {/* Company Links */}
                        <div>
                            <ul className="space-y-2.5">
                                <li><Link href="#" className="text-xs sm:text-xl font-semibold text-white  hover:text-white hover:translate-x-1 inline-block transition-all duration-200">About Us</Link></li>
                                <li><Link href="#" className="text-xs sm:text-xl font-semibold text-white  hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Our Shop</Link></li>
                                <li><Link href="#" className="text-xs sm:text-xl font-semibold text-white  hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Blog & News</Link></li>
                                <li><Link href="#" className="text-xs sm:text-xl font-semibold text-white  hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Contact Us</Link></li>
                            </ul>
                        </div>

                        {/* Support Links */}
                        <div>
                            <ul className="space-y-2.5">
                                <li><Link href="#" className="text-xs sm:text-xl font-semibold text-white  hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Order Tracking</Link></li>
                                <li><Link href="#" className="text-xs sm:text-xl font-semibold text-white  hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Terms & Conditions</Link></li>
                                <li><Link href="#" className="text-xs sm:text-xl font-semibold text-white  hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Payment Options</Link></li>
                                <li><Link href="#" className="text-xs sm:text-xl font-semibold text-white  hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Refund Policy</Link></li>
                            </ul>
                        </div>

                        {/* Help Links */}
                        <div className="col-span-2 sm:col-span-1">
                            <ul className="space-y-2.5">
                                <li><Link href="#" className="text-xs sm:text-xl font-semibold text-white  hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Return Policy</Link></li>
                                <li><Link href="#" className="text-xs sm:text-xl font-semibold text-white  hover:text-white hover:translate-x-1 inline-block transition-all duration-200">FAQs</Link></li>
                                <li><Link href="#" className="text-xs sm:text-xl font-semibold text-white  hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Careers</Link></li>
                                <li><Link href="#" className="text-xs sm:text-xl font-semibold text-white  hover:text-white hover:translate-x-1 inline-block transition-all duration-200">Privacy Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="border-t border-gray-700/50 py-5 sm:py-6">
                <div className="max-w-[1737px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-center justify-center">
                        <p className="text-xs sm:text-xl font-semibold text-white  text-center sm:text-left">
                            © 2025 <span className="text-white font-semibold">NeoComerz</span>. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
