import Head from 'next/head';
import Router from "next/router";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from "react";
import { resetCart, successful } from '../../store/cart';
import CustomerInfo from "../../components/checkout/CustomerInfo";
import OrderSummary from "../../components/checkout/OrderSummary";
import Notification from '../../ui/notification';
import classes from './index.module.css';

const CheckoutPage = () => {

    const [ requestStatus, setRequestStatus ] = useState(); // 'pending', 'success', 'error'
    const [ requestError, setRequestError ] = useState();
    const [ successfulOrder, setSuccessfulOrder ] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
      if ( cart === 0 ) {
          Router.push('/cart');
      }
    });

    useEffect(() => {
      if ( requestStatus === 'success' ||
          requestStatus === 'error'   
      ) {
        const timer = setTimeout(() => {
          setRequestStatus(null);
          setRequestError(null);
        }, 3000);

        return () => clearTimeout(timer);
      }
    }, [requestStatus]);

    const cart = useSelector( state => state.cart.totalQuantity);
    const orderHandler = async ( customerInfo, cart ) => {
      const order = {
        customerInfo,
        cart
      }

      setRequestStatus('pending');
      let res;
      try {
        res = await fetch('/api/order', {
          method: 'POST',
          body: JSON.stringify(order),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Something went wrong!');
        }
        setRequestStatus('success');
        setSuccessfulOrder(true);
        dispatch( resetCart() );
        dispatch( successful() );
        Router.push('/');
      } catch (error) {
        setRequestError(error.message);
        setRequestStatus('error');
      }
    }

    let notification;

    if ( requestStatus === 'pending' ) {
      notification = {
        status: 'pending',
        title: 'Processing Order...',
        message: 'Your order is being sent over!'
      };
    }

    if ( requestStatus === 'success' ) {
      notification = {
        status: 'success',
        title: 'Order Received!',
        message: 'Your order has been placed successfully!'
      };
    }

    if ( requestStatus === 'error' ) {
      notification = {
        status: 'error',
        title: 'Error',
        message: requestError
      };
    }

  return (
    <div className={classes.container}>
      <Head>
        <title>Checkout</title>
        <meta name='description' content='Input customer information to pair with their order.'/>
      </Head>
        <CustomerInfo orderHandler={orderHandler} successfulOrder={successfulOrder}/>
        <OrderSummary />
        {
          notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>
        }
    </div>
  )
}

export default CheckoutPage;