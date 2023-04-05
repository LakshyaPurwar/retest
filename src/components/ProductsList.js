import React from 'react';

import Product from './Product';
import classes from './ProductsList.module.css';

const ProductList = (props) => {
  return (
    <ul className={classes['products-list']}>
      {props.products.map((product , index) => (
        <Product
        index = {index}
        id={product.id}
        title={product.title}
        description={product.description}
        price={product.price}
        thumbnail={ product.thumbnail}
        />
      ))}
    </ul>
  );
};

export default ProductList;


          