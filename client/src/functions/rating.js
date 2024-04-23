import React from 'react';
import StarRating from 'react-star-ratings';

//[1,4,6,7]=1 + 4 + 6 + 7 =18
export const showAverage=(p)=>{
    if(p && p.ratings)
    {
        let ratingsArray = p && p.ratings;
        let total  =[];
        let length = ratingsArray.length;
        // console.log('length',length)

        ratingsArray.map((r)=>total.push(r.star))
        let totalReduced =total.reduce((p,n)=>p+n,0);
        // console.log('totalReduced',totalReduced)

        let highest = length * 5;
        // console.log(highest);

        let result =(totalReduced*5)/highest;
        // console.log('result',result);

        return(<div className='text-center pt-1 pb-3'>
            <span><StarRating rating={result} starDimension='20px' starSpacing='2px' starRatedColor='red' editing={false}/>({p.ratings.length})</span>
            </div>)
    }
}