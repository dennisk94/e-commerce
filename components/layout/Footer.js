import { GrLocation } from "react-icons/gr";
import { AiOutlinePhone } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineFacebook } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import classes from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={ classes.footer }>
        <div className={ classes.contact }>
            <p>
                <span><GrLocation /></span>
                123 Bleeker Street, Vancouver, BC, V8R 3U9
            </p>
            <p>
                <span><AiOutlinePhone /></span>
                Telephone: 778-444-444
            </p>
            <p>
                <span><AiOutlineMail /></span>
                Email: shoedepot@outlook.com
            </p>
        </div>
        <div className={ classes.social }>
            <AiOutlineFacebook />
            <AiOutlineInstagram />
            <AiOutlineTwitter />
        </div>
        <div className={ classes.copy }>
            &copy; 2022 Dennis Kim
        </div>
    </footer>
  )
}

export default Footer;