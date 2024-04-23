import React from 'react'
import {Select} from 'antd'
const {Option} =Select;
const ProductUpdateForm = ({handleSubmit,handleChange,values,handleCategoryChange,subOptions,showSub,setValues,categories,arrayOfSubs,setArrayOfSubIds,selectedCategory}) => {
    const {
        title,
        description,
        price,
        // categories,
        category,
        subs,
        shipping,
        quantity,
        images,
        colors,
        brands,
        color,
        brand,
       
      } = values;
  return (
    <div>
      {/* {JSON.stringify(values)} */}
      <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                name="description"
                className="form-control"
                value={description}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={price}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Shipping</label>
              <select
                value={shipping === 'yes' ? "yes":"no"}
                name="shipping"
                className="form-control"
                onChange={handleChange}
              >
                <option>Please Select</option>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                className="form-control"
                value={quantity}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Color</label>
              <select
                value={color}
                name="color"
                className="form-control"
                onChange={handleChange}
              >
                <option>Please Select</option>
                {colors.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className="form-group">
              <label>Brands</label>
              <select
                name="brand"
                className="form-control"
                onChange={handleChange}
                value={brand}
              >
                <option>Please Select</option>
                {brands.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div> */}
            {/* {<h1>{JSON.stringify(category.name," got")}</h1>}
            {<h2>{JSON.stringify(categories)}</h2>} */}
                <div className='form-group'>
                    <label>Category</label>
                    <select value={selectedCategory?selectedCategory:category._id} name="category" className='form-control' onChange={handleCategoryChange}>
                        {/* <option>Please Select Any Category</option> */}
                        {/* <option>{category?category.name:'Please select'}</option> */}
                        {categories.length >0 && categories.map((c)=>
                        (<option value={c._id} key={c._id}>{c.name}</option>))}
                    </select>
                    
                </div>
                {/* {subOptions?subOptions.length:<h2>No sub option available</h2>}
                {JSON.stringify(showSub)} */}
               <div>
                    <label>SubCategories</label>
                    <Select mode='multiple' style={{width:'100%'}} placeholder="Please Select" 
                    // value={subs}
                    value={arrayOfSubs}
                    onChange={value=>setArrayOfSubIds(value)}
                    >
                    {subOptions.length && subOptions.map((s)=>(<option value={s._id} key={s._id}>{s.name}</option>))}
                        
                        
                    </Select>
                </div>
            <button className="btn btn-outline-info mt-4">Save</button>
          </form>
    </div>
  )
}

export default ProductUpdateForm
