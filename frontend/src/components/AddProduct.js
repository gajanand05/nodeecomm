import  react from 'react'
import { useState} from 'react';
import { useNavigate} from 'react-router-dom';

 const AddProduct = () => {
 const[name,setName] = useState();
 const[price,setPrice] = useState();
 const[category,setCategory] = useState();
 const[company,setCompany] = useState();
 const[error,setError] = useState(false);

const navigate = useNavigate()

  const addFileds = async() => {
     if(!name || !price || !category || !company){
        setError(true)
         return false;
     }
   
    console.log(name,price,category,company)

    let result = await fetch('http://localhost:8500/add-product',{
        method:'POST',
        headers: {"Content-Type": "application/json"}, 
        body:JSON.stringify({name,price,category,company})
    })

    result = await result.json();
     console.log(result)

    if(result.name){
        navigate('/')
    }
  }

  return(
        <div className="add-product-fields">
        <input type="text" onChange={(e) => {setName(e.target.value)}} value={name} placeholder='Enter Product Name' className='inputbox'/>
        {error && !name && <span className='invalid-input'>Enter Valid Name</span>}
        <input type="text" onChange={(e) => {setPrice(e.target.value)}} value={price} placeholder='Enter Product Price' className='inputbox'/>
        {error && !price && <span className='invalid-input'>Enter Valid Price</span>}
        <input type="text" onChange={(e) => {setCategory(e.target.value)}} value={category} placeholder='Enter Product Category'className='inputbox' />
        {error && !category && <span className='invalid-input'>Enter Valid Category</span>}
        <input type="text" onChange={(e) => {setCompany(e.target.value)}} value={company} placeholder='Enter Product Company' className='inputbox' />
        {error && !company && <span className='invalid-input'>Enter Valid Company</span>}
        <button onClick={()=>{addFileds()}} className='add-product-button'>Add Product</button>
        </div>   
    )
}
export default AddProduct;
