import react, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ()=>{
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
     const navigate = useNavigate();

     useEffect(()=>{
        const auth = localStorage.getItem('user')
        if(auth){
            navigate('/')
        }
     })

    const loginData = async()=> {
        
       console.warn('Login content get')
       console.log(email,password)
       let loginResult = await fetch('http://localhost:8500/login',{
         method:'POST',
         headers: {"Content-Type": "application/json"},
         body:JSON.stringify({email:email,password:password})
       })

        loginResult = await loginResult.json()
        console.log(loginResult)
        if(loginResult.name){
            localStorage.setItem('user',JSON.stringify(loginResult))
            navigate('/')
        }else{
            alert('please fill correct detail')
        }
    }

    return(
        <div className='login-data'>
          
         <input type="email" placeholder='Enter Your Email' className="inputBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />

            <input type="password" placeholder='Enter Your Password' className="inputBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
            
            <button onClick={loginData} className='login-button'>Login</button> 
            
        </div>
    )
}
export default Login;