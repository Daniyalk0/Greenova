"use client"
import React from 'react'
import { CartItem } from '@/lib/cartUtils'
import { X } from 'lucide-react'

type CartProductCardProps = {
  product: CartItem;
  handleRemoveProduct: (productId: number, weight: number) => Promise<void>;
};

const CartProductcard = ({ product, handleRemoveProduct }: CartProductCardProps) => {
    const options = product.availableWeights?.map((w) => ({
        weight: w,
        price: (product.basePricePerKg || 0) * w,
    })) || [];

    console.log(product);


    // 3️⃣ Local state to keep track of selected option
    //   const [updatedWeight, setUpdatedWeight] = useState(null);



    return (
        <div
            key={product.id}
            className="flex items-center w-full border-b border-gray-200 py-3 relative"
        >
            {/* Column 1: Image + Name + Price */}
            <div className="w-[50%] flex items-center gap-3">
                <img
                    src={product?.imageUrl}
                    alt="product image"
                    className="w-[14vw] md:w-[5rem] lg:w-[4rem] rounded object-cover"
                />
                <div className="flex flex-col items-start">
                    <h1 className="font-monasans_semibold text-sm sm:text-lg md:text-sm">
                        {product?.name}
                    </h1>
                    <p className="font-dmsans_light text-[0.7rem] sm:text-[0.9rem]">
                        ₹{product.basePricePerKg}/kg
                    </p>
                </div>
            </div>

            {/* Column 2: Weight */}
            <div className="w-[25%] flex flex-col items-center justify-center font-monasans_semibold">
                <p className="text-sm font-bold">{product?.weight}kg</p>
            </div>

            {/* Column 3: Total */}
            <div className="w-[25%] flex flex-col items-center justify-center font-monasans_semibold">
                <p className="text-sm font-bold">{product?.totalPrice}</p>
            </div>

            {/* Delete button */}
            <button
                onClick={() => handleRemoveProduct(product.productId, product.weight)}
                className="absolute right-0 top-1 border border-red-500 rounded-full text-red-500 cursor-pointer hover:scale-110 transition-all duration-200"
            >
                <X width={13} height={13} strokeWidth={3} />
            </button>
        </div>


    )
}

export default CartProductcard