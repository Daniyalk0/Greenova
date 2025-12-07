"use client"
import CartProductcard from '@/components/cartComponents/CartProductcard'
import OrderSummary from '@/components/cartComponents/OrderSummary'
import { removeFromCart} from '@/lib/cartUtils'
import { useSession } from 'next-auth/react'
import React, {  useState } from 'react'
import { removeCartItem } from '../actions/cart'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/src/store/store'
import { fetchCartProducts, setLocalCart } from '@/src/store/cartProductsSlice'
// import { setLocalCart } from "../../store/cartProductsSlice"

const Page = () => {

  const dispatch = useDispatch<AppDispatch>();
  const reduxCart = useSelector((state: RootState) => state.cartProducts.items);
  console.log('reduxCart', reduxCart);

  // const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const { data: session } = useSession()
  const userId = session?.user?.id ? Number(session.user.id) : null;

  // useEffect(() => {
  //   let cartData: any[] = [];

  //   if (userId) {
  //     // ✅ logged-in user: use Redux cart
  //     cartData = reduxCart;
  //   } else {
  //     // ✅ guest user: use local cart
  //     cartData = getCart();
  //   }

  //   setCart(cartData);
  //   setTotal(calculateCartTotal(cartData)); // pass the cartData here
  // }, [userId, reduxCart]); // rerun if user logs in/out or redux cart changes

//   useEffect(() => {
//   dispatch(fetchCartProducts(userId));
// }, [userId]);

console.log('reduxxCartt', reduxCart);


const handleRemoveProduct = async (
  productId: number,
  weight: number
): Promise<void> => {

  const previous = [...reduxCart];

  // optimistic UI update
  const updated = previous.filter(
    (item) => !(item.productId === productId && item.weight === weight)
  );

  dispatch(setLocalCart(updated)); // instant update

  if (userId) {
    try {
      await removeCartItem(userId, productId, weight);

      // sync after slight delay
      setTimeout(() => {
        dispatch(fetchCartProducts(userId));
      }, 200);

    } catch (error) {
      dispatch(setLocalCart(previous)); // rollback
    }
  } else {
    // guest
    removeFromCart(productId, weight);
  }
};




  return (
    <div className='py-5 gap-6 md:p-12 lg:p-32 flex flex-col md:flex-row items-start justify-start relative '>
      <div className="text-sm text-gray-800 mb-4 font-dmsans_light absolute top-5 left-10 ">
        <span className="hover:underline cursor-pointer ">Home</span> /
        <span className="ml-1 ">Cart</span>
      </div>
      <div className="w-full flex flex-col md:w-[60%] shadow-lg rounded-lg p-5 md:max-h-[575px]">
        {/* Header */}
        <div className="flex items-center w-full border-b border-gray-300 py-2 mb-2 font-monasans_semibold text-sm sm:text-base">
          <div className="w-[50%] flex items-center gap-3">
            <span>Item</span>
          </div>

          <div className="w-[25%] flex items-center justify-center">
            <span>Weight</span>
          </div>

          <div className="w-[25%] flex items-center justify-center">
            <span>Total</span>
          </div>
        </div>
        {reduxCart?.map((c) => {
          return (
            <CartProductcard item={c} key={`${c.id}-${c.weight}`}
              handleRemoveProduct={handleRemoveProduct} />
          )
        })}
      </div>

      <OrderSummary products={reduxCart} />
    </div>
  )
}

export default Page