import Router from "next/router";
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { removeItem } from '../../store/cart';
import classes from './Cart.module.css';

const Cart = () => {

    const dispatch = useDispatch();
    const cart = useSelector( state => state.cart);
    const cartTotal = useSelector( state => state.cart.totalQuantity)
    const removeItemHandler = (itemId) => {
        dispatch( removeItem( {itemId} ));
    }
    const emptyCartHandler = () => {
        if ( cartTotal === 0 ) {
            toast.error('Please add some items before checking out', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        } else {
            Router.push('/checkout');
        }
    }

  return (
    <div className={ classes.cartContainer}>
        <table className={classes.table}>
        { cart.totalQuantity > 0 &&     
            <thead>
                <tr>
                    <th className={classes.hide}></th>
                    <th>ITEM(S)</th>
                    <th>SIZE</th>
                    <th>QTY</th>
                    <th>PRICE</th>
                    <th>TOTAL</th>
                    <th></th>
                </tr>
            </thead>
        }
            { cart.totalQuantity > 0 ?
                cart.cartItems.map( item => (
                    <tbody className={classes.item} key={item.id}>
                        <tr>
                            <td className={classes.img}>
                                <Image 
                                src={item.img}
                                alt={item.title}
                                width={175}
                                height={210}
                                layout='intrinsic'
                                className={classes.hide}
                                />
                            </td>
                            <td>{item.title}</td>
                            <td>{ item.size.length > 1 ? item.size.map(size => `${size},`) : item.size }</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>${item.totalPrice}</td>
                            <td className={classes.trash}><button onClick={ () => removeItemHandler(item.id)}><FaTrash /></button></td>
                        </tr>
                    </tbody>
                ))
                :
                <div className={classes.empty}>
                    <h1>Cart is Empty</h1>
                </div>
            }
        </table>

        <div className={classes.total}>
            <h1>
                Cart Total
            </h1>
            <p>Subtotal: ${cart.totalPrice}</p>
            <p>Tax: ${(cart.totalPrice * .12).toFixed(2)}</p>
            <p>Estimated Total: ${cart.totalPrice + (cart.totalPrice * .12)}</p>

            <button onClick={emptyCartHandler} className={classes.button}>
                CHECKOUT
            </button>
        </div>  
        <ToastContainer />
    </div>
  )
}

export default Cart;