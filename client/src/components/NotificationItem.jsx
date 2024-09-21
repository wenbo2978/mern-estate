import React, { useEffect, useState } from 'react'
import { getUserById } from '../utils/userUtils';
import ListingLink from './ListingLink';

export default function NotificationItem({info}) {
  const [userInfo, setUserInfo] = useState('');
  const [listName, setListName] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  useEffect(() => {
    const getUserInfo = async () => {
      //console.log(info.userRef);
      const data = await getUserById(info.userRef);
      //console.log(data);
      setUserInfo(data);
    }
    getUserInfo();
  }, [])
  return (
    <div className='border bg-white rounded-md p-2 px-4 cursor-pointer hover:shadow-md'>
      <div className='flex flex-row gap-3 items-center'>
        <img 
          src={userInfo.avatar}
          className='w-12 h-12 rounded-full'
        />
        <p className='text-slate-400'>{userInfo.username}</p>
      </div>
      <div className='mt-3 bg-slate-100 p-2 rounded-md'>
        <p className='text-slate-700'>
          {
            info.action
          }
        </p>

        <ListingLink id={info.listingRef}/>

        
      </div>
    </div>
  )
}
