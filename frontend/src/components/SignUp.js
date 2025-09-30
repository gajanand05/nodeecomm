import React  from 'react'
import { useState ,useEffect } from "react"
import { useNavigate } from 'react-router-dom'

const SignUp = () =>{
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
     
     useEffect(()=>{
          const auth = localStorage.getItem('user')
          if(auth)
          {
            navigate('/')
          }
        })
        
    const collectData = async () => {
        //console.warn(name,email,password)
        console.log(name,email,password)
        
         let result = await fetch("http://localhost:8500/register", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"}, 
                    body: JSON.stringify({
                            name: name,
                            email: email,
                            password: password
                            })
                  });

                result = await result.json();

                if(result)
                {
                    localStorage.setItem('user',JSON.stringify(result))
                    navigate('/')
                }
         }

    return(
        <div className="sign-up">

            <input type="text" placeholder='Enter Your Name' className="inputBox" value={name}
            onChange={(e) => setName(e.target.value)} />
            
            <input type="email" placeholder='Enter Your Email' className="inputBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />

            <input type="password" placeholder='Enter Your Password' className="inputBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
            
            <button onClick={collectData} className='signup-button'> Sign Up</button> 

         </div>
     ) 
}
export default SignUp;