import Image from 'next/image';
import { IoCartOutline } from "react-icons/io5";
// import { BiSolidOffer } from "react-icons/bi";
import Link from 'next/link';
import { Product } from '@/app/generated/prisma/client';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/cartSlice';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
    product: Product;
    variant?: 'grid' | 'best-deals' | 'best-ShopOne';
}

export default function ProductCard({ product, variant = 'grid' }: ProductCardProps) {
    const dispatch = useAppDispatch()
    const router = useRouter()

    if (variant === 'best-deals') {
        return (
            <div className="group bg-white overflow-visible shadow-md transition-shadow duration-300">
                <div className='cursor-pointer' onClick={() => router.push(`/products/${product.id}`)}>
                    <div className="relative overflow-hidden">
                        {/* {product.badge && (
                            <div className="absolute top-3 left-3 bg-black text-white px-2 py-1 text-xs font-bold z-10">
                                {product.badge}
                            </div>
                        )} */}
                        <Image
                            src={product?.image ?? ''}
                            alt={product.name}
                            width={400}
                            height={400}
                            className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                            <div
                                onClick={(e) => {
                                    e.stopPropagation()
                                    dispatch(addToCart(product))
                                }}
                                className="bg-white text-gray-900 px-6 py-3 flex items-center space-x-2 hover:bg-gray-100 transition-colors text-lg font-semibold shadow-2xl transform group-hover:scale-105 duration-300 cursor-pointer">
                                <IoCartOutline />
                                <span>ADD TO CART</span>
                            </div>
                        </div>
                    </div>

                    {/* Product Details Card */}
                    <div className="p-4 pt-3 w-[90%] bg-white shadow-sm" style={{ marginTop: '-84px', position: 'relative', zIndex: 10 }}>
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 truncate">{product.name}</h3>
                        <div className="flex flex-wrap items-baseline space-x-2">
                            <p className="text-lg font-bold text-gray-900">৳{product.price}</p>
                            {/* {product.originalPrice && (
                                <>
                                    <p className="text-sm text-gray-500 line-through">৳{product.originalPrice}</p>
                                    {product.discount && (
                                        <span className="flex items-center gap-1 bg-gray-800 text-white text-xs font-bold px-2 py-1">
                                            <BiSolidOffer />{product.discount}% OFF
                                        </span>
                                    )}
                                </>
                            )} */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else if (variant === 'best-ShopOne') {
        return (
            <div className="group pb-4 sm:pb-6 lg:pb-10">
                <div className='cursor-pointer' onClick={() => router.push(`/products/${product.id}`)}>
                    <div className="relative overflow-hidden">
                        {/* {product.badge && (
                            <span className="absolute top-3 left-3 bg-black/80 text-white text-xs font-semibold px-3 py-1.5 tracking-wider z-10">
                                {product.badge}
                            </span>
                        )} */}

                        <Image
                            src={product?.image ?? ''}
                            alt={product.name}
                            width={400}
                            height={400}
                            className="w-full h-100 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Hover Overlay */}
                        <div
                            onClick={(e) => {
                                e.stopPropagation()
                                dispatch(addToCart(product))
                            }}
                            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                            <div className="bg-white text-black px-5 py-2.5 sm:px-6 sm:py-3 flex items-center space-x-2 hover:bg-gray-100 transition-colors text-sm sm:text-base font-semibold shadow-lg">
                                <IoCartOutline />
                                <span>ADD TO CART</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-sm font-bold text-gray-900">{product.name}</h3>
                        <div className="flex flex-wrap items-baseline space-x-2 mt-1">
                            <p className="text-base font-bold text-gray-900">৳{product.price}</p>
                            {/* {product.originalPrice && (
                                <>
                                    <p className="text-sm text-gray-500 line-through">৳{product.originalPrice}</p>
                                    {product.discount && (
                                        <span className="flex items-center gap-1 bg-gray-800 text-white text-xs font-bold px-2 py-1">
                                            <BiSolidOffer />{product.discount}% OFF
                                        </span>
                                    )}
                                </>
                            )} */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="group pb-20 sm:pb-6 lg:pb-10">
            <div className='cursor-pointer' onClick={() => router.push(`/products/${product.id}`)}>
                <div className="relative overflow-hidden h-full">
                    {/* {product.badge && (
                        <span className="absolute top-3 left-3 bg-black/80 text-white text-xs font-semibold px-3 py-1.5 tracking-wider z-10">
                            {product.badge}
                        </span>
                    )} */}

                    <Image
                        src={product?.image ?? ''}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="w-full h-full  object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Hover Overlay */}
                    <div
                        onClick={(e) => {
                            e.stopPropagation()
                            dispatch(addToCart(product))
                        }}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                        <div className="bg-white text-black px-5 py-2.5 sm:px-6 sm:py-3 flex items-center space-x-2 hover:bg-gray-100 transition-colors text-sm sm:text-base font-semibold shadow-lg">
                            <IoCartOutline />
                            <span>ADD TO CART</span>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <h3 className="text-sm font-bold text-gray-900">{product.name}</h3>
                    <div className="flex flex-wrap items-baseline space-x-2 mt-1">
                        <p className="text-base font-bold text-gray-900">৳{product.price}</p>
                        {/* {product.originalPrice && (
                            <>
                                <p className="text-sm text-gray-500 line-through">৳{product.originalPrice}</p>
                                {product.discount && (
                                    <span className="flex items-center gap-1 bg-gray-800 text-white text-xs font-bold px-2 py-1">
                                        <BiSolidOffer />{product.discount}% OFF
                                    </span>
                                )}
                            </>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    );
}
