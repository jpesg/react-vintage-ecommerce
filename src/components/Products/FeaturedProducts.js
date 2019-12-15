import React from "react";

import { ProductContext } from '../../context/products';


import Loading from '../Loading';
import ProductList from './ProductList';


export default function FeaturedProducts() {
  const { featured, loading } = React.useContext(ProductContext)

  return loading ? <Loading /> : <ProductList title='featured products' products={featured} />
}
