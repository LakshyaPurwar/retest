import React, { useCallback, useEffect, useState } from 'react';
import {useSelector , useDispatch} from 'react-redux';

import ProductsList from './components/ProductsList';
import AddProduct from './components/AddProduct';
import './App.css';
import { productActions } from './store/productSlice';

function App() {
 
  const products = useSelector((state)=>{return state.product.products});
  const [isLoading , setIsLoading] = useState(true);  
  const [error , setError]  = useState(null);


  const dispatch = useDispatch();


  
   const fetchProducts = async ()=>{
    setIsLoading(true);
    setError(null);
        try{
          const response = await fetch(' https://dummyjson.com/products');
          if(!response.ok)
          {
        
             throw new Error("Something went wrong ! ");
          }

      const data = await response.json();
    
      const productsList = data.products;
      const formattedProductsList = productsList.map((product)=>{
        return {
          id:product.id,
          title:product.title,
          description:product.description,
          price: product.price,
          thumbnail : product.thumbnail

        }
      });

      
     
      console.log(formattedProductsList);
      
      dispatch(productActions.setProducts(formattedProductsList));
      
      setIsLoading(false);


        }
        catch(error)
        {
          
          setError(error.message);
          setIsLoading(false);
        }
      
   }

  
   const memoisedFetchProducts = useCallback(fetchProducts , [])
   useEffect(()=>{
    memoisedFetchProducts();
   },[memoisedFetchProducts])

   let content =<p></p>

   if(isLoading)
   {
    content = <p>Loading ...</p>
   }
   else if(!isLoading && products.length>0)
   {
    content = <ProductsList products={products} />
   }
   else if(!isLoading && !error &&  products.length===0)
   {
    content = <p>No Products to show</p>
   }
   else if(error)
   {
    content = <p>{error}</p>
   }



  return (
    <React.Fragment>
      <section>
      
          <AddProduct/> 
      </section>
      
       <section>
       {content}
      </section>
      
    </React.Fragment>
  );
}

export default App;
