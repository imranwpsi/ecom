"use client";

import { useState } from 'react';
import { GrFormNext } from "react-icons/gr";
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";

export default function Hero() {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

    const images = [
        "/assets/image/hero/main-cap.png",
        "/assets/image/hero/cap-thumb.jpg",
        "/assets/image/hero/thumb-3.jpg",
        "/assets/image/hero/main-cap.png",
        "/assets/image/hero/cap-thumb.jpg",
        "/assets/image/hero/thumb-3.jpg",
        "/assets/image/hero/main-cap.png",
        "/assets/image/hero/cap-thumb.jpg",
        "/assets/image/hero/thumb-3.jpg",
    ];

    return (
        <section className="w-full bg-gray-50 lg:px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 mx-auto">

                {/* LEFT PANEL */}
                <div className="px-6 py-8 sm:px-8 sm:py-12 md:px-12 md:py-16 lg:px-16 xl:px-20 flex flex-col justify-center order-3 md:order-1">
                    <div className="max-w-xl w-full md:mx-0">
                        <h2 className="text-gray-900 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight sm:leading-tight md:leading-[1.2] text-left">
                            New Era Halloween
                        </h2>

                        <p className="mt-2.5 sm:mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-gray-500 leading-relaxed max-w-prose text-left">
                            All eyes are on Bata as Sneaker Fest 2025 has already swept the nation off its feet in style!
                            This isn&apos;t just an electrifying event with a debut in 2019, it&apos;s a celebration.
                        </p>

                        <div className="mt-4 sm:mt-6 md:mt-8">
                            <Link
                                href="#"
                                className="inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white text-sm sm:text-base font-semibold px-6 sm:px-8 py-2.5 sm:py-3 md:py-3.5 shadow-md hover:shadow-lg transition-all duration-200 uppercase tracking-wide"
                            >
                                SHOP NOW
                            </Link>
                        </div>

                        {/* Thumbnails - Desktop only */}
                        <div className="hidden md:block mt-8 md:mt-10 lg:mt-14">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
                                <div className="shrink-0">
                                    <Swiper
                                        onSwiper={setThumbsSwiper}
                                        loop={true}
                                        spaceBetween={0}
                                        slidesPerView={1}
                                        freeMode={true}
                                        watchSlidesProgress={true}
                                        autoplay={{
                                            delay: 3000,
                                            disableOnInteraction: false,
                                        }}
                                        navigation={{
                                            prevEl: ".custom-next",
                                        }}
                                        modules={[Thumbs, Autoplay, Navigation]}
                                        className="mySwiper h-32 w-32"
                                    >
                                        {images.map((src, i) => (
                                            <SwiperSlide key={i}>
                                                <Image
                                                    src={src}
                                                    alt="Cap preview"
                                                    width={176}
                                                    height={176}
                                                    className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-cover shadow-md border border-gray-200"
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>

                                <div className="mt-4 sm:mt-0 flex items-center gap-3 sm:gap-4 overflow-x-auto pb-2">
                                    <Swiper
                                        onSwiper={setThumbsSwiper}
                                        loop={true}
                                        spaceBetween={0}
                                        slidesPerView={1}
                                        freeMode={true}
                                        watchSlidesProgress={true}
                                        autoplay={{
                                            delay: 3000,
                                            disableOnInteraction: false,
                                        }}
                                        navigation={{
                                            prevEl: ".custom-next",
                                        }}
                                        modules={[Thumbs, Autoplay, Navigation]}
                                        className="mySwiper h-16 w-16"
                                    >
                                        {images.map((src, i) => (
                                            <SwiperSlide key={i}>
                                                <Image
                                                    src={src}
                                                    alt="Thumbnail 1"
                                                    width={64}
                                                    height={64}
                                                    className="w-14 h-14 sm:w-16 sm:h-16 object-cover border-2 border-gray-300 hover:border-gray-900 cursor-pointer transition-all shrink-0"
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    <Swiper
                                        onSwiper={setThumbsSwiper}
                                        loop={true}
                                        spaceBetween={0}
                                        slidesPerView={1}
                                        freeMode={true}
                                        watchSlidesProgress={true}
                                        autoplay={{
                                            delay: 3000,
                                            disableOnInteraction: false,
                                        }}
                                        navigation={{
                                            prevEl: ".custom-next",
                                        }}
                                        modules={[Thumbs, Autoplay, Navigation]}
                                        className="mySwiper h-16 w-16"
                                    >
                                        {images.map((src, i) => (
                                            <SwiperSlide key={i}>
                                                <Image
                                                    src={src}
                                                    alt="Thumbnail 2"
                                                    width={64}
                                                    height={64}
                                                    className="w-14 h-14 sm:w-16 sm:h-16 object-cover border-2 border-gray-300 hover:border-gray-900 cursor-pointer transition-all shrink-0"
                                                />
                                            </SwiperSlide>
                                        ))}
                                        {/* Custom Arrows */}
                                        <button className="custom-next absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
                                            <GrFormNext className="text-white" size={32} />
                                        </button>
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT PANEL - Hero Image */}
                <div className="relative w-full lg:bg-linear-to-br lg:from-gray-100 lg:to-gray-200 order-1 md:order-2">
                    <Swiper
                        loop={true}
                        spaceBetween={10}
                        thumbs={{ swiper: thumbsSwiper }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        navigation={{
                            prevEl: ".custom-next",
                        }}
                        modules={[Thumbs, Autoplay, Navigation]}
                        className="mySwiper2 h-auto"
                    >
                        {images.map((src, i) => (
                            <SwiperSlide key={i}>
                                <Image
                                    src={src}
                                    alt="Hero product — brown cap"
                                    width={1200}
                                    height={900}
                                    className="w-full h-72 sm:h-80 md:h-[500px] lg:h-[600px] xl:h-[700px] object-cover object-center"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="absolute inset-0 hidden md:block vignette"></div>
                </div>

                {/* THUMBNAILS - Mobile only */}
                <div className="md:hidden bg-gray-50 px-6 py-4 sm:px-8 sm:py-6 order-2">
                    <div className="max-w-xl w-full">
                        <div className="flex items-center justify-start gap-3 sm:gap-4">
                            <div className="shrink-0">
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    loop={true}
                                    spaceBetween={0}
                                    slidesPerView={1}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false,
                                    }}
                                    navigation={{
                                        prevEl: ".custom-next",
                                    }}
                                    modules={[Thumbs, Autoplay, Navigation]}
                                    className="mySwiper h-32 w-32"
                                >
                                    {images.map((src, i) => (
                                        <SwiperSlide key={i}>
                                            <Image
                                                src={src}
                                                alt="Cap preview"
                                                width={176}
                                                height={176}
                                                className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-cover shadow-md border border-gray-200"
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>

                            <div className="flex items-center gap-3">
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    loop={true}
                                    spaceBetween={0}
                                    slidesPerView={1}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false,
                                    }}
                                    navigation={{
                                        prevEl: ".custom-next",
                                    }}
                                    modules={[Thumbs, Autoplay, Navigation]}
                                    className="mySwiper h-16 w-16"
                                >
                                    {images.map((src, i) => (
                                        <SwiperSlide key={i}>
                                            <Image
                                                src={src}
                                                alt="Thumbnail 1"
                                                width={64}
                                                height={64}
                                                className="w-14 h-14 sm:w-16 sm:h-16 object-cover border-2 border-gray-300 hover:border-gray-900 cursor-pointer transition-all shrink-0"
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    loop={true}
                                    spaceBetween={0}
                                    slidesPerView={1}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false,
                                    }}
                                    modules={[Thumbs, Autoplay]}
                                    className="mySwiper h-16 w-16"
                                >
                                    {images.map((src, i) => (
                                        <SwiperSlide key={i}>
                                            <Image
                                                src={src}
                                                alt="Thumbnail 2"
                                                width={64}
                                                height={64}
                                                className="w-14 h-14 sm:w-16 sm:h-16 object-cover border-2 border-gray-300 hover:border-gray-900 cursor-pointer transition-all shrink-0"
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
