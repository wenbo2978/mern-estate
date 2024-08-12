import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';
import {FaBath, FaBed, FaChair, FaParking} from 'react-icons/fa'


const Listing = () => {
  SwiperCore.use(Navigation);
  const params = useParams();
  const [listingData, setListingData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(()=>{
    const fetchList = async ()=>{
      console.log('start');
      try{
        //setLoading(true);
        setError(false);
        const listingId = params.id;
        const res = await fetch(`/api/listing/getListing/${listingId}`);
        const data = await res.json();
        if(data.success === false){
          setLoading(false);
          setError(data.message);
          return;
        }
        setListingData(data);
        setLoading(false);
        console.log(data);
      }catch(err){
        setError(err);
        setLoading(false);
      }
    }
    fetchList();
  }, []);
  return (
    <main>
      {
        loading && <p className='text-center my-7 text-2xl'>Loading...</p>
      }
      {
        error && <p className='text-center my-7 text-2xl text-red-700'>{error}</p>
      }
      {
        listingData && !error && !loading &&
        <div>
          <Swiper navigation>
            {
              listingData.imageUrls && listingData.imageUrls.map((url, index)=>(
                <SwiperSlide key={url}>
                  <div className='h-[550px]' style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover'
                  }}>

                  </div>
                </SwiperSlide>
              ))
            }
          </Swiper>
          <div className='max-w-4xl mx-auto p-5 gap-3 flex flex-col'>
            <p className='font-semibold text-2xl'>
              {
                listingData.name
              }
              -$
              {
                listingData.offer ? 
                listingData.discountPrice?.toLocaleString('en-US') : 
                listingData.regularPrice?.toLocaleString('en-US')
              }
              {
                listingData.type === 'rent' && ' / month'
              }
            </p>
            <a 
              className='mt-8 flex my-3 gap-1 font-semibold underline text-xl ' target='_blank' 
              href={'https://maps.google.com/?q='+listingData.address}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              {listingData.address}
            </a>
            <div className='flex gap-4'>
              <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md m-2'>
                {
                  listingData.type === 'rent' ? 'For Rent' : 'For Sale'
                }
              </p>
              {
                listingData && listingData.offer && (
                  <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md m-2'>
                    ${+listingData.regularPrice - +listingData.discountPrice} discount
                  </p>
                )
              }
            </div>
            <p className='text-slate-800 mt-2'>
              <span className='font-semibold text-black'>Description - {' '}</span>
              {listingData.description}
            </p>
            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6 mt-5'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg'/>
                {listingData.bedrooms > 1 ? `${listingData.bedrooms} beds` : `${listingData.bedrooms} bed`}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg'/>
                {listingData.bathrooms > 1 ? `${listingData.bathrooms} baths` : `${listingData.bathrooms} bath`}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg'/>
                {listingData.parking ? 'Parking spot' : 'No parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg'/>
                {listingData.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
          </div>
        </div>
        

      }
    </main>
  )
}

export default Listing
