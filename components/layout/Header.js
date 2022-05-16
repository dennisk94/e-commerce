import { useSelector } from 'react-redux';
import Logo from '../../public/img/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineShopping } from "react-icons/ai";
import classes from './Header.module.css';

const Header = () => {

    const cartTotal = useSelector( state => state.cart.totalQuantity );

  return (
    <header className={ classes.header }>
            <Link href='/'>
                <a>
                    <div className={ classes.logo }>
                        <Image 
                        src={ Logo }
                        alt='Logo'
                        width={60}
                        height={60}
                        />
                        <h1>Shoe Depot</h1>
                    </div>
                </a>
            </Link>
        
        <nav>
            <ul className={ classes.ul }>
                <li>
                    <Link href='/'>
                        Home
                    </Link>
                </li>
                <li>
                    <Link href='#collection'>
                        Collections
                    </Link>
                </li>
                <li>
                    <Link href='/contact'>
                        Contact
                    </Link>
                </li>
            </ul>
        </nav>

        <div className={ classes.bag}>
            <Link href='/cart' >
                <a>
                    <div className={ classes.icon }>
                        <AiOutlineShopping />
                            <span className={ classes.notification }>
                                {cartTotal}
                            </span>
                    </div>
                </a>
            </Link>
        </div>
    </header>
)
}

export default Header;