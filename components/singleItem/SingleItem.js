import ItemImage from './ItemImage';
import ItemInfo from './ItemInfo';
import classes from './SingleItem.module.css';

const SingleItem = ({product}) => {

    const sizes = [
            {
                size: '7'
            },
            {
                size: '8'
            },
            {
                size: '9'
            },
            {
                size: '10'
            },
            {
                size: '11'
            },
            {
                size: '12'
            },
            {
                size: '13'
            },
            {
                size: '14'
            },
    ];

    return (
        <div className={classes.itemWrapper}>
            <div className={classes.itemContainer}>
                <ItemImage product={product}/>
                <ItemInfo product={product} sizes={sizes}/>
            </div>
        </div>
    )
}

export default SingleItem;