import Link from 'next/link';
import Image from 'next/image';
import classes from './CollectionItem.module.css';

const CollectionItem = ( props ) => {

    const { title, price, img, rating, id } = props;

  return (
    <div className={ classes.product }>
        <div className={ classes.productImage}>
            <Link href={`/${id}`}>
                <a>
                    <div>
                        <Image 
                        src={img}
                        alt='Product image'
                        width={380}
                        height={300}
                        />
                        <span className={ classes.productPrice }>${ price }</span>
                    </div>
                </a>
            </Link>
        </div>
        <div className={ classes.productInfo }>
            <Link href={`/${id}`}>
                <a>
                    <p>{ title }</p>
                </a>
            </Link>
        </div>
    </div>
  )
}

export default CollectionItem;