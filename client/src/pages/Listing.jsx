import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';

const Listing = () => {
  SwiperCore.use(Navigation);
  const params = useParams();
  const [listingData, setListingData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(()=>{
    const fetchList = async ()=>{
      try{
        setLoading(true);
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
        <>
          <Swiper navigation>
            {
              listingData?.imageUrls.map((url)=>(
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
        </>
        

      }
    </main>
  )
}

export default Listing
