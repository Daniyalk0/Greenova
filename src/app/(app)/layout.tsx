import CartPreview from "@/components/cartComponents/CartPreview"
import Footer from "@/components/footer/Footer"
import LocationProvider from "@/components/LocationProvider"
import WishlistSyncManager from "@/components/WishlistSyncManager"
import ProductsSyncManager from "@/components/ProductsSyncManager"
import CartSyncManager from "@/components/CartSyncManager"
import CleanFacebookHash from "@/components/CleanFacebookHash"
import Navbar from "@/components/navbar/Navbar"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {/* <CategoriesBar /> */}
      <CleanFacebookHash />

      <CartSyncManager />
      <WishlistSyncManager />
      <ProductsSyncManager />
      <LocationProvider />

      <CartPreview />

      <main className="min-h-screen">
        {children}
      </main>

      <Footer />
    </>
  )
}
