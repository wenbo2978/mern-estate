import React, { useEffect, useState } from 'react'
import { getMessageById } from '../utils/messageUtils';
import { getUserById } from '../utils/userUtils';
import { useSelector } from 'react-redux';

export default function MessageItem({messageId, currrentUserId}) {
  const [message, setMessage] = useState('');
  const [recUser, setRecUser] = useState('');
  const {currentUser} = useSelector(state => state.user);
  useEffect(() => {
    //console.log(currentUser)
    //console.log(111);
    const getMessage = async () => {
      const data = await getMessageById(messageId);
      setMessage(data);
      //console.log(data);
      getUser(data.senderRef);
    }
    const getUser = async (id) => {
      const user = await getUserById(id);
      setRecUser(user);
    }
    getMessage();
  }, []);
  return (
    <>
    {
      currrentUserId !== message.senderRef ? 
      <div className='flex flex-row gap-2'>
        <img 
          src={recUser.avatar}
          className='w-10 h-10 rounded-full'
        />
        <p className='bg-blue-400 p-2 rounded-md'>{message.content}</p>      
      </div> : 
      <div className='flex flex-row gap-2 justify-end'>
        <p className='bg-blue-400 p-2 rounded-md'>{message.content}</p>
        <img 
          src={currentUser.avatar}
          className='w-10 h-10 rounded-full'
        />      
      </div>
    }
      
    </>
  )
}
