import React, { useEffect, useState } from 'react'
import { getUserById } from '../utils/userUtils';

export default function ChatUser({UserId}) {
  const [user, setUser] = useState('');
  useEffect(() => {
    const getUserInfo = async () => {
      //console.log(UserId);
      const User = await getUserById(UserId);
      //console.log(User);
      setUser(User);
    }
    getUserInfo();
  }, [])
  return (
    <div className='flex flex-row gap-2 items-center'>
      <img
        src={user.avatar}
        className='w-10 h-10 rounded-full'
      />
      <p className='text-gray-600 truncate'>{user.username}</p>
    </div>
  )
}
