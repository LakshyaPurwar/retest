import { createSlice } from "@reduxjs/toolkit";
const initialProductsState = {products:[]};

let current = 100;

const generateId = ()=>{
    current++;
    return current;

}
const productSlice = createSlice({
    name : 'product',
    initialState :initialProductsState ,
    reducers: {
       setProducts(state , action){
        state.products = action.payload;
       },
       addProduct(state , action){
        state.products = [{id:generateId() , ...action.payload , thumbnail:'https://i.dummyjson.com/data/products/3/thumbnail.jpg'} , ...state.products];
       },
       deleteProduct(state , action){
            state.products = state.products.filter((product , index)=>(index!=action.payload));
       },
       updateProduct(state , action){
        state.products = state.products.map((product)=>{

            if(product.title == action.payload.title)
            {
                return {id:product.id, ...action.payload  , thumbnail:product.thumbnail};
            }
            else{
                return product;
            }
        });

       }
   

    
    } 
})

export const productActions = productSlice.actions;
export default productSlice.reducer;