import React, { useEffect } from 'react'
import { useState } from 'react';
import { API_URL } from '../data/apiPath';

const AllProducts = () => {
   const [products,setProducts]=useState([]);

   const handlerProducts=async()=>{
    const firmId=localStorage.getItem('firmId');
       try {
        const response=await fetch(`${API_URL}/product/${firmId}/products`);
         const newProduct=await response.json();
         setProducts(newProduct.products);
         console.log(newProduct.products)
       } catch (error) {
        console.log("faild to fatch products")
        alert("faild to fetch products")
        
       }
   }
   useEffect(()=>{
    handlerProducts()
    console.log('this is useEffect')
},[])

   const deleteProductById=async(productId)=>{
       try {
        const response=await fetch(`${API_URL}/product/${productId}`,{
            method:'DELETE'
        })
        if(response.ok){
            setProducts(products.filter(product=>product._id!== productId));
            confirm("are you want to delete the product")
            alert("product delted success fully")
        }
        
       } catch (error) {
         console.error('faild to delete the product')
         alert('faild to delete')
       }
   }

   




  return (
    <div>
        {!products ? (
            <p>NO products added</p>
        ):(
            <table className='products-table'>
              <thead>
                <tr>
                    <th>product Name</th>
                    <th>price</th>
                    <th>Image</th>
                    <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item)=>{
                         return(
                            <>
                            <tr key={item._id}>
                                <td>{item.productName}</td>
                                <td>{item.price}</td>
                                <td>
                                    {item.image && (
                                        <img src={`${API_URL}/uploads/${item.image}`}
                                        alt={item.productName}
                                        style={{width:'50px',height:'50px'}}
                                        />
                                       
                                    )}
                                </td>
                                <td>
                                    <button className='btnSubmit' onClick={()=>deleteProductById(item._id)}>Delete</button>
                                </td>

                            </tr>
                            </>
                         )
                })}
              </tbody>
            </table>
        )}
    </div>
  )
}

export default AllProducts