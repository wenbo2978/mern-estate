import React, { useEffect, useState } from 'react'
import { getMessageById } from '../utils/messageUtils';
import { getUserById } from '../utils/userUtils';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ListingLink from './ListingLink';

export default function MessageItem({messageId, currrentUserId}) {
  const [message, setMessage] = useState('');
  const [recUser, setRecUser] = useState('');
  const {currentUser} = useSelector(state => state.user);
  useEffect(() => {
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
        <div className='bg-blue-400 p-2 rounded-md'>
          <p className='bg-blue-400 rounded-md'>{message.content}</p>
          {
            message.listingRef && 
            <ListingLink id={message.listingRef}/>
          }
        </div>
        
        
      </div> : 
      <div className='flex flex-row gap-2 justify-end'>
        <div className='bg-blue-400 p-2 rounded-md'>
          <p className='bg-blue-400 rounded-md'>{message.content}</p>
          {
            message.listingRef && 
            <ListingLink id={message.listingRef}/>
          }
        </div>
        
        <img 
          src={currentUser.avatar}
          className='w-10 h-10 rounded-full'
        />
      </div>
    }
      
    </>
  )
}
