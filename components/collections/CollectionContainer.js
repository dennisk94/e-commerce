import classes from './CollectionContainer.module.css';
import CollectionItem from './CollectionItem';


const CollectionContainer = ({products, productsFilter}) => {

    const selectValueHandler = (e) => {
        productsFilter(e.target.value);
    }

    return (
        <>
            <select name="shoes" id="shoes" onChange={selectValueHandler} className={ classes.select }>
                <option value="all">All</option>
                <option value="popular">Popular</option>
                <option value="top">Top Rated</option>
                <option value="best">Best Seller</option>
                <option value="discount">Discount</option>
            </select>

            <div className={ classes.collectionContainer}>
                { 
                    products.map( product => <CollectionItem 
                                                key={ product.id }
                                                id={product.id}
                                                title={ product.title }
                                                price={ product.price }
                                                img={ product.img }
                                                rating={ product.rating }
                    />)
                }
            </div>     
        </>
)
}


export default CollectionContainer;