import React from "react";
import ModalImage from 'react-modal-image';
import laptop from '../../../images/laptop.jpeg';
const ProductsVerify =({p,handleStatusChange})=>{
return(
    <tbody>
        <tr>
        <td><div style={{width:'150px', height:'auto'}}>{p.images.length?(<ModalImage small={p.images[0].url} large={p.images[0].url} />):(
            <ModalImage small={laptop} large={laptop}/>
        )}</div></td>
           <td className='text-center'>
            <input type='text' className='form-control' value={p.title}/>
        </td>
        <td className='text-center'>
            <input type='text' className='form-control' value={p.price}/>/kg
        </td>
        <td className='text-center'>
            <input type='text' className='form-control' value={p.color}/>
        </td>
        <td className='text-center'>
            <input type='text' className='form-control' value={p.quantity}/>
        </td>
        <td className='text-center'>
            <input type='text' className='form-control' value={p.shipping}/>
        </td>
        <td className='text-center'>
            <input type='text' className='form-control' value={p.postedBy.address}/>
        </td>
        <td className='text-center'>
            <input type='text' className='form-control' value={p.postedBy.name}/>
        </td>
        <td><select  onChange={e=>handleStatusChange(p._id,e.target.value)}
        className="form-control" defaultValue={p.verified}
        ><option value="no">Not Approve</option>
        <option value="yes">Approve</option>
            </select></td>
        </tr>
        
    </tbody>
)
}
export default ProductsVerify;