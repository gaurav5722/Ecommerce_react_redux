import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import laptop from '../../images/laptop.jpeg'
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';
const {Meta} = Card;
const AdminProductCard = ({product,handleRemove,seller=false})=>{
    //destructuring

    const {title,description,images,slug}=product;
    return (
        <Card cover={<img src={images && images.length ? images[0].url:laptop} style={{height:'150px', objectFit:'cover'}} className='p-2'/>}
        actions={[seller?(<Link to={`/seller/product/${slug}`}><EditOutlined className='text-warning'/></Link>):(<Link to={`/current-admin/product/${slug}`}><EditOutlined className='text-warning'/></Link>),<DeleteOutlined className='text-danger' onClick={()=>handleRemove(slug)}/>]}>
            <Meta title={title} description={`${description && description.substring(0,35)}...`}/>
            {product.title}
            <br/>
            <span className='text-danger'>verified{" - "}</span>{product.verified}
        </Card>
    )
}
export default AdminProductCard;