import Head from 'next/head';
import { MongoClient } from 'mongodb';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { successful } from '../store/cart';
import Banner from '../components/banner/Banner';
import Collection from '../components/collections/Collection';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const HomePage = (props) => {
  
  const { products } = props;
  const [ filteredProducts, setFilteredProducts ] = useState(products);
  const success = useSelector( state => state.cart.successful);
  const dispatch = useDispatch();

  useEffect(() => {
    if ( success ) {
      toast.success('Your order has been placed!', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        dispatch( successful() );
    }
  });

  const productsFilter = (category) => {

    // Filter products array based on selected category
    switch(category) {
      case 'popular':
          setFilteredProducts(
            products.filter( product => product.category === category )
          );
        break;
      case 'top':
          setFilteredProducts(
            products.filter( product => product.category === category )
          );
        break;
      case 'best':
          setFilteredProducts(
            products.filter( product => product.category === category)
          );
        break;
      case 'discount':
          setFilteredProducts(
            products.filter( product => product.category === category)
          );
        break;
      case 'all':
          setFilteredProducts(
            products
          );
    }
  }

  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name='description' content='Home page for Shoe Depot.'/>
      </Head>
      <Banner />
      <Collection products={filteredProducts} productsFilter={productsFilter}/>
      {/* <ToastContainer /> */}
    </div>
  )
}

export async function getStaticProps() {

      const client = await MongoClient.connect('mongodb+srv://dennisk:v5XADuqkD0ZPmoCo@e-commerce.hkr7a.mongodb.net/collection?retryWrites=true&w=majority');
      const db = client.db();
      const productsCollection = db.collection('products');
      const result = productsCollection.find();
      const products = await result.toArray();
    
      await client.close();

      return {
          props: {
              products: products.map( product => {
                  return {
                      id: product._id.toString(),
                      title: product.title,
                      price: product.price,
                      description: product.description,
                      img: product.img,
                      rating: product.rating,
                      category: product.category
                  }
              })
          },
          revalidate: 1800,
      }  
}

export default HomePage;