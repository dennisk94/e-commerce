import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/cart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Rating } from 'react-simple-star-rating'
import SizesContainer from './SizesContainer';
import classes from './ItemInfo.module.css';


const ItemInfo = ({product, sizes}) => {
    
    const dispatch = useDispatch();
    const [ size, setSize ] = useState(null);
    const quantityRef = useRef();

    const addToCartEventHandler = () => {
        const selectedQuantity = quantityRef.current.value;
        const selectedSize = size;

        // Check if a size for the shoe has been selected
        if ( selectedSize === null ) {
            toast.error('Please select your size', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        dispatch( addItem({
            id: product.id,
            title: product.title,
            img: product.img,
            price: product.price,
            quantity: parseInt(selectedQuantity, 10),
            size: selectedSize,
            totalPrice: product.price * selectedQuantity
        }));
    }

    const starsSettings = {
        readonly: true,
        ratingValue: product.rating,
        transition: true,
        size: 25
    }

    const sizesEventHandler = (size) => {
        setSize(size);
    }

    return (
        <div className={classes.itemInfo}>
            <h1>{ product.title }</h1>
            <Rating
            {...starsSettings}
            />
            <p className={classes.price}>${ product.price }</p>
            <p className={classes.description}>{ product.description }</p>
            <SizesContainer sizes={sizes} sizesEventHandler={sizesEventHandler}/>
            <div className={classes.addToCart}>
                <input name='quantity' id='quantity' type="number" min='1' defaultValue='1' ref={quantityRef}/>
                <button onClick={addToCartEventHandler}>Add to Cart</button>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ItemInfo;