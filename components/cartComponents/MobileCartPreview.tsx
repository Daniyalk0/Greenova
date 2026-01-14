"use client";
import { calcOrderSummary } from '@/lib/calcOrderSummary';
import { useAuthSource } from '@/lib/useAuthSource';
import { closeCart } from '@/src/store/cartPreviewUISlice'
import { RootState } from '@/src/store/store';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const MobileCartPreview = ({ products, handleRemoveProduct }: any) => {
    const dispatch = useDispatch();
    const isOpen = useSelector(
        (state: RootState) => state.cartUI.isCartOpen
    );
    const { isNextAuthUser } = useAuthSource();
    const { total } = calcOrderSummary(products, isNextAuthUser);

    const CLOSE_THRESHOLD = 120;
    const [dragY, setDragY] = React.useState(0);
    const [isDragging, setIsDragging] = React.useState(false);
    const router = useRouter();

    const startYRef = React.useRef(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        startYRef.current = e.touches[0].clientY;
        setIsDragging(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;

        const currentY = e.touches[0].clientY;
        const delta = currentY - startYRef.current;

        // only allow dragging DOWN
        if (delta > 0) {
            setDragY(delta);
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);

        if (dragY > CLOSE_THRESHOLD) {
            dispatch(closeCart());
        }

        setDragY(0);
    };

    const handleNavigate = () => {
        dispatch(closeCart());
        router.push('/cart');
    }



    return (
        <div className="">
            {/* Backdrop */}
            <div
                onClick={() => dispatch(closeCart())}
                className={`
    fixed inset-0 z-40 bg-black/40
    transition-opacity duration-300
    ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
  `}
            />


            {/* Bottom Sheet */}
            <section
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className={`
          fixed bottom-0 left-0 right-0 h-[75vh]
          bg-white z-50 rounded-t-2xl flex flex-col
          transform transition-transform duration-300 ease-out
          ${isOpen ? "translate-y-0" : "translate-y-full"}
          pointer-events-auto
        `}
                style={{
                    transform: isOpen
                        ? `translateY(${dragY}px)`
                        : undefined,
                    transition: isDragging ? "none" : undefined,
                }}
            >
                {/* Drag Handle */}
                <div className="flex justify-center py-2">
                    <div className="w-10 h-1.5 bg-gray-300 rounded-full" />
                </div>

                {/* Header */}
                <div className="px-4 pb-3 border-b font-monasans_semibold">
                    <h2 className="text-base font-semibold">My Cart</h2>
                    <p className="text-xs text-gray-500">{products?.length} items</p>
                </div>

                {/* Scrollable Items */}
                <div className="flex-1 overflow-y-auto px-4">
                    {products.map((cartItem: any) => {
                        const product = isNextAuthUser ? cartItem?.Product : cartItem;

                        const basePrice =
                            (product?.basePricePerKg ?? 0) * (cartItem?.weight ?? 0);
                        const discountedPrice =
                            product?.discount > 0
                                ? Math.round(
                                    basePrice - (basePrice * product.discount) / 100
                                )
                                : Math.round(basePrice);
                        return (
                            <div
                                key={cartItem.id}
                                className="flex gap-3 py-4 border-b relative"
                            >
                                {/* Image */}
                                <div className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                                    <img
                                        src={product?.imageUrl}
                                        alt={product?.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <button
                                    onClick={() => handleRemoveProduct(cartItem?.productId, cartItem?.weight)}
                                    className="absolute right-0 top-1 border border-red-500 rounded-full text-red-500 cursor-pointer hover:scale-110 transition-all duration-200"
                                >
                                    <X width={13} height={13} strokeWidth={3} />
                                </button>

                                {/* Info */}
                                <div className="flex-1 font-dmsans_semibold">
                                    <p className="text-sm">
                                        {product?.name}
                                    </p>

                                    <p className="text-xs text-gray-500 font-dmsans_light">
                                        {cartItem?.weight} kg
                                    </p>

                                    <div className="flex justify-between mt-2 items-center">
                                        {/* Price */}
                                        <div className="flex items-center gap-2 font-dmsans_light">
                                            {/* Discounted price */}
                                            <span className="text-sm font-semibold text-black">
                                                ₹{discountedPrice}
                                            </span>

                                            {/* Original price with strike-through */}
                                            {product?.discount > 0 && (
                                                <>
                                                    <span className="text-xs text-gray-400 line-through">
                                                        ₹{basePrice}
                                                    </span>
                                                    <span className="bg-green-100 text-green-800 text-[0.6rem] px-1 rounded">
                                                        {product?.discount}% OFF
                                                    </span>
                                                </>
                                            )}
                                        </div>

                                        {/* Quantity / Add control */}
                                        <div className="h-7 w-20 bg-green-100 rounded" />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Sticky Footer */}
                <div className="border-t px-4 py-4  font-monasans_bold">
                    <div className="flex justify-between text-sm mb-3">
                        <span>Total</span>
                        <span className="font-semibold">{total}</span>
                    </div>
                    <div
                        onClick={handleNavigate}

                        className="
                            flex items-center cursor-pointer justify-center w-full bg-green-600 text-white py-3 rounded-xl font-dmsans_semibold"
                    >
                        View Cart
                    </div>

                </div>
            </section>
        </div>

    )
}

export default MobileCartPreview