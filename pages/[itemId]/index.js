import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';
import SingleItem from "../../components/singleItem/SingleItem";

const SingleItemPage = ({product}) => {

  return (
    <div>
      <Head>
          <title>Product - {product.title}</title>
          <meta name='description' content='Provides detailed information about each shoe.'/>
      </Head>
      <SingleItem product={product}/>
    </div>
  )
}

export async function getStaticPaths() {
  const client = await MongoClient.connect('mongodb+srv://dennisk:v5XADuqkD0ZPmoCo@e-commerce.hkr7a.mongodb.net/collection?retryWrites=true&w=majority');
  const db = client.db();
  const productsCollection = db.collection('products');
  const result = productsCollection.find();
  const products = await result.toArray();
  const paths = products.map( product => ({ params: { itemId: product._id.toString()}}));
  return {
    paths: paths,
    fallback: false
  }
}

export async function getStaticProps(context) {
  const itemId = context.params.itemId;
  const client = await MongoClient.connect('mongodb+srv://dennisk:v5XADuqkD0ZPmoCo@e-commerce.hkr7a.mongodb.net/collection?retryWrites=true&w=majority');
  const db = client.db();
  const productsCollection = db.collection('products');
  const result = productsCollection.find();
  const singleProduct = await productsCollection.findOne({_id: ObjectId(itemId)})
  const products = await result.toArray();
  await client.close();

  return {
    props: {
      product: 
      {
        id: singleProduct._id.toString(),
        title: singleProduct.title,
        price: singleProduct.price,
        description: singleProduct.description,
        img: singleProduct.img,
        rating: singleProduct.rating,
        category: singleProduct.category
      }
    }, 
    revalidate: 30
  }
}

export default SingleItemPage;