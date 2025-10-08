import React from 'react'
import {Link ,useNavigate} from 'react-router-dom'


const Nav = () => {
    const auth = localStorage.getItem('user')
    console.log(auth)
    const navigate = useNavigate()
    const logout = () => {
        console.log('logout check')
        localStorage.clear()
        navigate('/')
    } 
    return(
        <div>
            <div className="nav-parent">
            <img src="/e-comm.jpg" alt="logo" className='logo-image'></img>
           {auth ?  <ul className='nav-ul'> 
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li> 
            </ul> : 
           <ul className='nav-ul nav-right'><li><Link to="/signup">Sign Up</Link></li><li><Link to="/login">Login</Link></li></ul>
          } 
          </div>
        </div>
    )
}

export default Nav;