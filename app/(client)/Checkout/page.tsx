"use client";
import type { ChangeEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { steps } from "@/components/shared/steps";
import ShoppingStep from "@/components/shared/ShoppingStep";
import { IoIosArrowDown } from "react-icons/io";
import { GiReturnArrow } from "react-icons/gi";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCart } from "@/store/cartSlice";
import { useToast } from "@/hooks/use-toast";

type CheckoutFormState = {
    fullName: string
    email: string
    phone: string
    addressLine1: string
    addressLine2: string
    city: string
    postalCode: string
    note: string
}

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
const checkoutSelectionKey = "checkoutSelection";

export default function Checkout() {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const cartItems = useAppSelector((state) => state.cart.items);

  const [open, setOpen] = useState(false);
  const [shippingSelected, setShippingSelected] = useState(shippingOptions[0]);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[] | null>(null);
  const [formData, setFormData] = useState<CheckoutFormState>({
    fullName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    note: "",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(checkoutSelectionKey);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const ids = parsed.filter((id) => typeof id === "number");
        if (ids.length > 0) setSelectedIds(ids);
      }
    } catch {
      // Ignore invalid stored selection
    }
  }, []);

  const checkoutItems = useMemo(() => {
    if (selectedIds && selectedIds.length > 0) {
      const selectedSet = new Set(selectedIds);
      return cartItems.filter((item) => selectedSet.has(item.id));
    }
    return cartItems;
  }, [cartItems, selectedIds]);

  const subtotal = useMemo(
    () =>
      checkoutItems.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
      ),
    [checkoutItems]
  );

  const shippingCost = checkoutItems.length > 0 ? shippingSelected.price : 0;

  const total = useMemo(
    () => subtotal + shippingCost,
    [subtotal, shippingCost]
  );

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const key = name as keyof CheckoutFormState;
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handlePlaceOrder = async () => {
    if (isSubmitting) return;
    if (checkoutItems.length === 0) {
      toast({
        title: cartItems.length === 0 ? "Cart is empty" : "No items selected",
        description:
          cartItems.length === 0
            ? "Add some items before placing an order."
            : "Select items in your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.addressLine1.trim() ||
      !formData.city.trim()
    ) {
      toast({
        title: "Missing details",
        description: "Please fill in the required shipping details.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: {
            fullName: formData.fullName.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            addressLine1: formData.addressLine1.trim(),
            addressLine2: formData.addressLine2.trim() || undefined,
            city: formData.city.trim(),
            postalCode: formData.postalCode.trim() || undefined,
            note: formData.note.trim() || undefined,
          },
          items: checkoutItems.map((item) => ({
            productId: item.id,
            name: item.name,
            image: item.image ?? null,
            price: Number(item.price),
            quantity: item.quantity,
          })),
          shipping: {
            method: shippingSelected.label,
            cost: shippingSelected.price,
          },
          paymentMethod,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Failed to place order.");
      }

      const orderedIds = new Set(checkoutItems.map((item) => item.id));
      const remainingItems = cartItems.filter(
        (item) => !orderedIds.has(item.id)
      );
      dispatch(setCart(remainingItems));
      if (typeof window !== "undefined") {
        localStorage.removeItem(checkoutSelectionKey);
      }
      setSelectedIds(null);
      setOrderId(data.data.orderId);
      toast({
        title: "Order placed",
        description: `Your order #${data.data.orderId} has been placed.`,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to place order.";
      toast({
        title: "Order failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              </div>
              <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full border border-slate-200 p-3 text-sm"
                    placeholder="Full name"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-slate-200 p-3 text-sm"
                    placeholder="Email address"
                    type="email"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-slate-200 p-3 text-sm"
                    placeholder="Phone number"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">City</label>
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border border-slate-200 p-3 text-sm"
                    placeholder="City"
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Address Line 1
                  </label>
                  <input
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    className="w-full border border-slate-200 p-3 text-sm"
                    placeholder="Street address"
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Address Line 2 (Optional)
                  </label>
                  <input
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    className="w-full border border-slate-200 p-3 text-sm"
                    placeholder="Apartment, suite, etc."
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Postal Code
                  </label>
                  <input
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full border border-slate-200 p-3 text-sm"
                    placeholder="Postal code"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="mt-5">
                <p className="text-sm mb-2 font-medium">Do you want to add any note?</p>
                <textarea
                  className="w-full border border-slate-200 p-3 text-sm"
                  placeholder="Write here ..."
                  rows={4}
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
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
                {checkoutItems.length === 0 ? (
                  <div className="py-6 text-center text-sm text-gray-600">
                    {cartItems.length === 0
                      ? "Your cart is empty."
                      : "No items selected for checkout."}{" "}
                    <Link href="/Cart" className="font-semibold underline">
                      Return to cart
                    </Link>
                  </div>
                ) : (
                  checkoutItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 border-b  border-slate-200 pb-4"
                    >
                      <Image
                        src={item.image || "/assets/image/product/cap-1.jpg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover"
                      />
                      <div className="flex-1 gap-1 text-sm">
                        <p className="font-medium">
                          {item.name} × {item.quantity}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-bold">Color:</span> Default{" "}
                          <span className="font-bold">Size:</span> Free Size
                        </p>
                      </div>
                      <p className="font-medium text-sm">
                        ৳{(Number(item.price) * item.quantity).toFixed(0)}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Pricing Details */}
              <div className="space-y-3 border-t border-slate-200 pt-4 text-sm font-bold">
                <div className="flex justify-between border-b border-slate-200 pb-3">
                  <span>Subtotal</span>
                  <span>৳{subtotal.toFixed(0)}</span>
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
                {/* Total */}
                <div className="flex justify-between font-semibold text-lg pt-3">
                  <span>Total Cost</span>
                  <span>৳{total.toFixed(0)}</span>
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
                <button
                  onClick={handlePlaceOrder}
                  className="w-full text-lg font-semibold bg-black text-white py-3 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={checkoutItems.length === 0 || isSubmitting}
                >
                  {isSubmitting ? "PLACING ORDER..." : "CONFIRM YOUR ORDER"}
                </button>
                {orderId && (
                  <div className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                    Order placed successfully. Your order number is #{orderId}.
                  </div>
                )}
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
