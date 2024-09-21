import React, { useState } from 'react'
import ChatBox from '../components/ChatBox';
import NotificationBox from '../components/NotificationBox';

export default function Message() {
  const [display, setDisplay] = useState('Messages');
  return (
    <div className='border-2 fixed top-[100px] bottom-3 left-0 right-0 sm:mx-20 flex flex-col sm:flex-row rounded-lg overflow-hidden'>
    
        <div className='sm:w-1/4 flex flex-row sm:flex-col sm:max-w-[200px] border-r-2'>
          <button 
            className='cursor-pointer text-lg font-bold text-slate-700 hover:text-slate-500 p-5'
            onClick={(ev) => setDisplay('Messages')}
          >
            Messages
          </button>
          
          <button 
            className='cursor-pointer text-lg font-bold text-slate-700 hover:text-slate-500 p-5'
            onClick={() => setDisplay('Notifications')}
          >
           Notifications
          </button>
        </div>
        <div className='relative flex-1'>
          {
            display === 'Messages' && <ChatBox/>
          }
          {
            display === 'Notifications' && <NotificationBox/>
          }
          
        </div>
      
    </div>
  )
}
