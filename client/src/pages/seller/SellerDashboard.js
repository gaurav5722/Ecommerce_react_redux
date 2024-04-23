import React from 'react'
import SellerNav from '../../components/nav/SellerNav'

const SellerDashboard = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
            <SellerNav/>
        </div>
        <div className='col-md-10'>
            Welcome to the seller History
        </div>
      </div>
    </div>
  )
}

export default SellerDashboard
