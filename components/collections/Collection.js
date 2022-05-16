import classes from './Collection.module.css';
import CollectionContainer from './CollectionContainer';

const Collection = ({products, productsFilter}) => {
  return (
    <div className={ classes.collectionSection } id='collection'>
        <h2 className={ classes.heading }>
            Lace up for your next adventure
        </h2>
   
        <CollectionContainer products={products} productsFilter={productsFilter}/>
    </div>
  )
}

export default Collection;