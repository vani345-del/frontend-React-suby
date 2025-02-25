import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath';
const AddFirm = () => {
 const[firmName,setFirmName]=useState("");
 const [area,setArea]=useState("");
 const[category,setCategory]=useState([]);
 const [region,setRegion]=useState([]);
 const[offer,setOffer]=useState("");
 const [image,setImage]=useState(null);
 const [loading,setLoading]=useState(false);



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

 const handleImage=(e)=>{
  const selectedImage=e.target.files[0];
  setImage(selectedImage)
 }

 const handleRegionChange=(e)=>{
  const value=e.target.value;
  if(region.includes(value)){
   setRegion(region.filter((item)=>{
     item!==value;
   }))
  }
  else{
   setRegion([...region,value])
  }
}


const handleFirmSumbit=async(e)=>{
  e.preventDefault();
  setLoading(true);
  try {
    const loginToken=localStorage.getItem('loginToken');
    if(!loginToken){
      console.log("User not authenticated");
    }
     const formData=new FormData();
     formData.append('firmName',firmName);
     formData.append('area',area);
     formData.append('image',image);
     category.forEach((value)=>{
      formData.append('category',value);
     })
     region.forEach((value)=>{
      formData.append('region',value);
     })
     formData.append('offer',offer);
     const response=await fetch(`${API_URL}/firm/add-firm`,{
      method:'POST',
      headers:{
        'token':`${loginToken}`
      },
      body:formData
     })
     const data=await response.json()
     if(response.ok){
      console.log(data);
      alert("Firm addedd success fully")
      setFirmName("");
      setArea("");
      setCategory([]);
      setRegion([]);
      setOffer("");
      setImage(null);
     }
     else if(data.message ==="vendor can have only one firm"){
         alert("firm Exists only one firm can added")
     }
     else{
      alert("faild to add firm")
     }
     const firmId=data.firmId;
     const vendorRestuarant = data.vendorFirmName
     localStorage.setItem('firmId',firmId)
     localStorage.setItem('firmName', vendorRestuarant)
     window.location.reload()
  } 
  catch (error) {
    console.log("faild to add firm")
    alert("failed to add Firm")
  }finally {
    setLoading(false); 
}





}




  return (
    <div className="firmSection">
       {loading &&        <div className="loaderSection">
        <ThreeCircles
          visible={loading}
          height={100}
          width={100}
          color="#4fa94d"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>}
        <form  onSubmit={handleFirmSumbit} className="tableForm">
            <h2>Add Firm</h2>
            <label>Firm Name</label>
            <input type="text" name='firmName'placeholder='Enter our Name' value={firmName}  onChange={(e)=>setFirmName(e.target.value)}/>
            <label>Area</label>
            <input type="text" name='area'placeholder='Enter our Area' value={area}  onChange={(e)=>setArea(e.target.value)}/>
           <div className="checkInp">
            <label>Category</label>
            <div className="inputContainer">
              <div className="checkboxContainer">
                <label>Veg</label>
                <input type="checkbox" checked={category.includes('veg')} value="veg" onChange={handleCatogyChange}/>
              </div>

              <div className="checkboxContainer">
                <label>Non-Veg</label>
                <input type="checkbox" checked={category.includes('non-veg')} value="non-veg" onChange={handleCatogyChange}/>
              </div>
            </div>
           </div>
            
           <div className="checkInp">
            <label>Region</label>
            <div className="inputContainer">
              <div className="checkboxContainer">
                <label>South-Indian</label>
                <input type="checkbox"  checked={region.includes('south-indian')} value="south-indian" onChange={handleRegionChange}/>
              </div>

              <div className="checkboxContainer">
                <label>North-Indian</label>
                <input type="checkbox"checked={region.includes('north-indian')}  value="north-indian" onChange={handleRegionChange}/>
              </div>
              <div className="checkboxContainer">
                <label>Chinese</label>
                <input type="checkbox" checked={region.includes('chinese')}  value="chinese" onChange={handleRegionChange}/>
              </div>
              <div className="checkboxContainer">
                <label>Bakery</label>
                <input type="checkbox" checked={region.includes('bakery')}  value="bakery" onChange={handleRegionChange}/>
              </div>
            </div>
           </div>


            <label>Offer</label>
            <input type="text" name='offer'placeholder='Enter your Offer' value={offer} onChange={(e)=>setOffer(e.target.value)}/>
            <label>Firm image</label>
            <input type="file" onChange={handleImage}/>
            <br/>
            <div className="btnSubmit">
                <button  className='btnSubmit' type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddFirm