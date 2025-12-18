"use client";
import Link from "next/link";
import { HiOutlineChevronRight } from "react-icons/hi";

interface DetailsTitleProps {
  items: string[];
}

export default function DetailsTitle({ items }: DetailsTitleProps) {
  return (
    <section className="DetailsTitle-wrapper bg-zinc-100 py-4">
        <div className="container mx-auto">
            <nav className="text-sm text-gray-900 font-['Inter']">
                <ol className="flex items-center space-x-2">
                    {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={index} className="flex items-center">
                        {!isLast ? (
                            <Link href="/" className="hover:text-black">
                            {item}
                            </Link>
                        ) : (
                            <Link href='/' className="text-black font-medium">{item}</Link>
                        )}

                        {!isLast && (
                            <HiOutlineChevronRight className="mx-2 text-gray-400" />
                        )}
                        </li>
                    );
                    })}
                </ol>
            </nav>
        </div>
    </section>     
   
  );
}
