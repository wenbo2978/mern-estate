import React, { useEffect, useState } from 'react'
import NotificationItem from './NotificationItem';

export default function NotificationBox() {
  const [notificationMsg, setNotificationMsg] = useState([]);
  useEffect(() => {
    const getNotifactionMsg = () => {
      setNotificationMsg([
        {
          'user': 'kk',
          'content': 'update price'
        },
        {
          'user': 'jj',
          'content': 'update location'
        },
        {
          'user': 'ee',
          'content': 'update type of house'
        },
        {
          'user': 'kk',
          'content': 'update price'
        },
        {
          'user': 'jj',
          'content': 'update location'
        },
        {
          'user': 'ee',
          'content': 'update type of house'
        }
      ]);

      
    }
    getNotifactionMsg();
  }, []);
  return (
    <div className='flex flex-col p-3 gap-3 overflow-auto h-full scrollbar-thin'>
      {
        notificationMsg.map((v, index) => 
          <NotificationItem key={index} info={v}/>
        )
      }
    </div>
  )
}
