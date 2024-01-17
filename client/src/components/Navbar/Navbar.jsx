import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
//import decode from 'jwt-decode';
import { jwtDecode } from "jwt-decode";

import './Navbar.css';
import logo from '../../assets/logo.png';
import search from '../../assets/search.jpg';
import Avatar from '../../components/Avatar/Avatar'
import {setCurrentUser} from '../../actions/currentUser';


const Navbar=()=>{
    const dispatch= useDispatch();
    const navigate = useNavigate()
    const User = useSelector((state) => state.currentUserReducer);

    const handleLogout=()=>{
        dispatch({type: 'LOGOUT'})
        navigate('/')
        dispatch(setCurrentUser(null))
    }

    useEffect(()=>{
        const token = User?.token
        if(token){
            const decodeToken = jwtDecode(token)
            if(decodeToken.exp * 1000 < new Date().getTime()){
                handleLogout();
            }
        }
         dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))

    },[dispatch])

return(
    <nav className="main-nav">
<div className='navbar'>
    <Link to='/' className='nav-item nav-logo'> 
    <img src={logo} alt='stacklogo'width={100} />
    </Link>
    <Link to='/' className='nav-item nav-btn'>About </Link>
    <Link to='/' className='nav-item nav-btn'>Products</Link>
    <Link to='/' className='nav-item nav-btn'>For Teams</Link>
   <form>
    <input type='tex' placeholder='Search...'/>
    <img src={search} alt='search' width={30} className='search-icon'/>
   </form>
   {User === null ? 
<Link to='/Auth' className='nav-item nav-links'>Log in</Link>  :
<>
<Avatar backgroundColor='#009dff' px='10px' py='7px' borderRadius= '50%' color='white'>
    <Link to ={`/Users/${User?.result?._id}`} state={{color:"white", textDecoration:'none'}}> 
    {User.result.name.charAt(0).toUpperCase()}
</Link></Avatar>
<button className='nav-item nav-links'onClick={handleLogout} >Log Out</button>
</> 
}
</div>
</nav>
)

}
export default Navbar;