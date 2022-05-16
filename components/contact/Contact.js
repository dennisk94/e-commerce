import { useRef, useState, useEffect } from "react";
import Notification from '../../ui/notification';
import { MdWavingHand } from "react-icons/md";
import classes from './Contact.module.css';

const Contact = () => {

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const phoneNumberRef = useRef();
    const messageRef = useRef();

    const [ requestStatus, setRequestStatus ] = useState(); // 'pending', 'success', 'error'
    const [ requestError, setRequestError ] = useState();

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

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        const fName = firstNameRef.current.value;
        const lName = lastNameRef.current.value;
        const email = emailRef.current.value;
        const phone = phoneNumberRef.current.value;
        const customerMessage = messageRef.current.value;

        const message = {
            firstName: fName,
            lastName: lName,
            email: email,
            phone: phone,
            message: customerMessage
        };
        
        setRequestStatus('pending');
        let res;

        try {
            res = await fetch('/api/message', {
                method: 'POST',
                body: JSON.stringify(message),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json();
            if ( !res.ok ) {
                throw new Error(data.message || 'Something went wrong!');
            }

            setRequestStatus('success');
        } catch (error) {
            setRequestError(error.message);
            setRequestStatus('error');
        }
    }

    let notification;

    if ( requestStatus === 'pending' ) {
      notification = {
        status: 'pending',
        title: 'Processing Message...',
        message: 'Your message is being sent over!'
      };
    }

    if ( requestStatus === 'success' ) {
      notification = {
        status: 'success',
        title: 'Message Received!',
        message: 'Your message has been submitted successfully!'
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
    <div className={classes.contact}>
        <h1 className={ classes.heading }>
            Feel free to send us a message
            <span><MdWavingHand /></span>
        </h1>

        <form className={ classes.form } onSubmit={formSubmitHandler}>
            <label htmlFor="fName">First Name</label>
            <input type="text" id='fName' placeholder="First Name" ref={firstNameRef} required/>

            <label htmlFor="lName">Last Name</label>
            <input type="text" id='lName' placeholder="Last Name" ref={lastNameRef} required/>

            <label htmlFor="email">Email</label>
            <input type="email" id='email' placeholder="Email" ref={emailRef} required/>

            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id='phone' placeholder="778-888-8888"
                   pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                   required
                   ref={phoneNumberRef}
            />
            <label htmlFor="message">Message</label>
            <textarea name="message" id="message" cols='20' rows="20" ref={messageRef} required></textarea>

            <button>Submit</button>
        </form>

        {
            notification && <Notification  status={notification.status} title={notification.title} message={notification.message}/>
        }
    </div>
  )
}

export default Contact;