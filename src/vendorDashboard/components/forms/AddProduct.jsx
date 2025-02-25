import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath';
const AddProduct = () => {
  const[productName,setproductName]=useState("");
  const[price,setPrice]=useState("");
  const[category,setCategory]=useState([]);
  const[image,setImage]=useState(null);
  const[bestSeller,setBestSEller]=useState(false);
  const[description,setDescription]=useState("");
  
  const handleCatogyChange=(e)=>{
    const value=e.target.value;
    if(category.includes(value)){
     setCategory(category.filter((item)=>{
       item!==value;
     }))
    }
    else{
     setCategory([...category,value])
    }
}

const handleBestSeller=(e)=>{
  const value=e.target.value==='true'
  setBestSEller(value)

}

const handleImage=(e)=>{
  const selectedImage=e.target.files[0];
  setImage(selectedImage)
 }


 const handlerAddProduct=async(e)=>{
 e.preventDefault();
 try {
     const loginToken=localStorage.getItem('loginToken');
     const firmId=localStorage.getItem('firmId');
     if(!loginToken||!firmId){
      console.log("user not authenticated")
     }
     const formData=new FormData();
     formData.append('productName',productName);
     formData.append('price',price);
     formData.append('image',image);
     formData.append('description',description);
     formData.append('bestSeller', bestSeller)
     category.forEach((value)=>{
      formData.append('category',value);
     });

     const response=await fetch(`${API_URL}/product/add-product/${firmId}`,{
      method:'POST',
      body:formData
     })
     const data=await response.json()
     if(response.ok){
      alert("product added successfully")
      setproductName("");
      setPrice("");
      setCategory([]);
      setBestSEller(false);
      setImage(null)
      setDescription("")
     }

 } catch (error) {
    
    alert("faild to add producr")
 }

 }


  return (
    <div className="firmSection">
        <form onSubmit={handlerAddProduct} className="tableForm">
            <h2>Add Product</h2>
            <label>Product Name</label>
            <input type="text" placeholder='Enter our Name' value={productName} onChange={(e)=>setproductName(e.target.value)}/>
            <label>price</label>
            <input type="text" placeholder='Enter our Area' value={price} onChange={(e)=>setPrice(e.target.value)}/>


            <div className="checkInp">
            <label>Category</label>
            <div className="inputContainer">
              <div className="checkboxContainer">
                <label>Veg</label>
                <input type="checkbox" value="veg" checked={category.includes('veg')} onChange={handleCatogyChange}/>
              </div>

              <div className="checkboxContainer">
                <label>Non-Veg</label>
                <input type="checkbox" value="non-veg" checked={category.includes('non-veg')} onChange={handleCatogyChange}/>
              </div>
            </div>
           </div>

           <div className="checkInp">
            <label>BestSeller</label>
            <div className="inputContainer">
              <div className="checkboxContainer">
                <label>Yes</label>
                <input type="radio" value="true" checked={bestSeller===true} onChange={handleBestSeller}/>
              </div>

              <div className="checkboxContainer">
                <label>No</label>
                <input type="radio" value="false" checked={bestSeller===false}
                onChange={handleBestSeller}/>
              </div>
            </div>
           </div>
           
            <label>Description</label>
            <input type="text" placeholder='Enter your Offer' value={description} onChange={(e)=>setDescription(e.target.value)}/>
            <label>Firm image</label>
            <input type="file" placeholder='Enter your firm image' onChange={handleImage}/>
            <br/>
            <div className="btnSubmit">
                <button  className='btnSubmit' type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddProduct