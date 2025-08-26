import '../styles/globals.css'
import { CartProvider } from '../context/CartContext'
import Cart from '../components/Cart'

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
      <Cart />
    </CartProvider>
  )
}