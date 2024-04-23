import React from "react";
import {Drawer,Button} from 'antd';
import {useSelector,useDispatch} from 'react-redux';
import laptop from '../../images/laptop.jpeg';
import { Link } from "react-router-dom";
const SideDrawer=({children})=>{

    const dispatch = useDispatch();
    const {drawer,cart} = useSelector((state)=>({...state}));
    const imageStyle={
        width:'100%',
        height:'200px',
        objectFit:'cover'
    }
    return (
        <Drawer visible={drawer} 
        className="text-center"
        placement="right"
        closable={false}
        title={`cart/${cart.length} Products`}
        onClose={()=>{
            dispatch({
                type:'SET_VISIBLE',
                payload:false,
            });
        }}
         visible={drawer}>
            {cart.map((p)=>(
                <div className="row" key={p._id}>
                    <div className="col">
                        {p.images[0]?(<><img src={p.images[0].url} style={imageStyle}/>
                        <p className="text-center bg-secondary text-light ">{p.title}*{p.count}</p></>):(<>
                            <img src={laptop} style={imageStyle}/>
                            <p className="text-center bg-secondary text-light ">{p.title}*{p.count}</p></>
                        )}
                    </div>
                </div>
            ))}
            <Link to={'/cart'}   ><button className="text-center btn btn-primary btn-raised btn-block" onClick={()=>{
                dispatch({
                    type:"SET_VISIBLE",
                    payload:false,
                })
            }}>GO TO CART</button></Link>
        </Drawer>
    )

}
export default SideDrawer;