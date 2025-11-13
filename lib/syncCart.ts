'use client'

import { syncLocalCartToSupabase } from "@/src/app/actions/cart"

/**
 * Sync localStorage cart to Supabase for logged-in users.
 * Automatically clears local cart after syncing.
 */
export async function handleCartSyncOnLogin(userId: number) {
  try {
    // 1️⃣ Get local cart from localStorage
    const localCart = JSON.parse(localStorage.getItem('cart') || '[]')

    // 2️⃣ If no items, skip syncing
    if (!Array.isArray(localCart) || localCart.length === 0) {
      console.log('🛒 No items in local cart to sync.')
      return
    }

    // 3️⃣ Call the server action to sync
    await syncLocalCartToSupabase(userId, localCart)

    // 4️⃣ Remove local cart after successful sync
    localStorage.removeItem('cart')

    console.log('✅ Local cart synced successfully to Supabase.')
  } catch (err) {
    console.error('❌ Failed to sync local cart:', err)
  }
}
