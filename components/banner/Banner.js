import classes from './Banner.module.css';
import Image from 'next/image';
import sneaker1 from '../../public/img/sneaker-1.jpg';
import sneaker2 from '../../public/img/sneaker-2.jpg';
import sneaker3 from '../../public/img/sneaker-3.jpg';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {

    // react responsive slider settings
    const settings = {
        autoPlay:true, infiniteLoop:true, dynamicHeight:true, interval:7000, transitionTime:500, showArrows:false, showStatus:false, showIndicators:false, showThumbs:false
    }

    return (
        <div className={ classes.banner }>
            <Carousel {...settings}>
                <div>
                    <Image 
                    src={sneaker1}
                    alt='banner image 1'
                    />
                </div>

                <div>
                    <Image 
                    src={sneaker2}
                    alt='banner image 2'
                    />
                </div>

                <div>
                    <Image 
                    src={sneaker3}
                    alt='banner image 3'
                    />
                </div>
            </Carousel>
        </div>
)
}

export default Banner;

