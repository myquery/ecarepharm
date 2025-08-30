import '../styles/globals.css'
import { CartProvider } from '../context/CartContext'
import { WishlistProvider } from '../context/WishlistContext'
import { AuthProvider } from '../context/AuthContext'
import Cart from '../components/Cart'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js')
    }
  }, [])

  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <Component {...pageProps} />
          <Cart />
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  )
}