import React, { useEffect, useState } from 'react'
import NotificationItem from './NotificationItem';
import { getNotification } from '../utils/notificationUtils';
import { useSelector } from 'react-redux';

export default function NotificationBox() {
  const [notificationMsg, setNotificationMsg] = useState([]);
  const {currentUser} = useSelector(state => state.user);
  useEffect(() => {
    const getNotifactionMsg = async () => {
      
      const data = await getNotification(currentUser._id);
      //console.log(data);
      setNotificationMsg(data);
    }
    getNotifactionMsg();
  }, []);
  return (
    <div className='flex flex-col p-3 gap-3 overflow-auto h-full scrollbar-thin'>
      {
        notificationMsg && notificationMsg.map((v, _) => 
          <NotificationItem key={v._id} info={v}/>
        )
      }
    </div>
  )
}
