import classes from './OrderSummary.module.css';
import { useSelector } from 'react-redux';

const OrderSummary = () => {

    const cartQuantity = useSelector( state => state.cart.totalQuantity );
    const cartPrice = useSelector( state => state.cart.totalPrice );

  return (
    <div className={classes.orderWrapper}>
        <h1>Order Summary</h1>
        <hr />
        <p>{cartQuantity} Item(s)</p>
        <p>Total: ${cartPrice}</p>
    </div>
  )
}

export default OrderSummary;