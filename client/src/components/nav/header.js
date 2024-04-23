    import React,{useState} from 'react';
    import { AppstoreOutlined,  SettingOutlined ,UserOutlined,UserAddOutlined,LogoutOutlined,ShopOutlined,ShoppingCartOutlined } from '@ant-design/icons';
    import { Menu ,Badge} from 'antd';
    import {Link } from 'react-router-dom';
    import firebase from 'firebase/compat/app'
    import {  useDispatch ,useSelector} from 'react-redux';
    import Search from '../forms/Search';
    import { useNavigate } from 'react-router-dom';
  
    const {SubMenu,Item}=Menu;
    const Header = ()=>{
        const [current,setCurrent] =useState("home");
        
         let dispatch =useDispatch();
         let {user,cart}=useSelector((state)=>({...state}));
         const navigate = useNavigate();
   
        const handleClick =(e)=>
        {
            //writing the code for the handle click
            // console.log(e.key)
            setCurrent(e.key);
        }
        const logout =()=>{
            firebase.auth().signOut();
            dispatch({
                type:"LOGOUT",
                payload:null
            });
            navigate('/home');
        }
        return(
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal"  >
                <Item key="home" icon={<AppstoreOutlined />} >
                <Link to="/home"style={{textDecoration:"none"}}> Home</Link>
                </Item>
               <Item key="shop"icon={<ShopOutlined/>} >
                  <Link to="/shop">Shop</Link>
                </Item>
                <Item key="cart"icon={<ShoppingCartOutlined/>} >
                  <Link to="/cart"><Badge count={cart.length} offset={[9,0]}>Cart </Badge>
                  </Link>
                </Item>
            
            {!user &&( <Item key="register" icon={<UserAddOutlined />}  >
            <Link to="/Register" style={{textDecoration:"none"}}> Register</Link>
                </Item>)}
                {!user &&(<Item key="login" icon={<UserOutlined />}  >
                <Link to="/login" style={{textDecoration:"none"}}>Login</Link>
                </Item>)}
         
        

           
            {user &&(<SubMenu icon={<SettingOutlined/>} title={user.email && user.email.split('@')[0]    //name@gmail.com
             } className='float-right'>
                    {user && user.role ==="subscriber"&&(<Item>
                        <Link to="/user/history">Dashboard</Link>
                    </Item>)}
                    {user && user.role === "admin" &&(<Item>
                        <Link to="/current-admin/dashboard">Dashboard</Link>
                    </Item>)}
                    {user && user.role === "seller" &&(<Item>
                        <Link to="/seller/history">Dashboard</Link>
                    </Item>)}
                    {user &&(<Item key="Logout" icon={<LogoutOutlined />} onClick={logout}>Logout</Item>)}
                    
            
            </SubMenu>)}
            <span className='float-right p-1'><Search/></span>
            </Menu>



        )
    }

    export default Header;