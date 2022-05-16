import Image from 'next/image';

const ItemImage = ({product}) => {

return (
        <Image 
                src={product.img}
                alt={product.title}
                width={600}
                height={400}
        />
)
}

export default ItemImage;