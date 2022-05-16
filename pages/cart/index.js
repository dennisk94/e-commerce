import Head from 'next/head';
import Cart from "../../components/cart/Cart";

const CartPage = () => {

  return (
    <div>
      <Head>
        <title>Shoe Depot - Cart</title>
        <meta name='description' content='Displays all the items in your cart.'/>
      </Head>
        <Cart/>
    </div>
  )
}

export default CartPage;