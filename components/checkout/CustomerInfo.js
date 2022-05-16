import classes from './CustomerInfo.module.css';
import { useRef } from 'react';
import { useSelector,useDispatch } from 'react-redux';

const CustomerInfo = ({orderHandler, successfulOrder}) => {

  const cart = useSelector( state => state.cart.cartItems);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const addressRef = useRef();
  const cityRef = useRef();
  const provinceRef = useRef();
  const postalCodeRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  if ( successfulOrder ) {
    firstNameRef.current.value = '';
    lastNameRef.current.value = '';
    addressRef.current.value = '';
    cityRef.current.value = '';
    provinceRef.current.value = '';
    postalCodeRef.current.value = '';
    emailRef.current.value = '';
    phoneRef.current.value = '';
  }
  
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const customerInfo = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      address: addressRef.current.value,
      city: cityRef.current.value,
      province: provinceRef.current.value,
      postalCode: postalCodeRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value
    }
    orderHandler( customerInfo, cart );
  }

  return (
    <div className={classes.infoWrapper}>
        <form onSubmit={formSubmitHandler} className={classes.info}>
            <label htmlFor="fname">First Name</label>
            <input type="text" id='fname' ref={firstNameRef} required/>

            <label htmlFor="lname">Last Name</label>
            <input type="text" id='lname' ref={lastNameRef}  required/>

            <label htmlFor="address">Address</label>
            <input type="text" ref={addressRef} required/>

            <label htmlFor="city">City</label>
            <input type="text" ref={cityRef} required/>

            <label htmlFor="province">Province</label>
            <select name="province" id="province" ref={provinceRef} required>
                <option>SELECT</option>
                <option value="AB">Alberta</option>
                <option value="BC">British Columbia</option>
                <option value="MB">Manitoba</option>
                <option value="NB">New Brunswick</option>
                <option value="NL">Newfoundland and Labrador</option>
                <option value="NT">Northwest Territories</option>
                <option value="NS">Nova Scotia</option>
                <option value="NU">Nunavut</option>
                <option value="ON">Ontario</option>
                <option value="PE">Price Edward Island</option>
                <option value="QC">Quebec</option>
                <option value="SK">Saskatchewan</option>
                <option value="YK">Yukon Territory</option>
            </select>

            <label htmlFor="postalCode">Postal Code</label>
            <input type="text" ref={postalCodeRef} pattern="[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]" required/>

            <label htmlFor="email">Email</label>
            <input type="email" ref={emailRef} required/>

            <label htmlFor="tel">Telephone</label>
            <input type="tel" ref={phoneRef} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required/>

            <button>Place Order</button>
        </form>
    </div>
  )
}

export default CustomerInfo;