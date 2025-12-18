"use client";
import { useState } from "react";
import Image from "next/image";
import { steps } from "@/components/shared/steps";
import ShoppingStep from "@/components/shared/ShoppingStep";
import { IoIosArrowDown } from "react-icons/io";
import { GiReturnArrow } from "react-icons/gi";
import { MdOutlinePrivacyTip } from "react-icons/md";

const author = [
    "/assets/image/product/cap-6.jpg",
];
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

export default function Checkout() {
  // Sample Ordered Items
  const [items] = useState([
    {
      id: 1,
      title: "New York Yankees Essential Black Cap",
      color: "Brown",
      size: "Free Size",
      qty: 2,
      price: 28846,
      img: "/assets/image/best-deal/best-deal-1.png",
    },
    {
      id: 2,
      title: "New York Yankees Essential Black Cap",
      color: "Brown",
      size: "Free Size",
      qty: 2,
      price: 28846,
      img: "/assets/image/best-deal/best-deal-2.png",
    },
    {
      id: 3,
      title: "New York Yankees Essential Black Cap",
      color: "Brown",
      size: "Free Size",
      qty: 2,
      price: 28846,
      img: "/assets/image/best-deal/best-deal-3.png",
    },
  ]);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const [open, setOpen] = useState(false);
  const [shippingSelected, setShippingSelected] = useState(shippingOptions[0]);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <main>
    {/* Active Step = 0 */}
    <ShoppingStep steps={steps} activeStep={1} />
    <section className="maincheckout-wrapper text-slate-800 mt-10 md:mt-20">
      <div className="container mx-auto px-4 sm:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <div className="space-y-6 lg:col-span-2">
            {/* Shipping & Billing */}
            <div className="bg-white p-6">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
                <h2 className="text-xl font-semibold">Shipping & Billing</h2>
                <button className="text-sm text-gray-900 underline font-bold">EDIT</button>
              </div>
              {/* User Info */}
              <div className="flex items-start gap-3 pb-4">
                <div className="bg-gray-200 rounded-full">
                <Image
                    src={author[0]}
                    alt={'Author'}
                    width={44}
                    height={44}
                    className="w-12 h-12 rounded-full"
                />
                </div>
                <div className="text-sm">
                  <p className="text-base font-bold">Didarul Islam</p>
                  <p className="text-gray-600">+8801738 552 616, info@info.com</p>
                </div>
              </div>

              {/* Address */}
              <div className="text-sm pb-4 border-dashed border-b border-slate-300">
                <p>
                  <span className="font-bold"> Address:</span> Tropical Akhand Tower,
                  House 23, Gareeb-e-Newaz Ave, Dhaka 1230, Uttara Sector 11, Dhaka -
                  North, Dhaka
                </p>
              </div>

              {/* Shipping Checkbox */}
              <div className="mt-5 flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 border-gray-500 accent-black" />
                <label className="text-lg text-gray-700 font-semibold uppercase">
                  SHIP TO A DIFFERENT ADDRESS?
                </label>
              </div>

              {/* Notes */}
              <div className="mt-5">
                <p className="text-sm mb-2 font-medium">Do you want to add any note?</p>
                <textarea
                  className="w-full border border-slate-200 p-3 text-sm"
                  placeholder="Write here ..."
                  rows={4}
                ></textarea>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {/* Ordered Items */}
            <div className="bg-white p-6 rounded-md">
              <h2 className="text-lg font-semibold mb-4 pb-4 border-b border-slate-200">
                Ordered Item
              </h2>

              <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b  border-slate-200 pb-4">
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover"
                    />
                    <div className="flex-1 gap-1 text-sm">
                      <p className="font-medium">
                        {item.title} × {item.qty}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-bold">Color:</span> {item.color} <span className="font-bold">Size:</span> {item.size}
                      </p>
                    </div>
                    <p className="font-medium text-sm">৳{item.price}</p>
                  </div>
                ))}
              </div>

              {/* Pricing Details */}
              <div className="space-y-3 border-t border-slate-200 pt-4 text-sm font-bold">
                <div className="flex justify-between border-b border-slate-200 pb-3">
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
                <div className="w-full border-dashed border-b border-slate-300 pb-3">
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
                {/* Total */}
                <div className="flex justify-between font-semibold text-lg pt-3">
                  <span>Total Cost</span>
                  <span>৳{subtotal + shippingSelected.price}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-neutral-50 p-6 mt-6 border border-slate-100">
                <div className="payment-content border-b border-slate-200">
                    <h2 className="text-lg font-semibold">Payment Method</h2>
                    <p className="text-gray-600 text-sm mb-4">
                    All transactions are secure and encrypted.
                    </p>
                </div>

                {/* Online Payment */}
                <label className="flex items-start gap-3 p-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    className="mt-1 border accent-black border-gray-900 rounded-full p-1"
                    onChange={() => setPaymentMethod("online")}
                    checked={paymentMethod === "online"}
                  />
                  <div className="text-sm">
                    <p className="font-medium">Online Payment</p>
                    <p className="text-gray-600">
                      After clicking Place Order, you will be redirected to
                      complete payment.
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
                </label>

                {/* COD */}
                <label className="flex items-start gap-3 p-3 cursor-pointer mt-3">
                  <input
                    type="radio"
                    name="payment"
                    className="mt-1 accent-black"
                    onChange={() => setPaymentMethod("cod")}
                    checked={paymentMethod === "cod"}
                  />
                  <div className="text-sm">
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-gray-600">
                      We prioritize frictionless payments.
                    </p>
                  </div>
                </label>
              </div>

              {/* Confirm Order */}
              <div className="order-wrapper my-5">
                <button className="w-full text-lg font-semibold bg-black text-white py-3">
                  CONFIRM YOUR ORDER
                </button>
              </div>
              {/* Extra Info */}
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
          {/* END RIGHT */}
        </div>
      </div>
    </section>
    </main>
    
  );
}
