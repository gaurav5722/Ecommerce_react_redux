import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
const Search = ()=>{

const dispatch = useDispatch();
    const navigate=useNavigate();
    const {search} = useSelector((state)=>({...state}))
    const {text}= search;
    const handleChange=(e)=>{
      //
      dispatch({
        type:"SEARCH_QUERY",
        payload:{text:e.target.value},
      })
    }
    const handleSubmit=(e)=>{
     //
     e.preventDefault();
     navigate(`/shop?${text}`);
    }
    return(<form className='form-inline my-2 my-lg-0 ' onSubmit={handleSubmit}>
        <input type='search' value={text} className='form-control mr-sm-2' placeholder='Search'
        onChange={handleChange}/>
        <SearchOutlined onClick={handleSubmit} style={{cursor:'pointer'}}/>
    </form>)
}
export default Search;