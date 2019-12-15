import React from "react";
import { useParams } from 'react-router-dom';
import { ProductContext } from '../context/products';
import { CartContext } from '../context/cart';
import Loading from '../components/Loading';

import { useHistory } from 'react-router-dom';


export default function ProductDetails() {
  const { id } = useParams();
  const hisotry = useHistory();
  const { products } = React.useContext(ProductContext);
  const { addToCart } = React.useContext(CartContext);

  const product = products.find(p => p.id === parseInt(id));

  if (products.length === 0) return <Loading />
  const { image/*: { url }*/, title, price, description } = product;

  return <section className='single-product'>
    <img src={/*url*/image} alt={title} className='single-product-image' />
    <article>
      <h1>{title}</h1>
      <h1>{price}</h1>
      <p>{description}</p>
      <button className='btn btn-primary btn-block'
        onClick={() => {
          //add to cart
          addToCart(product);
          //history
          hisotry.push('/cart')
        }}>add to cart</button>
    </article>
  </section>;
}
