import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ListingLink = ({id}) => {
  const [listName, setListName] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  useEffect(() => {
    const getListing = async () => {
      const res = await fetch(`/api/listing/getListing/${id}`);
      const data = await res.json();
      //console.log(data);
      setListName(data.name);
      setImgUrl(data?.imageUrls[0]);
    }
    getListing();
  }, [])
  return (
    <Link to={`/listing/${id}`}>
      <div className='bg-white p-2 flex flex-col items-start rounded-md m-1'>
        <img src={imgUrl} className='w-48 h-48 rounded-md'/>
        <p>{listName}</p>
      </div>
      
    </Link>
  )
}

export default ListingLink
