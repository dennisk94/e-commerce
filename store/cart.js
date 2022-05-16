import { createSlice } from "@reduxjs/toolkit";

const cartInitial = {
    cartItems: [],
    totalQuantity: 0,
    totalPrice: 0,
    successful: false
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: cartInitial,
    reducers: {
        addItem: ( state, action ) => {
            const { id, title, img, price, quantity, size, totalPrice } = action.payload;
            const existingItem = state.cartItems.find( cartItem => cartItem.id === id);

            if ( !existingItem ) {
                state.cartItems.push({
                    id: id,
                    title: title,
                    img: img,
                    price: price,
                    quantity: quantity,
                    size: [size],
                    totalPrice: totalPrice
                });
            } else {
                existingItem.size.push(size);
                state.cartItems.size
                existingItem.quantity = existingItem.quantity + quantity;
                existingItem.totalPrice += price * quantity;
            }   

            state.totalQuantity += parseInt(quantity, 10);
            state.totalPrice = state.totalPrice + price * quantity;
        },
        
        removeItem: ( state, action ) => {
            const { itemId } = action.payload;
            console.log(itemId);
            const existingItem = state.cartItems.find( cartItem => cartItem.id === itemId);
            state.cartItems = state.cartItems.filter( cartItem => cartItem.id !== itemId );
            state.totalQuantity = state.totalQuantity - existingItem.quantity;
            state.totalPrice = state.totalPrice - existingItem.totalPrice;
        },

        resetCart: ( state ) => {
            state.cartItems = [];
            state.totalQuantity = 0,
            state.totalPrice = 0
        },

        successful: ( state ) => {
            state.successful = !state.successful;
        }
    }
});

export const { addItem, removeItem, resetCart, successful } = cartSlice.actions;
export default cartSlice.reducer;